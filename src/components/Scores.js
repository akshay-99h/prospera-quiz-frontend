import React, { useEffect, useState } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Progress,
  Text,
  Avatar,
  Menu,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

function Scores() {
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem("username");
  const [maxScore, setMaxScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      // Fetch data from the API
      axios
        .get("http://localhost:1337/api/questions/")
        .then((response) => {
          // Calculate maxScore
          const userOccurrences = response.data.data.filter(
            (item) => item.attributes.givenAnswer?.[username]
          );
          setMaxScore(userOccurrences.length * 10);

          // Calculate totalScore
          let calculatedTotalScore = 0;
          userOccurrences.forEach((item) => {
            const givenAnswerKey = item.attributes.givenAnswer[username];
            const givenAnswerOptionKey = Object.keys(
              item.attributes.options
            ).find((key) => item.attributes.options[key] === givenAnswerKey);

            if (item.attributes.correctAnswer[givenAnswerOptionKey]) {
              calculatedTotalScore += 10;
            }
          });
          setTotalScore(calculatedTotalScore);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
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
  });
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
      <Button
        as={ReactLink}
        to="/quiz"
        leftIcon={<ChevronLeftIcon />}
        colorScheme="blue"
        variant="outline"
        position="relative"
        top="20px"
        left="20px"
      >
        Go Back to Quiz
      </Button>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          height="100vh"
        >
          <Box p={4} borderRadius="lg" boxShadow="md" bg="white" width="120%">
            {userData ? (
              <VStack spacing={2} align="center">
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
            )}{" "}
            <br />
            <VStack spacing={1} align="center">
              <Text fontWeight="bold" fontSize="lg" color="blue.500">
                Total Score
              </Text>
              <Text fontWeight="bold" fontSize="xl" color="green.500">
                {totalScore}/{maxScore}
              </Text>
              <Progress
                value={totalScore}
                max={maxScore}
                colorScheme="green"
                size="md"
                width="80%"
              />
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Scores;
