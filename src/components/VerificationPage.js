import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function VerificationPage() {
  const { userId } = useParams(); // Assuming you're passing the userId in the URL

  // You can add more state to track verification status, errors, etc.
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    // Here you can make an API call to your backend to verify the user's account using the userId.
    // Update the verificationStatus state based on the response.
    // For example:
    // const verifyUser = async () => {
    //   try {
    //     await api.verifyUser(userId);
    //     setVerificationStatus('success');
    //   } catch (error) {
    //     setVerificationStatus('error');
    //   }
    // };
    // verifyUser();
  }, [userId]);

  const renderMessage = () => {
    if (verificationStatus === "success") {
      return (
        <Text fontSize="lg" color="green.500">
          Your account has been successfully verified!
        </Text>
      );
    } else if (verificationStatus === "error") {
      return (
        <Text fontSize="lg" color="red.500">
          There was an error verifying your account. Please try again later.
        </Text>
      );
    } else {
      return <Text fontSize="lg">Verifying your account... Please wait.</Text>;
    }
  };

  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h2" size="lg" mb={4}>
        Account Verification
      </Heading>
      {renderMessage()}
    </Box>
  );
}

export default VerificationPage;
