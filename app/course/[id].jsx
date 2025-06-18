import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useCourses } from '../context/CourseContext';
import BackgroundContainer from '../../components/Shared/BackgroundContainer';

const courseData = {
  1: {
    id: 1,
    title: "Advanced SQL Mastery",
    chapters: [
      { 
        id: 1, 
        title: "Database Fundamentals & Architecture",
        content: `Understanding Database Architecture:

1. Database Components
- RDBMS architecture overview
- Storage engines and types
- Memory management
- Database security fundamentals

2. Data Modeling
- Entity-Relationship diagrams
- Normalization forms
- Schema design principles
- Best practices for data modeling`
      },
      { 
        id: 2, 
        title: "Advanced SQL Queries",
        content: `Complex Query Writing:

1. Query Optimization
- Understanding execution plans
- Index optimization
- Query performance tuning
- Writing efficient queries

2. Advanced SELECT statements
- Complex WHERE clauses
- GROUP BY with HAVING
- ORDER BY and LIMIT
- CASE statements`
      },
      { 
        id: 3, 
        title: "Joins and Relationships",
        content: `Mastering Table Joins:

1. Types of Joins
- INNER JOIN techniques
- LEFT and RIGHT JOIN
- FULL OUTER JOIN
- CROSS JOIN applications

2. Multiple Table Joins
- Join optimization
- Avoiding cartesian products
- Using aliases effectively
- Complex join conditions`
      },
      { 
        id: 4, 
        title: "Subqueries and CTEs",
        content: `Advanced Query Structures:

1. Subquery Types
- Correlated subqueries
- Nested subqueries
- EXISTS and NOT EXISTS
- IN and NOT IN operations

2. Common Table Expressions
- Basic CTE syntax
- Recursive CTEs
- Multiple CTEs
- CTE best practices`
      },
      { 
        id: 5, 
        title: "Window Functions",
        content: `Advanced Analytics:

1. Window Function Basics
- OVER clause
- PARTITION BY
- ORDER BY in windows
- Frame clauses

2. Analytical Functions
- ROW_NUMBER()
- RANK() and DENSE_RANK()
- LAG() and LEAD()
- Running totals`
      },
      { 
        id: 6, 
        title: "Stored Procedures",
        content: `Database Programming:

1. Procedure Basics
- Creating procedures
- Input parameters
- Output parameters
- Error handling

2. Advanced Procedures
- Dynamic SQL
- Transaction management
- Security considerations
- Performance optimization`
      },
      { 
        id: 7, 
        title: "Triggers and Events",
        content: `Automated Database Operations:

1. Database Triggers
- BEFORE and AFTER triggers
- INSERT, UPDATE, DELETE triggers
- Trigger best practices
- Error handling in triggers

2. Scheduled Events
- Event scheduling
- Event modification
- Event monitoring
- Maintenance procedures`
      },
      { 
        id: 8, 
        title: "Performance Optimization",
        content: `Database Optimization:

1. Index Optimization
- Index types and uses
- Index strategy
- Index maintenance
- Query plan analysis

2. Database Maintenance
- Statistics updates
- Database backups
- Log management
- Performance monitoring`
      }
    ],
    description: "Master complex SQL queries, database optimization, and advanced techniques including joins, subqueries, stored procedures, and performance tuning."
  },
  2: {
    id: 2,
    title: "React Native Development",
    chapters: [
      {
        id: 1,
        title: "React Native Fundamentals",
        content: `Introduction to React Native:

1. Core Concepts
- React Native architecture
- JSX and components
- Props and state
- Component lifecycle

2. Development Setup
- Environment configuration
- Expo vs React Native CLI
- Debugging tools
- Hot reloading`
      },
      {
        id: 2,
        title: "Component Architecture",
        content: `Building Components:

1. Component Types
- Functional components
- Class components
- Custom hooks
- Higher-order components

2. Component Patterns
- Container/Presenter pattern
- Compound components
- Render props
- Context API`
      },
      {
        id: 3,
        title: "Navigation and Routing",
        content: `App Navigation:

1. Navigation Basics
- Stack navigation
- Tab navigation
- Drawer navigation
- Deep linking

2. Navigation Patterns
- Authentication flow
- Modal navigation
- Nested navigation
- Navigation state`
      },
      {
        id: 4,
        title: "State Management",
        content: `Managing Application State:

1. State Management Tools
- Redux fundamentals
- Context API
- MobX
- Custom hooks

2. State Patterns
- Global state
- Local state
- Persisted state
- State synchronization`
      },
      {
        id: 5,
        title: "API Integration",
        content: `Working with APIs:

1. Network Requests
- Fetch API
- Axios
- WebSocket
- GraphQL

2. Data Handling
- Data fetching
- Error handling
- Caching
- Offline support`
      },
      {
        id: 6,
        title: "UI/UX Design",
        content: `Designing User Interfaces:

1. Styling
- StyleSheet API
- Flexbox layout
- Platform-specific styles
- Theme management

2. Animations
- Animated API
- Layout animations
- Gesture handling
- Performance optimization`
      },
      {
        id: 7,
        title: "Performance Optimization",
        content: `Optimizing Performance:

1. Performance Tools
- React DevTools
- Performance monitoring
- Memory profiling
- Network analysis

2. Optimization Techniques
- Component optimization
- List optimization
- Image optimization
- Memory management`
      },
      {
        id: 8,
        title: "Testing and Debugging",
        content: `Quality Assurance:

1. Testing
- Unit testing
- Integration testing
- E2E testing
- Test automation

2. Debugging
- Debug tools
- Error tracking
- Performance debugging
- Crash reporting`
      },
      {
        id: 9,
        title: "Deployment Strategies",
        content: `App Deployment:

1. Build Process
- Build configuration
- Code signing
- App store preparation
- Release management

2. Distribution
- App store submission
- Beta testing
- OTA updates
- Version management`
      },
      {
        id: 10,
        title: "Advanced Features",
        content: `Advanced Development:

1. Native Modules
- Native module creation
- Bridge communication
- Native UI components
- Platform APIs

2. Advanced Patterns
- Offline first
- Push notifications
- Background tasks
- Security best practices`
      }
    ],
    description: "Create cross-platform mobile apps with React Native. Cover components, navigation, state management, APIs, and deployment strategies."
  },
  3: {
    id: 3,
    title: "Machine Learning Fundamentals",
    chapters: [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        content: `ML Basics:

1. ML Concepts
- Supervised vs Unsupervised
- Classification vs Regression
- Model evaluation
- Feature engineering

2. ML Workflow
- Data collection
- Preprocessing
- Model training
- Evaluation`
      },
      {
        id: 2,
        title: "Data Preprocessing",
        content: `Data Preparation:

1. Data Cleaning
- Missing data handling
- Outlier detection
- Data normalization
- Feature scaling

2. Feature Engineering
- Feature selection
- Dimensionality reduction
- Feature creation
- Data transformation`
      },
      {
        id: 3,
        title: "Supervised Learning",
        content: `Supervised Algorithms:

1. Classification
- Logistic regression
- Decision trees
- Random forests
- SVM

2. Regression
- Linear regression
- Polynomial regression
- Ridge/Lasso
- Elastic net`
      },
      {
        id: 4,
        title: "Unsupervised Learning",
        content: `Unsupervised Methods:

1. Clustering
- K-means
- Hierarchical
- DBSCAN
- Gaussian mixtures

2. Dimensionality Reduction
- PCA
- t-SNE
- Autoencoders
- Feature selection`
      },
      {
        id: 5,
        title: "Neural Networks",
        content: `Neural Network Basics:

1. Network Architecture
- Layers and neurons
- Activation functions
- Loss functions
- Optimization

2. Training Process
- Backpropagation
- Gradient descent
- Regularization
- Dropout`
      },
      {
        id: 6,
        title: "Deep Learning",
        content: `Deep Learning Concepts:

1. CNN Architecture
- Convolutional layers
- Pooling layers
- Fully connected layers
- Transfer learning

2. RNN Architecture
- LSTM
- GRU
- Attention mechanisms
- Sequence modeling`
      },
      {
        id: 7,
        title: "Model Evaluation",
        content: `Evaluating Models:

1. Metrics
- Accuracy
- Precision/Recall
- ROC/AUC
- F1 score

2. Validation
- Cross-validation
- Holdout method
- Bootstrap
- Model comparison`
      },
      {
        id: 8,
        title: "Feature Engineering",
        content: `Feature Engineering:

1. Feature Creation
- Polynomial features
- Interaction terms
- Time-based features
- Text features

2. Feature Selection
- Filter methods
- Wrapper methods
- Embedded methods
- Feature importance`
      },
      {
        id: 9,
        title: "Natural Language Processing",
        content: `NLP Basics:

1. Text Processing
- Tokenization
- Stemming/Lemmatization
- Stop words
- N-grams

2. NLP Models
- Word embeddings
- Transformers
- BERT
- GPT models`
      },
      {
        id: 10,
        title: "Computer Vision",
        content: `CV Fundamentals:

1. Image Processing
- Image augmentation
- Feature extraction
- Object detection
- Image segmentation

2. CV Models
- CNN architectures
- Transfer learning
- Object detection
- Image classification`
      },
      {
        id: 11,
        title: "Model Deployment",
        content: `Deploying Models:

1. Deployment Methods
- REST APIs
- Batch processing
- Real-time inference
- Edge deployment

2. Monitoring
- Model drift
- Performance metrics
- Error tracking
- Version control`
      },
      {
        id: 12,
        title: "Ethics in AI",
        content: `AI Ethics:

1. Ethical Considerations
- Bias in AI
- Privacy concerns
- Transparency
- Accountability

2. Best Practices
- Fairness
- Explainability
- Data privacy
- Responsible AI`
      }
    ],
    description: "Learn essential ML concepts, algorithms, data preprocessing, model training, and practical applications using Python and popular frameworks."
  }
};

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { userCourses, addCourse } = useCourses();
  
  const course = courseData[parseInt(id)] || courseData[1];

  const handleEnroll = () => {
    if (!userCourses.some(c => c.id === course.id)) {
      addCourse(course);
    }
  };

  // Render chapter content view
  if (selectedChapter) {
    const currentChapterIndex = course.chapters.findIndex(ch => ch.id === selectedChapter.id);
    const nextChapter = course.chapters[currentChapterIndex + 1];

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setSelectedChapter(null)}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Chapter Title */}
            <Text style={styles.chapterTitle}>{selectedChapter.title}</Text>

            {/* Chapter Content */}
            {selectedChapter.content.split('\n\n').map((section, index) => {
              // Handle code blocks
              if (section.trim().startsWith('SELECT') || section.includes('```')) {
                return (
                  <View key={index} style={styles.codeBlock}>
                    <Text style={styles.codeText}>
                      {section.replace(/```/g, '').trim()}
                    </Text>
                  </View>
                );
              }

              // Handle section titles (numbered sections)
              if (/^\d+\./.test(section.trim())) {
                return (
                  <Text key={index} style={styles.sectionTitle}>
                    {section.trim()}
                  </Text>
                );
              }

              // Handle bullet points
              if (section.includes('-')) {
                const [title, ...points] = section.split('\n');
                return (
                  <View key={index} style={styles.bulletSection}>
                    {title && !title.startsWith('-') && (
                      <Text style={styles.bulletTitle}>{title.trim()}</Text>
                    )}
                    {points.map((point, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>
                          {point.replace('-', '').trim()}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              }

              // Default: paragraph
              return (
                <Text key={index} style={styles.paragraph}>
                  {section.trim()}
                </Text>
              );
            })}

            {/* Next Button */}
            {nextChapter ? (
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => setSelectedChapter(nextChapter)}
              >
                <Text style={styles.nextButtonText}>Next: {nextChapter.title}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.nextButton, styles.completeButton]}
                onPress={() => setSelectedChapter(null)}
              >
                <Text style={styles.nextButtonText}>Complete Course</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Render course overview
  return (
    <BackgroundContainer>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} bounces={false}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            
            <View style={styles.courseInfo}>
              <Text style={styles.title}>{course.title}</Text>
              <View style={styles.chaptersCount}>
                <Ionicons name="book-outline" size={20} color={Colors.PRIMARY} />
                <Text style={styles.chaptersText}>{course.chapters.length} Chapters</Text>
              </View>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>

          {/* Enroll Button */}
          <TouchableOpacity 
            style={styles.enrollButton}
            onPress={handleEnroll}
          >
            <Text style={styles.enrollButtonText}>
              {userCourses.some(c => c.id === course.id) ? 'Enrolled' : 'Enroll Now'}
            </Text>
          </TouchableOpacity>

          {/* Chapters Section */}
          <View style={styles.chaptersSection}>
            <Text style={styles.sectionTitle}>Chapters</Text>
            {course.chapters.map((chapter) => (
              <TouchableOpacity
                key={chapter.id}
                style={styles.chapterCard}
                onPress={() => setSelectedChapter(chapter)}
              >
                <View style={styles.chapterCardContent}>
                  <Text style={styles.chapterNumber}>{chapter.id}. {chapter.title}</Text>
                  <Ionicons name="chevron-forward" size={24} color={Colors.PRIMARY} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#f5f3ff',
  },
  courseInfo: {
    marginTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  chaptersCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chaptersText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    marginLeft: 8,
    fontWeight: '500',
  },
  descriptionSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  enrollButton: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chaptersSection: {
    padding: 20,
    paddingTop: 10,
  },
  chapterCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  chapterCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  chapterNumber: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  // Chapter detail styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chapterHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  chapterTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 24,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
  },
  codeBlock: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  codeText: {
    // fontFamily: 'monospace',
    fontSize: 15,
    color: '#fff',
    lineHeight: 24,
  },
  bulletSection: {
    marginVertical: 12,
  },
  bulletTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bulletDot: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  nextButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 