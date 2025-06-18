import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Card from '../../components/Shared/Card';
import { useCourses } from '../context/CourseContext';
import BackgroundContainer from '../../components/Shared/BackgroundContainer';

// Import images
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.png';
import banner4 from '../../assets/images/banner4.png';
import banner5 from '../../assets/images/banner5.png';
import banner6 from '../../assets/images/banner6.png';

export default function Explore() {
  const { userCourses, addCourse } = useCourses();
  const router = useRouter();

  const techCourses = [
    {
      id: 1,
      title: 'Advanced SQL Mastery',
      chapters: 8,
      description: 'Master complex SQL queries, database optimization, and advanced techniques including joins, subqueries, stored procedures, and performance tuning. Learn to write efficient queries, optimize database performance, and implement advanced database features.',
      filePath: banner1,
      topics: [
        'Advanced Joins and Subqueries',
        'Stored Procedures and Functions',
        'Database Optimization',
        'Transaction Management',
        'Indexing Strategies',
        'Performance Tuning',
        'Advanced Data Types',
        'Security Best Practices'
      ]
    },
    {
      id: 2,
      title: 'React Native Development',
      chapters: 10,
      description: 'Create cross-platform mobile apps with React Native. Cover components, navigation, state management, APIs, and deployment strategies. Build real-world applications with modern React Native practices.',
      filePath: banner2,
      topics: [
        'React Native Fundamentals',
        'Component Architecture',
        'Navigation and Routing',
        'State Management',
        'API Integration',
        'UI/UX Design',
        'Performance Optimization',
        'Testing and Debugging',
        'Deployment Strategies',
        'Advanced Features'
      ]
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      chapters: 12,
      description: 'Learn essential ML concepts, algorithms, data preprocessing, model training, and practical applications using Python and popular frameworks. Build and deploy machine learning models for real-world problems.',
      filePath: banner3,
      topics: [
        'Introduction to Machine Learning',
        'Data Preprocessing',
        'Supervised Learning',
        'Unsupervised Learning',
        'Neural Networks',
        'Deep Learning',
        'Model Evaluation',
        'Feature Engineering',
        'Natural Language Processing',
        'Computer Vision',
        'Model Deployment',
        'Ethics in AI'
      ]
    },
    {
      id: 4,
      title: 'Cloud Architecture with AWS',
      chapters: 9,
      description: 'Design and implement scalable cloud solutions using AWS services. Cover EC2, S3, Lambda, API Gateway, and best practices for cloud architecture. Learn to build secure, scalable, and cost-effective cloud applications.',
      filePath: banner4,
      topics: [
        'AWS Fundamentals',
        'Compute Services (EC2, Lambda)',
        'Storage Solutions (S3, EBS)',
        'Networking and Security',
        'Database Services',
        'Serverless Architecture',
        'Monitoring and Logging',
        'Cost Optimization',
        'DevOps Practices'
      ]
    }
  ];

  const businessCourses = [
    {
      id: 5,
      title: 'Growth Marketing Strategies',
      chapters: 11,
      description: 'Master modern marketing techniques including SEO, content marketing, social media advertising, email campaigns, and marketing analytics. Learn to develop and execute effective growth marketing strategies.',
      filePath: banner5,
      topics: [
        'Digital Marketing Fundamentals',
        'SEO and Content Strategy',
        'Social Media Marketing',
        'Email Marketing',
        'Paid Advertising',
        'Marketing Analytics',
        'Conversion Optimization',
        'Customer Acquisition',
        'Retention Strategies',
        'Marketing Automation',
        'Growth Hacking'
      ]
    },
    {
      id: 6,
      title: 'Startup Leadership',
      chapters: 8,
      description: 'Develop essential leadership skills for startup success. Learn team management, decision-making, conflict resolution, and organizational culture. Build and lead high-performing startup teams.',
      filePath: banner6,
      topics: [
        'Leadership Fundamentals',
        'Team Building',
        'Decision Making',
        'Conflict Resolution',
        'Organizational Culture',
        'Strategic Planning',
        'Change Management',
        'Innovation Leadership'
      ]
    },
    {
      id: 7,
      title: 'Financial Analysis & Planning',
      chapters: 10,
      description: 'Master financial modeling, valuation methods, risk assessment, investment strategies, and advanced Excel techniques for business analysis. Learn to make data-driven financial decisions.',
      filePath: banner1,
      topics: [
        'Financial Statement Analysis',
        'Valuation Methods',
        'Risk Assessment',
        'Investment Strategies',
        'Financial Modeling',
        'Budgeting and Forecasting',
        'Capital Structure',
        'Mergers and Acquisitions',
        'Financial Planning',
        'Advanced Excel Techniques'
      ]
    },
    {
      id: 8,
      title: 'E-commerce Optimization',
      chapters: 9,
      description: 'Optimize online stores for maximum conversion. Learn customer analytics, A/B testing, payment systems, and inventory management. Build and optimize successful e-commerce businesses.',
      filePath: banner2,
      topics: [
        'E-commerce Fundamentals',
        'Customer Analytics',
        'Conversion Optimization',
        'A/B Testing',
        'Payment Systems',
        'Inventory Management',
        'Supply Chain Optimization',
        'Customer Experience',
        'Mobile Commerce'
      ]
    }
  ];

  const healthCourses = [
    {
      id: 9,
      title: 'Advanced Fitness Training',
      chapters: 12,
      description: 'Design effective workout programs, understand exercise science, nutrition planning, and injury prevention techniques for optimal results. Learn to create personalized fitness programs.',
      filePath: banner3,
      topics: [
        'Exercise Science',
        'Program Design',
        'Strength Training',
        'Cardiovascular Training',
        'Flexibility and Mobility',
        'Nutrition Planning',
        'Injury Prevention',
        'Recovery Techniques',
        'Sports Performance',
        'Special Populations',
        'Fitness Assessment',
        'Business of Fitness'
      ]
    },
    {
      id: 10,
      title: 'Sports Psychology',
      chapters: 8,
      description: 'Explore mental aspects of athletic performance, motivation techniques, stress management, and psychological strategies for peak performance. Learn to enhance athletic performance through mental training.',
      filePath: banner4,
      topics: [
        'Performance Psychology',
        'Motivation Techniques',
        'Stress Management',
        'Goal Setting',
        'Mental Toughness',
        'Team Dynamics',
        'Recovery Psychology',
        'Performance Enhancement'
      ]
    },
    {
      id: 11,
      title: 'Holistic Wellness',
      chapters: 10,
      description: 'Integrate physical, mental, and emotional well-being through meditation, stress reduction, nutrition, and lifestyle optimization. Learn to create balanced and sustainable wellness practices.',
      filePath: banner5,
      topics: [
        'Mind-Body Connection',
        'Meditation Techniques',
        'Stress Management',
        'Nutrition and Wellness',
        'Sleep Optimization',
        'Emotional Intelligence',
        'Lifestyle Design',
        'Energy Management',
        'Wellness Coaching',
        'Sustainable Practices'
      ]
    },
    {
      id: 12,
      title: 'Rehabilitation Science',
      chapters: 9,
      description: 'Learn injury recovery techniques, therapeutic exercises, movement assessment, and rehabilitation program design for various conditions. Master the science of physical rehabilitation.',
      filePath: banner6,
      topics: [
        'Anatomy and Physiology',
        'Injury Assessment',
        'Therapeutic Exercise',
        'Movement Analysis',
        'Pain Management',
        'Rehabilitation Techniques',
        'Special Populations',
        'Program Design',
        'Case Management'
      ]
    }
  ];

  const CategorySection = ({ title, courses }) => (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesRow}
      >
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Card
              id={course.id}
              title={course.title}
              chapters={course.chapters}
              description={course.description}
              filePath={course.filePath}
              buttonText={userCourses.some(c => c.title === course.title) ? 'Enrolled' : 'Enroll Now'}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <BackgroundContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Explore More Courses</Text>

        <CategorySection title="Tech & Coding" courses={techCourses} />
        <CategorySection title="Business & Finance" courses={businessCourses} />
        <CategorySection title="Health & Fitness" courses={healthCourses} />

        {/* Add padding at bottom for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    flex: 1,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  createSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  createTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: 20,
    color: '#000',
  },
  coursesRow: {
    paddingHorizontal: 20,
  },
  courseCard: {
    width: 280,
    marginRight: 15,
  },
  bottomPadding: {
    height: 80,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    color: '#666',
  },
});