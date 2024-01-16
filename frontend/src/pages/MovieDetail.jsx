import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, VStack, Text, Image, Flex } from '@chakra-ui/react';
import Navbar from '../components/Navbar'

const MovieDetail = () => {
  const { id } = useParams();
  const baseUrl = 'http://localhost:3031'; 
  const [movie, setMovie] = useState(null);

  useEffect(() => {

    fetch(`${baseUrl}/api/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error('An error occurred while fetching the movie:', error));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log(movie)

  return (
    <>
      <Navbar/>
      <Flex p={5} shadow="md" borderWidth="1px">
        <Image src={movie.posterURL} alt={movie.title} boxSize="300px" objectFit="cover" />
        <VStack align="start" ml={5}>
          <Text fontWeight="bold" fontSize="2xl">{movie.title}</Text>
          <Text>Genre: {movie.genre}</Text>
          <Text>Release Year: {movie.year}</Text>
          <Text>Director: {movie.director}</Text>
          <Text>Cast: {movie.cast.join(', ')}</Text>
          <Text mt={2}>{movie.synopsis}</Text>
          <Button colorScheme="teal" variant="outline">Add to Watchlist</Button>
        </VStack>
      </Flex>
    </>
    
  );
};

export default MovieDetail;
