import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, LayoutAnimation, Platform, UIManager, Alert, ToastAndroid } from 'react-native';
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import banner4 from '../../assets/images/banner4.png';
import banner5 from '../../assets/images/banner5.png';
import banner6 from '../../assets/images/banner6.png';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCourses } from '../context/CourseContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Update the API key with the new Gemini API key
const GEMINI_API_KEY = 'AIzaSyCjQzva113nz1YOb-II-vyD-1PxPwZHfWo';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCjQzva113nz1YOb-II-vyD-1PxPwZHfWo`;

const bannerImages = [banner1, banner2, banner3, banner4, banner5, banner6];

// Enable LayoutAnimation on AndroidJ
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Add API key validation helper
const validateApiKey = () => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === '') {
    Alert.alert(
      "API Key Error",
      "The API key is not configured. Please contact support.",
      [{ text: "OK" }]
    );
    return false;
  }
  return true;
};

// Add this function to clean the content
function cleanContent(content) {
  // Remove markdown symbols and other unnecessary characters
  return content
    .replace(/[#*`]/g, '') // Remove #, *, and `
    .replace(/\/\*.*?\*\//g, '') // Remove /* comments */
    .replace(/\/\/.*$/gm, '') // Remove // comments
    .replace(/^\s*[-*]\s*/gm, '') // Remove bullet points
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
    .trim();
}

