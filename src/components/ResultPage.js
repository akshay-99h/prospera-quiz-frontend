import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

function ResultPage() {
  const navigate = useNavigate();

  // Assuming you have a way to retrieve the quiz results from local storage
  const quizResults = JSON.parse(localStorage.getItem("quizResults"));
  const totalQuestions = quizResults.length;
  const correctAnswers = quizResults.filter(
    (result) => result.isCorrect
  ).length;
  const score = (correctAnswers / totalQuestions) * 100;

  const handleBackToQuizzes = () => {
    navigate("/quiz-list"); // Replace with the actual route of the quiz list page
  };

  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h2" size="lg" mb={4}>
        Quiz Results
      </Heading>
      <Text>Your Score: {score.toFixed(2)}%</Text>
      <Text>
        Correct Answers: {correctAnswers} / {totalQuestions}
      </Text>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleBackToQuizzes}
        _hover={{ opacity: 0.8 }}
      >
        Back to Quizzes
      </Button>
    </Box>
  );
}

export default ResultPage;
