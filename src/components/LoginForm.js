// import React, { useState } from "react";
// import {
//   Box,
//   Heading,
//   HStack,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Button,
//   Link,
//   IconButton,
//   VStack,
// } from "@chakra-ui/react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
// import axios from "axios";
// import { toast } from "react-toastify";

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false); // State to show/hide password
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:1337/api/auth/local/",
//         {
//           identifier: formData.identifier,
//           password: formData.password,
//         }
//       );
//       localStorage.setItem("token", response.data.jwt);
//       console.log("User logged in:", response.data);

//       // Reset the form data
//       setFormData({
//         identifier: "",
//         password: "",
//       });

//       // Redirect to the profile page
//       navigate("/profile");
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast.error("Error logging in. Please try again.");
//     }
//   };

//   return (
//     <Box
//       textAlign="center"
//       mt={10}
//       p={6}
//       boxShadow="xl"
//       rounded="md"
//       bg="white"
//       w="400px"
//       mx="auto"
//     >
//       <Heading as="h2" size="lg" mb={4}>
//         Login
//       </Heading>
//       <VStack spacing={4} align="center">
//         <HStack spacing={4} align="center">
//           {/* Login via Google */}
//           <IconButton
//             as="a"
//             href="http://localhost:1337/api/connect/google"
//             aria-label="Login with Google"
//             colorScheme="red"
//             icon={<FaGoogle />}
//           />

//           {/* Login via Discord */}
//           <IconButton
//             as="a"
//             href="http://localhost:1337/api/connect/discord"
//             aria-label="Login with Discord"
//             colorScheme="blue"
//             icon={<FaDiscord />}
//           />

//           {/* Login via GitHub */}
//           <IconButton
//             as="a"
//             href="http://localhost:1337/api/connect/github"
//             aria-label="Login with GitHub"
//             colorScheme="gray"
//             icon={<FaGithub />}
//           />
//         </HStack>
//         <form onSubmit={handleSubmit}>
//           <FormControl>
//             <FormLabel>Email or Username</FormLabel>
//             <Input
//               type="text"
//               name="identifier"
//               value={formData.identifier}
//               onChange={handleInputChange}
//               required
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Password</FormLabel>
//             <InputGroup>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//               {formData.password && (
//                 <InputRightElement width="4.5rem">
//                   <IconButton
//                     h="1.75rem"
//                     size="sm"
//                     onClick={togglePasswordVisibility}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     icon={showPassword ? <FiEyeOff /> : <FiEye />}
//                   />
//                 </InputRightElement>
//               )}
//             </InputGroup>
//           </FormControl>{" "}
//           <br />
//           <Button type="submit" colorScheme="blue">
//             Log in
//           </Button>
//         </form>
//         <Link as={RouterLink} to="/signup" color="blue.500">
//           Don't have an account? Sign up here.
//         </Link>
//       </VStack>
//     </Box>
//   );
// }

// export default LoginForm;

// login
import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import axios from "axios";
import { toast } from "react-toastify";

function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate identifier and password fields before submitting
    if (!formData.identifier || !formData.password) {
      toast.error("Please provide a valid identifier and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/",
        {
          identifier: formData.identifier,
          password: formData.password,
        }
      );
      localStorage.setItem("token", response.data.jwt);
      console.log("User logged in:", response.data);

      setFormData({
        identifier: "",
        password: "",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please try again.");
    }
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
      position="relative"
      top="20vh"
    >
      <Heading as="h2" size="lg" mb={4}>
        Login
      </Heading>
      <VStack spacing={4} align="center">
        <HStack spacing={4} align="center">
          {/* Login via Google */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/google"
            aria-label="Login with Google"
            colorScheme="red"
            icon={<FaGoogle />}
          />

          {/* Login via Discord */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/discord"
            aria-label="Login with Discord"
            colorScheme="blue"
            icon={<FaDiscord />}
          />

          {/* Login via GitHub */}
          <IconButton
            as="a"
            href="http://localhost:1337/api/connect/github"
            aria-label="Login with GitHub"
            colorScheme="gray"
            icon={<FaGithub />}
          />
        </HStack>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email or Username</FormLabel>
            <Input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formData.password && (
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>{" "}
          <br />
          <Button type="submit" colorScheme="blue">
            Log in
          </Button>
        </form>
        <Link as={RouterLink} to="/signup" color="blue.500">
          Don't have an account? Sign up here.
        </Link>
      </VStack>
    </Box>
  );
}

export default LoginForm;
