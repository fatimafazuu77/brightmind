import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Card({ id, title, chapters, description, filePath, buttonText, onPress, difficulty }) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to course details with the course ID
      router.push(`/course/${id || 1}`);
    }
  };

  // Helper function to get chapter count
  const getChapterCount = () => {
    if (Array.isArray(chapters)) {
      return chapters.length;
    }
    return chapters || 0;
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={filePath} 
          style={styles.image} 
          resizeMode="cover"
          onError={(e) => {
            console.log('Error loading card image:', e.nativeEvent.error);
            // You can set a fallback image here if needed
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
        )}
        <View style={styles.chapterContainer}>
          <Text style={styles.chapterText}>📚 {getChapterCount()} Chapters</Text>
          {difficulty && <Text style={styles.difficultyText}>{difficulty}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  contentContainer: {
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22
  },
  chapterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  chapterText: {
    fontSize: 16,
    color: '#666'
  },
  difficultyText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic'
  }
});
