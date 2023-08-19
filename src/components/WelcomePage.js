import React from "react";
import { Box, Center, Heading, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function WelcomePage() {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to the Prospera Quiz App!
        </Heading>
        <Text fontSize="xl" mb={6}>
          Get ready to test your knowledge.
        </Text>
        <Button as={RouterLink} to="/signup" colorScheme="blue">
          Get Started
        </Button>
      </Box>
    </Center>
  );
}

export default WelcomePage;
