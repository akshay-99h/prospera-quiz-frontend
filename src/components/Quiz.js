import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Avatar,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import "./Page.css";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [givenAnswer, setGivenAnswer] = useState("");
  const [timer, setTimer] = useState(-1);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [numberOfQ, setNumberOfQ] = useState(0);
  const [isNextSubmitting, setIsNextSubmitting] = useState(false);

  const handleAnswerSubmit = async () => {
    const selectedAnswer = {
      A: false,
      B: false,
      C: false,
      D: false,
    };
    selectedAnswer[givenAnswer] = true;

    const updatedQuestion = {
      ...question,
      givenAnswer: {
        ...question.givenAnswer,
        [name]: question.options[givenAnswer],
      },
    };

    const payload = {
      data: {
        givenAnswer: updatedQuestion.givenAnswer,
      },
    };
    setIsNextSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 6000));

    setIsNextSubmitting(false);
    try {
      await axios
        .put(
          `https://my-quiz-app-production.up.railway.app/api/questions/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("PUT response:", response.data);
        });
    } catch (error) {
      console.error("Error updating question:", error);
    }

    setGivenAnswer("");
    navigateToNextQuestion();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const storedName = localStorage.getItem("username");
    if (token) {
      setName(storedName);
      axios
        .get(
          `https://my-quiz-app-production.up.railway.app/api/questions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setQuestion(response?.data?.data?.attributes);
          setIsLoading(false);
          setTimer(response?.data?.data?.attributes?.timeLimit);
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
          setIsLoading(false);
        });
      if (1 < id && id < 6) {
        setNumberOfQ(5);
      } else if (6 < id && id < 12) {
        setNumberOfQ(11);
      } else {
        setNumberOfQ(17);
      }
    } else {
      navigate("/login");
    }
  }, [id, navigate, numberOfQ, token]);

  useEffect(() => {
    if (timer >= 1) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else if (timer === 0) {
      handleAnswerSubmit();
    }
  }, [timer, handleAnswerSubmit]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  const gotoProfile = () => {
    navigate("/profile");
  };
  const username = localStorage.getItem("username");
  const navigateToNextQuestion = async () => {
    const nextQuestionId = parseInt(id) + 1;
    console.log(nextQuestionId);
    console.log({ numberOfQ: numberOfQ });
    if (nextQuestionId <= numberOfQ) {
      navigate(`/quiz/${nextQuestionId}`);
    } else {
      navigate("/result");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ position: "relative", top: "0px" }}>
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
            bottom="-100px"
            right="0"
            bgColor="white"
            p={2}
            boxShadow="md"
            rounded="md"
            zIndex="10"
          >
            <Menu>
              <MenuButton>{name}</MenuButton>
              <Button onClick={gotoProfile} width={"100%"} marginBottom={"5px"}>
                Profile
              </Button>
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
        marginLeft="10%"
        marginRight="10%"
        height={"100vh"}
      >
        <Box p={4} borderRadius="lg" boxShadow="md" bg="white">
          <FormControl as="fieldset" mb={4}>
            <FormLabel as="legend" mb={2}>
              {question?.title}
            </FormLabel>
            <br />
            <RadioGroup
              value={givenAnswer}
              onChange={(value) => setGivenAnswer(value)}
              display="flex"
              flexDirection="column"
            >
              {question &&
                question.options &&
                Object.entries(question.options).map(([key, value]) => (
                  <Radio
                    key={key}
                    value={key}
                    mb={2}
                    isChecked={givenAnswer === key}
                  >
                    {value}
                  </Radio>
                ))}
            </RadioGroup>
            <br />
            <Button
              onClick={handleAnswerSubmit}
              disabled={!givenAnswer || isNextSubmitting}
              colorScheme="blue"
              _hover={{ opacity: 0.8 }}
            >
              {isNextSubmitting ? (
                <CircularProgress size="24px" color="blue.500" />
              ) : (
                "Next"
              )}
            </Button>
          </FormControl>
          <Box mt={4}>
            <CircularProgress
              value={timer}
              max={question?.timeLimit}
              color="blue.500"
              thickness={10}
              size="80px"
              position="relative"
              left="90%"
              transform="translateX(-55%)"
            >
              <CircularProgressLabel>{timer}</CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Quiz;
