import React from "react";
import { Box, Heading, Text, Center } from "@chakra-ui/react";
import "./Page.css";

function ErrorNotFound() {
  return (
    <div className="container" style={{ position: "relative", top: "0px" }}>
      <Center height="100vh">
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          textAlign="center"
          boxShadow="xl"
          bg="white"
          opacity={"0.90"}
        >
          <Heading as="h2" size="xl" mb={4} color="red.500">
            404 - Page Not Found
          </Heading>
          <Text fontSize="lg">
            The page you are looking for does not exist.
          </Text>
        </Box>
      </Center>
    </div>
  );
}

export default ErrorNotFound;
