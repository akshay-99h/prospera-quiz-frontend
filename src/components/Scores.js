import React, { useEffect, useState } from "react";
import axios from "axios";

function Scores() {
  const [response, setResponse] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      // Fetch data from the API
      axios
        .get("http://localhost:1337/api/questions/")
        .then((response) => {
          setResponse(response.data.data);

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

  return (
    <div>
      <p>Max Score: {maxScore}</p>
      <p>Total Score: {totalScore}</p>
      {/* Other score-related content */}
    </div>
  );
}

export default Scores;
