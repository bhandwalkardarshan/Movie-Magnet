import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Image, Flex, useToast, Button, SimpleGrid } from '@chakra-ui/react';
import Navbar from '../components/Navbar'

const Watchlist = () => {
    const baseURL = "http://localhost:3031"
  const [movies, setMovies] = useState([]);
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const toast = useToast()

  useEffect(() => {
    fetch(`${baseURL}/api/users/watchlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your API requires, for example:
        'Authorization': `${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setMovies(data);
    })
    .catch(error => {
      console.error('An error occurred while fetching the movies:', error);
    });
  }, []);

  const handleRemoveFromWatchlist = (movieId) => {
    fetch(`${baseURL}/api/users/watchlist/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your API requires, for example:
        'Authorization': `${token}`
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
        toast({
            title: `${data.message}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
      console.log('Movie removed from watchlist:', data);
      // Update the movies state to remove the movie
        setMovies(movies.filter(movie => movie._id !== movieId));
    })
    .catch((error) => console.error('An error occurred while removing the movie from the watchlist:', error));
  };
  

  return (
    <>
      <Navbar/>
      <Box p={5}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {movies.map((movie) => (
            <Flex key={movie._id} p={3} shadow="md" borderWidth="1px">
              
              <VStack align="center" m="auto">
              <Image src={movie.posterURL} alt={movie.title} boxSize="70%" objectFit="cover" />
                <Text fontWeight="bold" fontSize="lg">{movie.title}</Text>
                <Button colorScheme="teal" variant="outline" onClick={() => handleRemoveFromWatchlist(movie._id)}>
                  Remove from Watchlist
                </Button>
              </VStack>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Watchlist;
