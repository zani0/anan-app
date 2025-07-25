import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { CheckSquare, Square } from "lucide-react-native";

const questions = [
  {
    question: "What is the main character’s name?",
    options: ["Kofi", "Ama", "Kwame", "Esi"],
    correctAnswer: "Ama",
  },
  {
    question: "Where did the story take place?",
    options: ["Forest", "City", "Village", "Castle"],
    correctAnswer: "Village",
  },
  {
    question: "What was the animal in the story?",
    options: ["Dog", "Spider", "Bird", "Elephant"],
    correctAnswer: "Spider",
  },
];

export default function QuizOverlay({ onClose }: { onClose: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSelectOption = (option: string) => {
    if (selectedAnswers[currentQuestionIndex]) return; // prevent re-answering
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const score = selectedAnswers.filter(
    (answer, i) => answer === questions[i].correctAnswer
  ).length;

  return (
    <View style={styles.overlay}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>All Done!</Text>
          <Text style={styles.scoreText}>
            You got {score} out of {questions.length} correct.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Back to Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.quizTitle}>Quiz Time 🎉</Text>
          <Text style={styles.question}>
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </Text>

          <ScrollView style={{ marginVertical: 12 }}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isAnswerCorrect = option === currentQuestion.correctAnswer;
              const isWrong =
                isSelected && selectedOption !== currentQuestion.correctAnswer;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isAnswerCorrect && isSelected
                      ? styles.correct
                      : isWrong
                      ? styles.wrong
                      : styles.neutral,
                  ]}
                  onPress={() => handleSelectOption(option)}
                  disabled={!!selectedOption}
                >
                  {isSelected ? (
                    <CheckSquare color="white" />
                  ) : (
                    <Square color="white" />
                  )}
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.navButtons}>
            <TouchableOpacity
              style={[styles.button, { opacity: currentQuestionIndex === 0 ? 0.5 : 1 }]}
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.buttonText}>Previous Question</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: selectedOption ? "#8e44ad" : "#ccc" },
              ]}
              onPress={handleNext}
              disabled={!selectedOption}
            >
              <Text style={styles.buttonText}>
                {currentQuestionIndex === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8e44ad",
    marginBottom: 16,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  neutral: {
    backgroundColor: "#dfe6e9",
  },
  correct: {
    backgroundColor: "#00b894",
  },
  wrong: {
    backgroundColor: "#d63031",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  button: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 16,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
  scoreContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  scoreTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8e44ad",
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
