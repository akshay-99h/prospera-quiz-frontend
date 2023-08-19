import React from "react";
import { Box, Heading, Text, Center } from "@chakra-ui/react";

function ErrorNotFound() {
  return (
    <Center height="100vh">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        textAlign="center"
        boxShadow="xl"
      >
        <Heading as="h2" size="xl" mb={4} color="red.500">
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg">The page you are looking for does not exist.</Text>
      </Box>
    </Center>
  );
}

export default ErrorNotFound;
