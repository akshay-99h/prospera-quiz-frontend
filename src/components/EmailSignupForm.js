import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function EmailSignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions here, such as API calls to create the user.

    // Reset the form data
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Box textAlign="center" mt={10}>
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
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="green">
            Sign Up
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default EmailSignupForm;
