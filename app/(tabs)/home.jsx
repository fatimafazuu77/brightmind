import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Card from '../../components/Shared/Card';
import { useCourses } from '../context/CourseContext';
import { useUserDetails } from '../context/UserDetailContext';
import BackgroundContainer from '../../components/Shared/BackgroundContainer';

// Import images
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import quizImage from '../../assets/images/quiz.png';
import flashcardImage from '../../assets/images/flashcard.png';
import qaImage from '../../assets/images/qa.png';

// Map of image file names to imports
const imageMap = {
  'banner1.png': require('../../assets/images/banner1.png'),
  'banner2.png': require('../../assets/images/banner2.png'),
  'banner3.png': require('../../assets/images/banner3.png'),
  'banner4.png': require('../../assets/images/banner4.png'),
  'banner5.png': require('../../assets/images/banner5.png'),
  'banner6.png': require('../../assets/images/banner6.png'),
};
const fallbackImage = require('../../assets/images/banner1.png');

export default function Home() {
  const { userCourses } = useCourses();
  const { userDetails } = useUserDetails();
  const router = useRouter();

  const courses = [
    {
      id: 1,
      title: 'Advanced SQL Mastery',
      chapters: [
        {
          id: 1,
          title: 'Database Fundamentals & Architecture',
          content: `# Database Fundamentals & Architecture\n\n1. Database Components\n- RDBMS architecture overview\n- Storage engines and types\n- Memory management\n- Database security fundamentals\n\n2. Data Modeling\n- Entity-Relationship diagrams\n- Normalization forms\n- Schema design principles\n- Best practices for data modeling`
        },
        {
          id: 2,
          title: 'Advanced SQL Queries',
          content: `# Advanced SQL Queries\n\n1. Query Optimization\n- Understanding execution plans\n- Index optimization\n- Query performance tuning\n- Writing efficient queries\n\n2. Advanced SELECT statements\n- Complex WHERE clauses\n- GROUP BY with HAVING\n- ORDER BY and LIMIT\n- CASE statements`
        },
        {
          id: 3,
          title: 'Joins and Relationships',
          content: `# Joins and Relationships\n\n1. Types of Joins\n- INNER JOIN techniques\n- LEFT and RIGHT JOIN\n- FULL OUTER JOIN\n- CROSS JOIN applications\n\n2. Multiple Table Joins\n- Join optimization\n- Avoiding cartesian products\n- Using aliases effectively\n- Complex join conditions`
        }
      ],
      description: 'Master complex SQL queries, database optimization, and advanced techniques including joins, subqueries, stored procedures, and performance tuning. Learn to write efficient queries, optimize database performance, and implement advanced database features.',
      filePath: require('../../assets/images/banner1.png')
    },
    {
      id: 2,
      title: 'React Native Development',
      chapters: [
        {
          id: 1,
          title: 'React Native Fundamentals',
          content: `# React Native Fundamentals\n\n1. Core Concepts\n- React Native architecture\n- JSX and components\n- Props and state\n- Component lifecycle\n\n2. Development Setup\n- Environment configuration\n- Expo vs React Native CLI\n- Debugging tools\n- Hot reloading`
        },
        {
          id: 2,
          title: 'Component Architecture',
          content: `# Component Architecture\n\n1. Component Types\n- Functional components\n- Class components\n- Custom hooks\n- Higher-order components\n\n2. Component Patterns\n- Container/Presenter pattern\n- Compound components\n- Render props\n- Context API`
        },
        {
          id: 3,
          title: 'Navigation and Routing',
          content: `# Navigation and Routing\n\n1. Navigation Basics\n- Stack navigation\n- Tab navigation\n- Drawer navigation\n- Deep linking\n\n2. Navigation Patterns\n- Authentication flow\n- Modal navigation\n- Nested navigation\n- Navigation state`
        }
      ],
      description: 'Create cross-platform mobile apps with React Native. Cover components, navigation, state management, APIs, and deployment strategies. Build real-world applications with modern React Native practices.',
      filePath: banner2
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      chapters: [
        {
          id: 1,
          title: 'Introduction to Machine Learning',
          content: `# Introduction to Machine Learning\n\n1. What is Machine Learning?\n- Definition and types\n- Applications in real world\n\n2. Key Concepts\n- Supervised vs Unsupervised learning\n- Overfitting and underfitting\n- Model evaluation basics`
        },
        {
          id: 2,
          title: 'Data Preprocessing',
          content: `# Data Preprocessing\n\n1. Data Cleaning\n- Handling missing values\n- Outlier detection\n\n2. Feature Engineering\n- Feature scaling\n- Encoding categorical variables\n- Feature selection techniques`
        },
        {
          id: 3,
          title: 'Supervised Learning',
          content: `# Supervised Learning\n\n1. Regression\n- Linear regression\n- Evaluation metrics\n\n2. Classification\n- Logistic regression\n- Decision trees\n- Model performance`
        }
      ],
      description: 'Learn essential ML concepts, algorithms, data preprocessing, model training, and practical applications using Python and popular frameworks. Build and deploy machine learning models for real-world problems.',
      filePath: banner3
    }
  ];

  const PracticeCard = ({ title, image, backgroundColor }) => (
    <TouchableOpacity 
      style={[styles.practiceCard, { backgroundColor }]}
      onPress={() => {
        if (title === 'Quiz') {
          router.push('/quiz');
        } else if (title === 'Flashcards') {
          router.push('/flashcard');
        } else if (title === 'Question & Ans') {
          router.push('/qa');
        }
      }}
    >
      <View style={styles.practiceImageContainer}>
        <Image 
          source={image} 
          style={styles.practiceImage} 
          resizeMode="contain"
          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        />
      </View>
      <Text style={styles.practiceText}>{title}</Text>
    </TouchableOpacity>
  );

  const ProgressCard = ({ course }) => (
    <TouchableOpacity 
      style={styles.progressCard}
      onPress={() => router.push(`/course/${course.id}`)}
    >
      <Image 
        source={course.filePath} 
        style={styles.courseImage} 
        resizeMode="cover"
        onError={(e) => console.log('Error loading course image:', e.nativeEvent.error)}
      />
      <Text style={styles.progressTitle} numberOfLines={2}>{course.title}</Text>
      <Text style={styles.chapterCount}>{course.chapters.length} Chapters</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '0%' }]} />
        </View>
        <Text style={styles.progressText}>0 Out of {course.chapters.length} Chapters Completed</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hello, {userDetails?.name || 'User'}</Text>
              <Text style={styles.subGreeting}>Let's Get Started!</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Courses</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.progressContainer}
            >
              {userCourses.length > 0 ? (
                userCourses
                  .filter(course => course.title !== 'Advanced SQL Mastery')
                  .map((course) => {
                    // Map filePath string to actual image import
                    let imageSource = fallbackImage;
                    if (course.filePath) {
                      if (typeof course.filePath === 'string' && imageMap[course.filePath]) {
                        imageSource = imageMap[course.filePath];
                      } else if (typeof course.filePath !== 'string') {
                        imageSource = course.filePath;
                      }
                    }
                    return <ProgressCard key={course.id} course={{ ...course, filePath: imageSource }} />;
                  })
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No courses yet. Create one to get started!</Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Practice Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practice</Text>
            <View style={styles.practiceContainer}>
              <PracticeCard title="Quiz" image={quizImage} backgroundColor="#FF6B8B" />
              <PracticeCard title="Flashcards" image={flashcardImage} backgroundColor="#FF9666" />
              <PracticeCard title="Question & Ans" image={qaImage} backgroundColor="#8B80F9" />
            </View>
          </View>

          {/* Courses Section */}
          <View style={[styles.section, styles.coursesSection]}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <View style={styles.coursesContainer}>
              {courses.map((course) => (
                <Card
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  chapters={course.chapters}
                  description={course.description}
                  filePath={course.filePath}
                  buttonText="View Course"
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 20,
    color: '#666',
    opacity: 0.9,
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  progressContainer: {
    paddingRight: 20,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: 300,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  chapterCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4B9EFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  practiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  practiceCard: {
    borderRadius: 20,
    padding: 15,
    width: '31%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  practiceImageContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  practiceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  coursesSection: {
    marginBottom: 80,
  },
  coursesContainer: {
    gap: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
}); 