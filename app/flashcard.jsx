import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

const { width } = Dimensions.get('window');

const flashcardData = {
  title: "SQL Flashcards",
  cards: [
    {
      id: 1,
      front: "What is SQL?",
      back: "SQL (Structured Query Language) is a standard language for storing, manipulating, and retrieving data in relational databases."
    },
    {
      id: 2,
      front: "What is a Primary Key?",
      back: "A Primary Key is a unique identifier for each record in a database table. It cannot contain NULL values and must be unique."
    },
    {
      id: 3,
      front: "What is a Foreign Key?",
      back: "A Foreign Key is a field in one table that uniquely identifies a row in another table. It creates a relationship between two tables."
    },
    {
      id: 4,
      front: "What is the difference between WHERE and HAVING?",
      back: "WHERE filters rows before grouping, while HAVING filters groups after the GROUP BY clause. WHERE cannot use aggregate functions, but HAVING can."
    },
    {
      id: 5,
      front: "What is a JOIN?",
      back: "A JOIN combines rows from two or more tables based on a related column between them. Common types include INNER, LEFT, RIGHT, and FULL JOIN."
    },
    {
      id: 6,
      front: "What is an Index?",
      back: "An Index is a database object that improves the speed of data retrieval operations by providing quick access to rows in a table."
    },
    {
      id: 7,
      front: "What is Normalization?",
      back: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity."
    },
    {
      id: 8,
      front: "What is a Transaction?",
      back: "A Transaction is a sequence of operations performed as a single logical unit of work. It follows ACID properties: Atomicity, Consistency, Isolation, and Durability."
    }
  ]
};

export default function Flashcard() {
  const router = useRouter();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const nextCard = () => {
    if (currentCard < flashcardData.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  return (
    <BackgroundContainer>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>{flashcardData.title}</Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.cardCounter}>
              <Text style={styles.counterText}>
                Card {currentCard + 1} of {flashcardData.cards.length}
              </Text>
            </View>

            <View style={styles.cardWrapper}>
              <View style={[styles.card, showAnswer ? styles.cardBack : styles.cardFront]}>
                <Text style={styles.cardText}>
                  {showAnswer 
                    ? flashcardData.cards[currentCard].back 
                    : flashcardData.cards[currentCard].front}
                </Text>
                <Text style={styles.tapText}>Tap to {showAnswer ? 'show question' : 'show answer'}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.flipButton}
              onPress={flipCard}
            >
              <Text style={styles.flipButtonText}>
                {showAnswer ? 'Show Question' : 'Show Answer'}
              </Text>
            </TouchableOpacity>

            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={[styles.navButton, currentCard === 0 && styles.disabledButton]}
                onPress={prevCard}
                disabled={currentCard === 0}
              >
                <Ionicons name="arrow-back" size={24} color={currentCard === 0 ? '#ccc' : '#000'} />
                <Text style={[styles.navButtonText, currentCard === 0 && styles.disabledText]}>
                  Previous
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.navButton, currentCard === flashcardData.cards.length - 1 && styles.disabledButton]}
                onPress={nextCard}
                disabled={currentCard === flashcardData.cards.length - 1}
              >
                <Text style={[styles.navButtonText, currentCard === flashcardData.cards.length - 1 && styles.disabledText]}>
                  Next
                </Text>
                <Ionicons name="arrow-forward" size={24} color={currentCard === flashcardData.cards.length - 1 ? '#ccc' : '#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#f5f3ff',
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
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  cardContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  cardCounter: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#666',
  },
  cardWrapper: {
    width: width - 40,
    height: 300,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardFront: {
    backgroundColor: Colors.PRIMARY,
  },
  cardBack: {
    backgroundColor: '#4CAF50',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  tapText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  flipButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  flipButtonText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
  },
  disabledText: {
    color: '#ccc',
  },
}); 