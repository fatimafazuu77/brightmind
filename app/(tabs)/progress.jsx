import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
 import { useCourses } from '../context/CourseContext';
// import { UserDetailsContext } from '../../context/UserDetailsContext';
import Colors from '../../constant/Colors';
import BackgroundContainer from '../../components/Shared/BackgroundContainer';

export default function Progress() {
  const { userCourses } = useCourses();
  // const { UserDetail } = useContext(UserDetailsContext);

  return (
    <BackgroundContainer>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Track your learning journey</Text>
        </View>

        {/* Overall Progress */}
        <View style={styles.overallProgress}>
          <Text style={styles.sectionTitle}>Overall Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
            <Text style={styles.progressText}>40% Complete</Text>
          </View>
        </View>

        {/* Course Progress */}
        <View style={styles.courseProgress}>
          <Text style={styles.sectionTitle}>Course Progress</Text>
          {userCourses.map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '30%' }]} />
                </View>
                <Text style={styles.progressText}>3 of {course.chapters.length} chapters completed</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.achievements}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementGrid}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementTitle}>Quick Learner</Text>
              <Text style={styles.achievementDesc}>Complete 5 chapters in one day</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementTitle}>Consistent</Text>
              <Text style={styles.achievementDesc}>Study for 7 days straight</Text>
            </View>
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
    padding: 24,
    paddingTop: 36,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#e0e7ff',
    fontSize: 18,
    marginTop: 4,
  },
  overallProgress: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.DARK,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ede9fe',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.PRIMARY,
  },
  progressText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 8,
  },
  courseProgress: {
    padding: 20,
  },
  courseItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.DARK,
    marginBottom: 8,
  },
  achievements: {
    padding: 20,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DARK,
    marginBottom: 8,
  },
  achievementDesc: {
    fontSize: 14,
    color: Colors.GRAY,
  },
}); 