import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

const { width } = Dimensions.get('window');

const qaData = {
  title: "SQL Q&A",
  questions: [
    {
      id: 1,
      question: "What is the difference between INNER JOIN and LEFT JOIN?",
      answer: "INNER JOIN returns only the matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table. If there's no match, NULL values are returned for the right table columns."
    },
    {
      id: 2,
      question: "What is a subquery and when would you use it?",
      answer: "A subquery is a query nested inside another query. It's used when you need to use the result of one query as a condition or value in another query. Common uses include filtering, calculations, and comparisons."
    },
    {
      id: 3,
      question: "What is the difference between DELETE and TRUNCATE?",
      answer: "DELETE removes specific rows from a table and can be rolled back, while TRUNCATE removes all rows from a table and cannot be rolled back. TRUNCATE is faster as it doesn't log individual row deletions."
    },
    {
      id: 4,
      question: "What is a stored procedure and what are its advantages?",
      answer: "A stored procedure is a prepared SQL code that you can save and reuse. Advantages include improved performance, reduced network traffic, better security, and easier maintenance."
    },
    {
      id: 5,
      question: "What is database normalization and why is it important?",
      answer: "Database normalization is the process of organizing data to minimize redundancy and dependency. It's important because it reduces data redundancy, improves data integrity, and makes the database more efficient."
    },
    {
      id: 6,
      question: "What is an index and when should you use it?",
      answer: "An index is a database object that improves the speed of data retrieval. You should use indexes on columns that are frequently used in WHERE clauses, JOIN conditions, or as foreign keys."
    },
    {
      id: 7,
      question: "What is a transaction and what are its properties?",
      answer: "A transaction is a sequence of operations performed as a single unit of work. Its properties (ACID) are: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent operations), and Durability (permanent changes)."
    },
    {
      id: 8,
      question: "What is the difference between GROUP BY and HAVING?",
      answer: "GROUP BY groups rows that have the same values into summary rows, while HAVING filters groups after the GROUP BY clause. WHERE filters rows before grouping, and HAVING filters groups after grouping."
    }
  ]
};

export default function QA() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const nextQuestion = () => {
    if (currentQuestion < qaData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
            <Text style={styles.title}>{qaData.title}</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.questionCounter}>
              <Text style={styles.counterText}>
                Question {currentQuestion + 1} of {qaData.questions.length}
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.questionCard}>
                <Text style={styles.questionText}>
                  {qaData.questions[currentQuestion].question}
                </Text>
              </View>

              {showAnswer && (
                <View style={styles.answerCard}>
                  <Text style={styles.answerText}>
                    {qaData.questions[currentQuestion].answer}
                  </Text>
                </View>
              )}

              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={toggleAnswer}
              >
                <Text style={styles.toggleButtonText}>
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
                onPress={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <Ionicons name="arrow-back" size={24} color={currentQuestion === 0 ? '#ccc' : '#000'} />
                <Text style={[styles.navButtonText, currentQuestion === 0 && styles.disabledText]}>
                  Previous
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.navButton, currentQuestion === qaData.questions.length - 1 && styles.disabledButton]}
                onPress={nextQuestion}
                disabled={currentQuestion === qaData.questions.length - 1}
              >
                <Text style={[styles.navButtonText, currentQuestion === qaData.questions.length - 1 && styles.disabledText]}>
                  Next
                </Text>
                <Ionicons name="arrow-forward" size={24} color={currentQuestion === qaData.questions.length - 1 ? '#ccc' : '#000'} />
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  questionCounter: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    gap: 15,
  },
  questionCard: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
  },
  answerText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  toggleButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  toggleButtonText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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