import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function WelcomePage() {
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Quiz App!
      </Heading>
      <Text fontSize="lg">Get ready to test your knowledge.</Text>
    </Box>
  );
}

export default WelcomePage;
