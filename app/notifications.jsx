import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

export default function Notifications() {
  const router = useRouter();

  return (
    <BackgroundContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Course Updates</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>New Features</Text>
          <Text style={styles.text}>
            • AI Course Generation: Create personalized courses instantly{'\n'}
            • Interactive Learning Tools: Enhanced quiz and flashcard features{'\n'}
            • Progress Analytics: Track your learning journey in detail
          </Text>

          <Text style={styles.sectionTitle}>Upcoming Courses</Text>
          <Text style={styles.text}>
            • Advanced Machine Learning{'\n'}
            • Digital Marketing Mastery{'\n'}
            • Web Development Bootcamp{'\n'}
            • Data Science Fundamentals
          </Text>

          <Text style={styles.sectionTitle}>Learning Tips</Text>
          <Text style={styles.text}>
            • Set daily learning goals{'\n'}
            • Use the flashcard feature for quick reviews{'\n'}
            • Take regular quizzes to test your knowledge{'\n'}
            • Track your progress in the Progress section
          </Text>
        </View>
      </ScrollView>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
  },
}); 