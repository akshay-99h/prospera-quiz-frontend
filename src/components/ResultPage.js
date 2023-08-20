import React from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Menu,
  Avatar,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

function Result() {
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
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
    <>
      <Box
        position="absolute"
        top="20px"
        right="20px"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <Avatar name={username} size="md" />
        {showMenu && (
          <Box
            position="absolute"
            bottom="-55px"
            right="0"
            bgColor="white"
            p={2}
            boxShadow="md"
            rounded="md"
            zIndex="10"
          >
            <Menu>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Menu>
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
        height="100vh"
      >
        <Box p={4} borderRadius="lg" boxShadow="md" bg="white">
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
          <HStack spacing={4} mt={4}>
            <Button
              as={ReactLink}
              to="/quiz"
              leftIcon={<ChevronLeftIcon />}
              colorScheme="blue"
              variant="outline"
            >
              Go Back to Quiz
            </Button>
            <Button
              as={ReactLink}
              to="/scores"
              leftIcon={<StarIcon />}
              colorScheme="blue"
            >
              View Scores
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default Result;
