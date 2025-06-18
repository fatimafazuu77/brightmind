import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const CourseContext = createContext();

// Custom hook to use the context
export function useCourses() {
  return useContext(CourseContext);
}

// Demo course templates
const demoCourseTemplates = {
  'Advanced SQL Mastery': {
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
    description: 'Master complex SQL queries, database optimization, and advanced techniques including joins, subqueries, stored procedures, and performance tuning. Learn to write efficient queries, optimize database performance, and implement advanced database features.'
  },
  'React Native Development': {
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
    description: 'Create cross-platform mobile apps with React Native. Cover components, navigation, state management, APIs, and deployment strategies. Build real-world applications with modern React Native practices.'
  },
  'Machine Learning Fundamentals': {
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
    description: 'Learn essential ML concepts, algorithms, data preprocessing, model training, and practical applications using Python and popular frameworks. Build and deploy machine learning models for real-world problems.'
  }
};

// Provider component
export function CourseProvider({ children }) {
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load courses from AsyncStorage when component mounts
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const savedCourses = await AsyncStorage.getItem('userCourses');
      if (savedCourses) {
        setUserCourses(JSON.parse(savedCourses));
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      // If the course is a known demo, use its template for chapters/description
      const template = demoCourseTemplates[course.title];
      const courseToAdd = {
        ...course,
        chapters: template ? template.chapters : course.chapters,
        description: template ? template.description : course.description,
        id: course.id || Date.now(),
        content: course.content || generateChapterContent(course.title, course.title)
      };

      // Check if course already exists
      if (userCourses.some(c => c.title === course.title)) {
        return;
      }

      // Add course to state
      const newCourses = [...userCourses, courseToAdd];
      setUserCourses(newCourses);

      // Save to AsyncStorage
      await AsyncStorage.setItem('userCourses', JSON.stringify(newCourses));
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  // Helper function to generate chapter content if not provided
  const generateChapterContent = (chapterTitle, courseTitle) => {
    return `# ${chapterTitle}

This chapter is part of the "${courseTitle}" course. Here you will learn about:

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
  };

  return (
    <CourseContext.Provider value={{ userCourses, addCourse, loading }}>
      {children}
    </CourseContext.Provider>
  );
}

// Default export
export default CourseContext;