// Helper to auto-generate course details
async function generateCourseDetails(topic) {
  try {
    if (!validateApiKey()) {
      throw new Error('API key not configured');
    }

    console.log('Making API request to:', GEMINI_ENDPOINT);
    
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `Create a detailed course outline for "${topic}" including:
            - A compelling course title (without any special characters like #, *, etc.)
            - A detailed course description (2-3 sentences)
            - 6 chapters with specific content for each chapter
            
            Format as:
            Title: [Course Title]
            Description: [Course Description]
            
            Chapter 1: [Chapter Title]
            [Brief chapter content]
            
            Chapter 2: [Chapter Title]
            [Brief chapter content]
            
            ... and so on.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      
      if (response.status === 403) {
        Alert.alert(
          "API Key Error",
          "Invalid API key. Please check your API key configuration.",
          [{ text: "OK" }]
        );
      } else if (response.status === 404) {
        Alert.alert(
          "API Error",
          "API endpoint not found. Please check the API configuration.",
          [{ text: "OK" }]
        );
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from API');
    }

    const generatedContent = data.candidates[0].content.parts[0].text;
    
    // Parse the generated content
    const lines = generatedContent.split('\n');
    let title = topic;
    let description = '';
    const chapters = [];
    
    let currentChapter = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (trimmedLine.toLowerCase().startsWith('title:')) {
        title = cleanContent(trimmedLine.split(':').slice(1).join(':').trim()) || topic;
      } else if (trimmedLine.toLowerCase().startsWith('description:')) {
        description = cleanContent(trimmedLine.split(':').slice(1).join(':').trim());
      } else if (trimmedLine.match(/^chapter\s+\d+:/i)) {
        if (currentChapter) {
          chapters.push(currentChapter);
        }
        currentChapter = {
          id: chapters.length + 1,
          title: cleanContent(trimmedLine.replace(/^chapter\s+\d+:/i, '').trim()),
          content: ''
        };
      } else if (currentChapter && trimmedLine) {
        currentChapter.content += cleanContent(trimmedLine) + '\n';
      }
    }
    
    if (currentChapter) {
      chapters.push(currentChapter);
    }

    // If we got valid content, return it
    if (chapters.length > 0) {
      return {
        id: Date.now(),
        title: title,
        description: description || `Master ${topic} with our comprehensive course.`,
        chapters: chapters
      };
    }

    // If no chapters were generated, use default chapters
    console.log('No chapters generated, using default chapters');
    const defaultChapters = getDefaultChapters(topic);
    return {
      id: Date.now(),
      title: title,
      description: description || `Master ${topic} with our comprehensive course.`,
      chapters: defaultChapters
    };
  } catch (error) {
    console.error('Error generating course details:', error);
    // If there's an error, use default chapters
    const defaultChapters = getDefaultChapters(topic);
    return {
      id: Date.now(),
      title: topic,
      description: `Master ${topic} with our comprehensive course.`,
      chapters: defaultChapters
    };
  }
}

function getDefaultChapters(topic) {
  const topicLower = topic.toLowerCase();
  
  // Python courses
  if (topicLower.includes('python')) {
    if (topicLower.includes('beginner') || topicLower.includes('zero to hero')) {
      return [
        {
          title: "Introduction to Python Programming",
          content: "Start your Python journey! Learn about Python's features, install Python and an IDE, write your first program, and understand basic syntax. Topics: Installation, Hello World, Python interpreter, basic syntax rules."
        },
        {
          title: "Variables and Data Types",
          content: "Master Python's fundamental data types and variables. Learn about numbers, strings, lists, and type conversion. Topics: Variables, integers, floats, strings, type casting, basic operations."
        },
        {
          title: "Control Flow and Functions",
          content: "Learn to control your program's flow using if-else statements, loops, and functions. Build reusable code blocks and understand scope. Topics: If-else, for loops, while loops, function definition, parameters, return values."
        },
        {
          title: "Data Structures and Collections",
          content: "Explore Python's powerful data structures. Master lists, tuples, dictionaries, and sets. Learn when to use each type. Topics: Lists manipulation, dictionary operations, sets, practical examples."
        },
        {
          title: "File Operations and Error Handling",
          content: "Work with files and handle errors in your programs. Learn to read/write files, handle exceptions, and debug code. Topics: File I/O, try-except blocks, error types, debugging techniques."
        },
        {
          title: "Mini Projects and Practice",
          content: "Apply your knowledge by building real projects. Create a number guessing game, todo list, and simple calculator. Topics: Project planning, coding practice, problem-solving, code organization."
        }
      ];
    } else {
      return [
        { 
          title: "Advanced Python Concepts",
          content: "Deep dive into advanced Python features including decorators, generators, context managers, and metaclasses. Master Python's object model and memory management."
        },
        { 
          title: "Object-Oriented Programming",
          content: "Master object-oriented programming in Python. Learn about classes, inheritance, polymorphism, and design patterns. Build maintainable and reusable code."
        },
        { 
          title: "Concurrent Programming",
          content: "Explore concurrent programming with threads, processes, and async/await. Learn to write efficient parallel code and handle synchronization."
        },
        { 
          title: "Web Development",
          content: "Build web applications using Python frameworks like Flask or Django. Learn about routing, templates, databases, and RESTful APIs."
        },
        { 
          title: "Data Science and ML",
          content: "Introduction to data science libraries like NumPy, Pandas, and Scikit-learn. Learn data manipulation, analysis, and basic machine learning."
        },
        { 
          title: "Testing and Deployment",
          content: "Learn testing methodologies, CI/CD practices, and deployment strategies. Master unit testing, integration testing, and production deployment."
        }
      ];
    }
  }
  
  // Marketing courses
  if (topicLower.includes('marketing') || topicLower.includes('digital') || topicLower.includes('seo')) {
    return [
      {
        title: 'Digital Marketing Fundamentals',
        content: 'Understanding the digital marketing landscape, key concepts, and modern marketing strategies. Learn about different channels and their roles.'
      },
      {
        title: 'Search Engine Optimization (SEO)',
        content: 'Master SEO techniques including keyword research, on-page optimization, link building, and technical SEO. Learn to improve website visibility and rankings.'
      },
      {
        title: 'Social Media Marketing',
        content: 'Develop effective social media strategies across platforms. Learn content creation, community management, and paid social advertising.'
      },
      {
        title: 'Content Marketing',
        content: 'Create compelling content strategies, understand content types, and learn content distribution. Master storytelling and audience engagement.'
      },
      {
        title: 'Email Marketing',
        content: 'Learn email marketing best practices, list building, segmentation, and automation. Create effective email campaigns and measure results.'
      },
      {
        title: 'Analytics and Data',
        content: 'Master digital analytics tools, track KPIs, and make data-driven decisions. Learn to measure and optimize marketing performance.'
      }
    ];
  }
  
  // Math courses
  if (topicLower.includes('math') || topicLower.includes('mathematics') || topicLower.includes('algebra')) {
    return [
      {
        title: 'Foundations of Mathematics',
        content: 'Understanding fundamental mathematical concepts, number systems, and basic operations. Build a strong foundation for advanced topics.'
      },
      {
        title: 'Algebra and Functions',
        content: 'Master algebraic expressions, equations, and functions. Learn to solve complex problems and understand mathematical relationships.'
      },
      {
        title: 'Geometry and Trigonometry',
        content: 'Explore geometric principles, shapes, and trigonometric functions. Learn spatial reasoning and practical applications.'
      },
      {
        title: 'Calculus Concepts',
        content: 'Introduction to derivatives, integrals, and limits. Understand rate of change and area calculations.'
      },
      {
        title: 'Statistics and Probability',
        content: 'Learn statistical analysis, probability theory, and data interpretation. Master statistical tools and techniques.'
      },
      {
        title: 'Mathematical Problem Solving',
        content: 'Develop problem-solving strategies and critical thinking skills. Learn to approach complex mathematical challenges.'
      }
    ];
  }
  
  // Default generic course structure for other topics
  return [
    {
      title: `Introduction to ${topic}`,
      content: `Comprehensive introduction to ${topic}. Learn fundamental concepts and principles.`
    },
    {
      title: 'Core Concepts and Theory',
      content: `Deep dive into the theoretical foundations of ${topic}. Understand key frameworks and methodologies.`
    },
    {
      title: 'Practical Applications',
      content: `Apply ${topic} concepts in real-world scenarios. Learn through hands-on exercises and case studies.`
    },
    {
      title: 'Advanced Techniques',
      content: `Master advanced concepts and specialized techniques in ${topic}. Explore cutting-edge developments.`
    },
    {
      title: 'Tools and Technologies',
      content: `Learn essential tools and technologies used in ${topic}. Understand industry-standard software and practices.`
    },
    {
      title: 'Best Practices and Standards',
      content: `Study best practices, industry standards, and professional guidelines in ${topic}. Learn quality assurance methods.`
    }
  ];
}

const InteractiveBlock = ({ content }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderContent = () => {
    if (!content) return null;

    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      // Handle code blocks
      if (block.includes('```')) {
        const [, code] = block.split('```');
        return (
          <View key={`code-${idx}`} style={styles.codeBlock}>
            <Text style={styles.codeText} selectable>
              {code.trim()}
            </Text>
          </View>
        );
      }

      // Handle section titles
      if (block.match(/^\d+\./)) {
        return (
          <Text key={`title-${idx}`} style={styles.sectionTitle}>
            {block.trim()}
          </Text>
        );
      }

      // Handle bullet points
      if (block.match(/^[-*]/m)) {
        return (
          <View key={`list-${idx}`} style={styles.bulletList}>
            {block.split('\n').map((item, bulletIdx) => (
              <View key={`bullet-${bulletIdx}`} style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={[styles.contentText, styles.bulletText]}>
                  {item.replace(/^[-*]\s/, '')}
                </Text>
              </View>
            ))}
          </View>
        );
      }

      // Regular paragraphs
      return (
        <Text key={`para-${idx}`} style={styles.paragraph}>
          {block.trim()}
        </Text>
      );
    });
  };

  return (
    <ScrollView style={styles.contentScroll}>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

export function renderFormattedContent(content) {
  const blocks = content.split(/\n\s*\n/);
  return blocks.map((block, idx) => <InteractiveBlock content={block} key={idx} />);
}

const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      onPress={() => router.back()} 
      style={styles.backButtonTop}
    >
      <Ionicons name="arrow-back" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState('');
  const [chapterLoading, setChapterLoading] = useState(false);
  const { addCourse, userCourses } = useCourses();
  const router = useRouter();

  const onGenerateTopic = async () => {
    if (!userInput.trim()) {
      Alert.alert('Error', 'Please enter a topic first');
      return;
    }

    setLoading(true);
    setSelectedCourse(null);
    setSelectedChapter(null);
    setChapterContent('');
    
    try {
      // Try to generate course details
      let courseDetails;
      try {
        const response = await fetch(GEMINI_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [{
                text: `Create a detailed course outline for "${userInput}" including:
                - A compelling course title (without any special characters like #, *, etc.)
                - A detailed course description (2-3 sentences)
                - 6 chapters with specific content for each chapter
                
                Format as:
                Title: [Course Title]
                Description: [Course Description]
                
                Chapter 1: [Chapter Title]
                [Brief chapter content]
                
                Chapter 2: [Chapter Title]
                [Brief chapter content]
                
                ... and so on.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error('Invalid response format from API');
        }

        const generatedContent = data.candidates[0].content.parts[0].text;
        const lines = generatedContent.split('\n');
        
        let title = userInput;
        let description = '';
        const chapters = [];
        let currentChapter = null;
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          if (trimmedLine.toLowerCase().startsWith('title:')) {
            title = trimmedLine.split(':').slice(1).join(':').trim();
          } else if (trimmedLine.toLowerCase().startsWith('description:')) {
            description = trimmedLine.split(':').slice(1).join(':').trim();
          } else if (trimmedLine.match(/^chapter\s+\d+:/i)) {
            if (currentChapter) {
              chapters.push(currentChapter);
            }
            currentChapter = {
              id: chapters.length + 1,
              title: trimmedLine.replace(/^chapter\s+\d+:/i, '').trim(),
              content: ''
            };
          } else if (currentChapter && trimmedLine) {
            currentChapter.content += trimmedLine + '\n';
          }
        }
        
        if (currentChapter) {
          chapters.push(currentChapter);
        }

        courseDetails = {
          id: Date.now(),
          title: title || userInput,
          description: description || `Master ${userInput} with our comprehensive course.`,
          chapters: chapters.length > 0 ? chapters : getDefaultChapters(userInput)
        };
      } catch (error) {
        console.log('Using fallback course generation due to API error:', error);
        courseDetails = {
          id: Date.now(),
          title: userInput,
          description: `Master ${userInput} with our comprehensive course.`,
          chapters: getDefaultChapters(userInput)
        };
      }

      const courseWithBanner = {
        ...courseDetails,
        filePath: bannerImages[Math.floor(Math.random() * bannerImages.length)]
      };
      
      setCourses([courseWithBanner]);
    } catch (error) {
      console.error("Error in course generation:", error);
      Alert.alert(
        "Error",
        "Failed to generate course. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  // When a chapter is selected, generate content
  const handleChapterSelect = async (chapter) => {
    setChapterLoading(true);
    setSelectedChapter(chapter);
    
    try {
      // Try to generate chapter content
      let content;
      try {
        const response = await fetch(GEMINI_ENDPOINT, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [{
                text: `Create a detailed, comprehensive lesson for the chapter "${chapter.title}" in the context of ${selectedCourse.title}.
                Base content: ${chapter.content}
                
                Please structure the content as follows:
                1. Learning Objectives
                - List 3-4 key learning objectives specific to ${chapter.title}
                
                2. Introduction
                - Brief overview of ${chapter.title}
                - Why this topic is important in the context of ${selectedCourse.title}
                
                3. Main Concepts
                - Detailed explanations with examples
                - Include relevant code samples or practical examples
                
                4. Example:
                - Provide a practical example specific to ${chapter.title}
                - Include implementation details and best practices
                
                5. Practice Exercises
                - 2-3 exercises with solutions related to ${chapter.title}
                
                6. Common Mistakes to Avoid
                - List common pitfalls specific to ${chapter.title}
                - How to avoid these mistakes
                
                7. Key Takeaways
                - Summarize main points of ${chapter.title}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        content = data.candidates[0].content.parts[0].text;
      } catch (error) {
        console.log('Using fallback chapter content due to API error');
        // Use fallback chapter content
        content = `# ${chapter.title}

This chapter is part of the "${selectedCourse.title}" course. Here you will learn about:

1. Key Concepts
- Fundamental principles
- Core terminology
- Basic applications

2. Practical Examples
- Real-world scenarios
- Step-by-step guides
- Best practices

3. Exercises
- Practice problems
- Hands-on activities
- Self-assessment

4. Additional Resources
- Further reading
- Related topics
- External references`;
      }

      setChapterContent(content);
    } catch (error) {
      console.error('Error generating chapter content:', error);
      Alert.alert(
        "Error",
        "Failed to generate chapter content. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setChapterLoading(false);
    }
  };

  // Render chapter content view
  if (selectedChapter) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedChapter(null)}
        >
          <Text style={styles.backButtonText}>← Back to Chapters</Text>
        </TouchableOpacity>

        <View style={styles.chapterContentWrapper}>
          <Text style={styles.chapterTitle}>{selectedChapter.title}</Text>
          
          {chapterLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          ) : (
            <InteractiveBlock content={chapterContent} />
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Render course chapters view
  if (selectedCourse) {
    const isEnrolled = userCourses.some(c => c.title === selectedCourse.title);
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedCourse(null)}
        >
          <Text style={styles.backButtonText}>← Back to Courses</Text>
        </TouchableOpacity>

        <Text style={styles.courseTitle}>{selectedCourse.title}</Text>
        <Text style={styles.courseDescription}>{selectedCourse.description}</Text>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.chaptersWrapper}>
            <Text style={styles.chaptersHeader}>Course Chapters</Text>
            {selectedCourse.chapters.map((chapter, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.chapterCard}
                onPress={() => handleChapterSelect(chapter)}
              >
                <View style={styles.chapterNumber}>
                  <Ionicons name="book-outline" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
                  <Text style={styles.chapterNumberText}>{idx + 1}</Text>
                </View>
                <View style={styles.chapterInfo}>
                  <Text style={styles.chapterCardTitle}>{chapter.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Enroll Button - always at the bottom of scroll */}
          <TouchableOpacity
            style={[styles.enrollButton, isEnrolled && { backgroundColor: '#ccc' }]}
            onPress={() => {
              if (!isEnrolled) {
                addCourse(selectedCourse);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Enrolled in course!', ToastAndroid.SHORT);
                } else {
                  Alert.alert('Success', 'Enrolled in course!');
                }
                // Optionally, navigate to Progress tab
                // router.replace('/(tabs)/progress');
              }
            }}
            disabled={isEnrolled}
          >
            <Ionicons name={isEnrolled ? 'checkmark-circle' : 'school'} size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.enrollButtonText}>{isEnrolled ? 'Enrolled' : 'Enroll'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // If courses are generated, show course cards
  if (courses.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.coursesContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCourses([])}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.topicsHeader}>Generated Course</Text>
          {courses.map((course, idx) => (
            <TouchableOpacity 
              key={idx} 
              onPress={() => setSelectedCourse(course)}
            >
              <Card
                title={course.title}
                description={course.description}
                filePath={course.filePath}
                chapters={course.chapters.length}
                buttonText="View Chapters"
                onPress={() => setSelectedCourse(course)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Default: show input
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Create New Course</Text>
        <Text style={styles.subtitle}>What do you want to learn today?</Text>
        <TextInput
          placeholder="Enter a topic (e.g., Python, Marketing, Mathematics)"
          placeholderTextColor="#666666"
          style={styles.textInput}
          numberOfLines={3}
          multiline
          onChangeText={setUserInput}
          value={userInput}
        />
        <Button
          text={loading ? 'Generating...' : 'Generate Course'}
          onPress={onGenerateTopic}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  scrollContainer: {
    padding: 16,
  },
  coursesContainer: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#3b2f78',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 25,
    color: '#3b2f78',
    marginBottom: 8,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderColor: '#a78bfa',
    marginBottom: 16,
  },
  topicsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b2f78',
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  chaptersWrapper: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 16,
  },
  chaptersHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  chapterNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chapterContentWrapper: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 16,
    flex: 1,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginTop: 40,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  codeBlock: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  codeText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#3b2f78',
  },
  paragraph: {
    fontSize: 17,
    color: '#222',
    marginBottom: 16,
    lineHeight: 28,
  },
  bulletList: {
    marginVertical: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    color: '#3b2f78',
    fontSize: 20,
    marginRight: 8,
    marginTop: -2,
  },
  bulletText: {
    flex: 1,
  },
  contentText: {
    fontSize: 17,
    lineHeight: 28,
    color: '#333',
  },
  enrollButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0075ff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 2,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
