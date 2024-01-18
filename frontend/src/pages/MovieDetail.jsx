import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, Box, FormLabel, Button, VStack,Stack, List, ListItem, Textarea, Radio, RadioGroup, Text, Image, Flex, useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar'

const MovieDetail = () => {
  const baseUrl = 'https://doubtful-girdle-newt.cyclic.app'; 
  // const baseUrl = 'http://localhost:3031'
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const toast = useToast()
  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('0');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {setMovie(data)
      console.log(data.reviews)})
      .catch((error) => console.error('An error occurred while fetching the movie:', error));

      // Fetch reviews for the movie
    fetch(`${baseUrl}/api/movies/${id}/reviews`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => console.error('An error occurred while fetching the reviews:', error));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  // console.log(movie)
  const handleAddToWatchlist = () => {
      fetch(`${baseUrl}/api/users/watchlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      })
      .then((response) => {
        if (!response.ok) {
          toast({
            title: "Movie already present in watchlist",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
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
        console.log('Movie added to watchlist:', data);
      })
      .catch((error) => console.error('An error occurred while adding the movie to the watchlist:', error));
    };

    const handleAddReview = () => {
      fetch(`${baseUrl}/api/movies/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          review: reviewText,
          rating: rating
        })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setReviews([...reviews, data]);
        setReviewText('');
        setRating('0');
      })
      .catch((error) => console.error('An error occurred while adding the review:', error));
    };
  

  return (
    <>
      <Navbar/>
      <Flex p={5} shadow="md" borderWidth="1px">
        <Image src={movie.posterURL} alt={movie.title} boxSize="30%" objectFit="cover" />
        <VStack align="start" ml={5}>
          <Text fontWeight="bold" fontSize="2xl">{movie.title}</Text>
          <Text>Genre: {movie.genre}</Text>
          <Text>Release Year: {movie.year}</Text>
          <Text>Director: {movie.director}</Text>
          <Text>Cast: {movie.cast.join(', ')}</Text>
          <Text mt={2}>{movie.synopsis}</Text>
          <Button colorScheme="teal" variant="outline" onClick={handleAddToWatchlist}>Add to Watchlist</Button>
          <FormControl id="review">
            <FormLabel>Write a review:</FormLabel>
            <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <FormLabel mt={2}>Rating:</FormLabel>
            <RadioGroup value={rating} onChange={setRating}>
              <Stack direction='row'>
                <Radio value='1'>1</Radio>
                <Radio value='2'>2</Radio>
                <Radio value='3'>3</Radio>
                <Radio value='4'>4</Radio>
                <Radio value='5'>5</Radio>
              </Stack>
            </RadioGroup>
            <Button mt={2} onClick={handleAddReview}>Submit Review</Button>
          </FormControl>
          <Box>
            <Text><b>Reviews and ratings :</b></Text>
            <List mt={5} spacing={3}>
            {reviews.map((review, index) => (
              <ListItem key={index}>
                <Text>{review.review} {review.rating}/5</Text>
              </ListItem>
            ))}
          </List>
          </Box>
        </VStack>
      </Flex>
    </>
    
  );
};

export default MovieDetail;
