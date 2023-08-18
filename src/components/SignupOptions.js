import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignupOptions() {
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h2" size="lg" mb={4}>
        Signup Options
      </Heading>
      <VStack spacing={4}>
        <Button leftIcon={<FaGoogle />} colorScheme="blue" variant="solid">
          Sign up with Google
        </Button>
        <Button leftIcon={<FaGithub />} colorScheme="gray" variant="solid">
          Sign up with GitHub
        </Button>
        <Link to="/email-signup">
          <Button colorScheme="green" variant="outline">
            Sign up with Email
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default SignupOptions;
