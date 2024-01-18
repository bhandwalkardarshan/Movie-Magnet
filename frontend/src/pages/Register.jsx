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

const Register = () => {
    const baseUrl = 'https://doubtful-girdle-newt.cyclic.app'
    // const baseUrl = 'http://localhost:3031'
    const navigate = useNavigate();
    const toast = useToast()
    const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const buttonColor = useColorModeValue('teal', 'green');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Prepare the data to be sent
    const userData = {
      username,
      avatar,
      email,
      password,
    };
    console.log(userData);
    try {
      // Send a POST request to your server
      const response = await fetch(`${baseUrl}/api/register`, {
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
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      // Handle the response data here
      console.log(data);
      setUsername('')
      setAvatar('')
      setEmail('')
      setPassword('')

        // Redirect to the login page
        navigate("/");
    } catch (error) {
      // Handle the error here
      console.error('An error occurred while registering the user:', error);
    }
  };
  
  return (
    <Box backgroundColor={formBackground} p={8} rounded={6} maxW="md" mx="auto" mt="100px">
      <form onSubmit={handleSubmit}>
        <Text textAlign={"center"} fontSize={18} margin={5}>Welcome to MovieMagnet</Text>
        <VStack spacing="24px">
          <FormControl id="username">
            <FormLabel>Username :</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="avatar">
            <FormLabel>Avatar URL :</FormLabel>
            <Input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </FormControl>
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
            Sign Up
          </Button>
          <Box>
            Already have an account?{' '}
            <Link as={RouterLink} to="/" color={`${buttonColor}.500`}>
              Log in
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  )
}

export default Register