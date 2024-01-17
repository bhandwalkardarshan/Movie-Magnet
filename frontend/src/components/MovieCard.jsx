import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`}>
        <Box key={movie._id} p={3} shadow="md" borderWidth="1px" w="95%" >
        <Image src={movie.posterURL} alt={movie.title} boxSize="auto" objectFit="cover" margin={'auto'}/>
        <Text fontWeight="bold" fontSize="md">{movie.title}</Text>
        <Text fontSize="xs">{movie.year}</Text>
        <Text mt={2} fontSize="xs">{movie.synopsis}</Text>
        </Box>
    </Link>
    
  );
};

export default MovieCard;
