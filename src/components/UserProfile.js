import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Button,
  Link,
  VStack,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      axios
        .get(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);

          // Add the username to local storage if not already present
          if (!localStorage.getItem("username")) {
            localStorage.setItem("username", response.data.username);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove the username from local storage
    navigate("/login");
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
    >
      <Heading as="h2" size="lg" mb={4}>
        User Profile
      </Heading>
      {userData ? (
        <VStack spacing={4} align="center">
          <Avatar size="xl" name={userData.username} />
          <Text>
            <strong>Username: </strong>
            {userData.username}
          </Text>
          <Text>
            <strong>Email: </strong>
            {userData.email}
          </Text>
        </VStack>
      ) : (
        <Text>Loading user profile...</Text>
      )}
      <Button mt={4} colorScheme="blue">
        <Link href="/quiz">Start Quiz</Link>
      </Button>{" "}
      <Button mt={4} colorScheme="red" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Box>
  );
}

export default UserProfile;
