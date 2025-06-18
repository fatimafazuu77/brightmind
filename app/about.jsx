import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

export default function About() {
  const router = useRouter();

  return (
    <BackgroundContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>About BrightMind</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            BrightMind is dedicated to making learning accessible, engaging, and effective for everyone. 
            We believe in the power of education to transform lives and create opportunities.
          </Text>

          <Text style={styles.sectionTitle}>What We Offer</Text>
          <Text style={styles.text}>
            • AI-Powered Course Creation: Create personalized courses with our advanced AI technology{'\n'}
            • Interactive Learning: Engage with quizzes, flashcards, and Q&A sessions{'\n'}
            • Progress Tracking: Monitor your learning journey with detailed progress reports{'\n'}
            • Expert Content: Access high-quality courses across various subjects
          </Text>

          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.text}>
            We envision a world where learning is personalized, accessible, and enjoyable for everyone. 
            Through our platform, we aim to empower individuals to achieve their educational goals and 
            unlock their full potential.
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