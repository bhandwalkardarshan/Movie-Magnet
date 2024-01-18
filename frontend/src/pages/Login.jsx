import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const baseUrl = 'https://moviemagnet1.onrender.com'
  // const baseUrl = 'http://localhost:3031'
  const navigate = useNavigate();
  const toast = useToast()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the data to be sent
    const userData = {
      email,
      password
    };
    console.log(userData);
    try {
      // Send a POST request to your server
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(response)
      // Check if the request was successful
      if (!response.ok) {
        const data = await response.json();
        toast({
            title: `${data.message}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Get the response data
      const data = await response.json();
      // console.log(data.token)
      // Store the token in localStorage
      localStorage.setItem("accessToken", JSON.stringify(data.token));
      toast({
        title: 'Login Successful!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      // Handle the response data here
      console.log(data);
      setEmail('')
      setPassword('')

        // Redirect to the login page
        navigate("/home");
    } catch (error) {
      // Handle the error here
      console.error('An error occurred while registering the user:', error);
    }
  };

  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const buttonColor = useColorModeValue('teal', 'green');

  return (
    
      <Box backgroundColor={formBackground} p={8} rounded={6} maxW="md" mx="auto" mt="100px">
        <form onSubmit={handleSubmit}>
          <Text textAlign={"center"} fontSize={18} margin={5}>Welcome to MovieMagnet</Text>
          <VStack spacing="24px">
            <FormControl id="email">
              <FormLabel>Email :</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password :</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme={buttonColor} type="submit">
              Log in
            </Button>
            <Box>
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color={`${buttonColor}.500`}>
                Sign up
              </Link>
            </Box>
          </VStack>
        </form>
      </Box>
    
  );
};

export default Login;
