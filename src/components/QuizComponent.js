import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Avatar,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizComponent() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [showMenu, setShowMenu] = useState(false); // To show/hide the menu

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    if (token) {
      setName(storedName);

      axios
        .get("http://localhost:1337/api/quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setQuizzes(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Clear the token from local storage and navigate to the login page
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <Box textAlign="center" mt={10}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        px={4}
      >
        <Box // Container for Avatar and Menu
          position="relative"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <Avatar name={name} size="md" />
          {showMenu && (
            <Box
              position="absolute"
              bottom="-55px"
              right="-150%"
              bgColor="white"
              p={2}
              boxShadow="md"
              rounded="md"
              zIndex="10"
            >
              <Menu>
                <MenuButton>{name}</MenuButton>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
      <Heading as="h2" size="lg" mb={4}>
        Select a Quiz
      </Heading>
      <Box mx="auto" maxW="400px">
        {isLoading ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <VStack spacing={4} align="center">
            {quizzes.map((quiz) => (
              <Box
                key={quiz.id}
                p={4}
                borderWidth="1px"
                borderRadius="xl"
                boxShadow="md"
                width="100%"
                transition="transform 0.2s ease"
                _hover={{ transform: "scale(1.05)" }}
                _active={{ transform: "scale(0.95)" }}
              >
                <Heading size="md">{quiz.attributes.Title}</Heading>
                <Text>{quiz.attributes.Description}</Text>
                <Button
                  mt={2}
                  colorScheme="blue"
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  _hover={{ opacity: 0.8 }}
                >
                  Start Quiz
                </Button>
              </Box>
            ))}
            <Button
              mt={4}
              colorScheme="gray"
              onClick={() => navigate("/profile")}
              _hover={{ opacity: 0.8 }}
            >
              Back to Profile
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default QuizComponent;
