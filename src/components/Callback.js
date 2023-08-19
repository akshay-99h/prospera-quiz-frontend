import React, { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Callback({ provider }) {
  const navigate = useNavigate();
  const providerRef = useRef(provider);

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    const query = window.location.search;
    const currentProvider = providerRef.current;

    if (accessToken) {
      axios
        .get(
          `http://localhost:1337/api/auth/${currentProvider}/callback/${query}`
        )
        .then((response) => {
          localStorage.setItem("token", response.data.jwt);
          console.log("User data:", response.data.user);
          console.log(response);
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error during callback:", error);
          toast.error(
            "Error during callback. Please retry using a different method."
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          // throw Error(`Callback failed with status code ${error}`);
        });
    }
  }, [navigate]);

  return null;
}

export default Callback;
