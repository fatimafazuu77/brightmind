import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

export default function Help() {
  const router = useRouter();

  return (
    <BackgroundContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I create a new course?</Text>
            <Text style={styles.answer}>
              To create a new course, go to the Create tab and follow the prompts. 
              You can use our AI to generate course content or create it manually.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I track my progress?</Text>
            <Text style={styles.answer}>
              Your progress is automatically tracked in the Progress tab. 
              You can see your completion status for each course and chapter.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>Can I access courses offline?</Text>
            <Text style={styles.answer}>
              Yes, once you've enrolled in a course, you can access its content offline. 
              Make sure to download the content while you're online first.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I use the practice features?</Text>
            <Text style={styles.answer}>
              The practice features (quizzes, flashcards, Q&A) are available for each course. 
              Access them through the course details page to enhance your learning.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.question}>How do I reset my password?</Text>
            <Text style={styles.answer}>
              Go to the Profile tab, select Settings, and choose 'Change Password'. 
              Follow the prompts to reset your password securely.
            </Text>
          </View>
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
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
}); 