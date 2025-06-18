import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackgroundContainer from '../components/Shared/BackgroundContainer';
import Colors from '../constant/Colors';

const quizData = {
  title: "SQL Fundamentals Quiz",
  questions: [
    {
      id: 1,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which SQL command is used to retrieve data from a database?",
      options: [
        "INSERT",
        "SELECT",
        "UPDATE",
        "DELETE"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What is the purpose of the WHERE clause in SQL?",
      options: [
        "To group data",
        "To filter records",
        "To sort results",
        "To join tables"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Which SQL operator is used to combine multiple conditions?",
      options: [
        "AND",
        "OR",
        "NOT",
        "All of the above"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "What is the correct order of SQL query execution?",
      options: [
        "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY",
        "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY",
        "WHERE, FROM, GROUP BY, HAVING, SELECT, ORDER BY",
        "FROM, SELECT, WHERE, GROUP BY, HAVING, ORDER BY"
      ],
      correctAnswer: 1
    }
  ]
};

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
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
            <Text style={styles.title}>{quizData.title}</Text>
          </View>

          {showScore ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreTitle}>Quiz Complete!</Text>
              <Text style={styles.scoreText}>
                You scored {score} out of {quizData.questions.length}
              </Text>
              <Text style={styles.scorePercentage}>
                {Math.round((score / quizData.questions.length) * 100)}%
              </Text>
              <TouchableOpacity 
                style={styles.restartButton}
                onPress={resetQuiz}
              >
                <Text style={styles.restartButtonText}>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.contentContainer}>
              <View style={styles.questionContainer}>
                <Text style={styles.questionNumber}>
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </Text>
                <Text style={styles.questionText}>
                  {quizData.questions[currentQuestion].question}
                </Text>
              </View>

              <View style={styles.optionsContainer}>
                {quizData.questions[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && styles.selectedOption,
                      selectedAnswer !== null && 
                      index === quizData.questions[currentQuestion].correctAnswer && 
                      styles.correctOption,
                      selectedAnswer !== null && 
                      selectedAnswer === index && 
                      selectedAnswer !== quizData.questions[currentQuestion].correctAnswer && 
                      styles.wrongOption
                    ]}
                    onPress={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
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
  questionContainer: {
    marginBottom: 30,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: Colors.PRIMARY,
  },
  correctOption: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 