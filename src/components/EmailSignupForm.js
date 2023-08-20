import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Spinner,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

function EmailSignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate username and email fields before submitting
    if (!formData.username || !formData.email) {
      toast.error("Please provide a valid username and email.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        formData
      );

      const user = response.data;
      localStorage.setItem("token", JSON.stringify(user.jwt));

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      toast.success("User registered successfully.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering user:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred while registering. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        Sign up with Email
      </Heading>
      <VStack spacing={4} align="center">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formData.password && (
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
          <br />
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            {isLoading ? <Spinner size="sm" /> : "Sign Up"}
          </Button>
        </form>
        <Link as={RouterLink} to="/login" color="blue.500">
          Already have an account? Login here.
        </Link>
      </VStack>
    </Box>
  );
}

export default EmailSignupForm;
