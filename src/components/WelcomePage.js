import React from "react";
import { Box, Center, Heading, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "./Page.css";

function WelcomePage() {
  return (
    <div className="container" style={{ position: "relative", top: "0px" }}>
      <Center h="100vh">
        <Box className="content-box" textAlign="center">
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
    </div>
  );
}

export default WelcomePage;
