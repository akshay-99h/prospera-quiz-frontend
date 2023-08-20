import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function VerificationPage() {
  const { userId } = useParams();

  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {}, [userId]);

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
