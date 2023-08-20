import React from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Divider,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

function SignupOptions() {
  return (
    <Box
      textAlign="center"
      mt={10}
      p={6}
      boxShadow="xl"
      rounded="md"
      bg="white"
      w="400px"
      mx="auto"
      position="relative"
      top="25vh"
    >
      <Heading as="h2" size="lg" mb={4}>
        Signup Options
      </Heading>
      <VStack spacing={4}>
        <HStack spacing={4} align="center">
          {/* Login via Google */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/google"
            aria-label="Login with Google"
            colorScheme="red"
            icon={<FaGoogle />}
          />

          {/* Login via Discord */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/discord"
            aria-label="Login with Discord"
            colorScheme="blue"
            icon={<FaDiscord />}
          />

          {/* Login via GitHub */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/github"
            aria-label="Login with GitHub"
            colorScheme="gray"
            icon={<FaGithub />}
          />
        </HStack>
        <Divider />
        <Link as={RouterLink} to="/email-signup">
          <Button leftIcon={<MdEmail />} colorScheme="green" variant="solid">
            Sign up with Email
          </Button>
        </Link>
        <Link as={RouterLink} to="/login" color="blue.500">
          Already have an account? Login here.
        </Link>
      </VStack>
    </Box>
  );
}

export default SignupOptions;
