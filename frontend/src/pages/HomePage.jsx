import {React, useEffect, useState} from 'react';
import {
  Box,
  SimpleGrid,
  Select,
  Flex,
  Button
} from '@chakra-ui/react';
import MovieCard from '../components/MovieCard.jsx'
import Navbar from '../components/Navbar.jsx'


const HomePage = () => {
  
  const baseUrl = 'https://moviemagnet.onrender.com';
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 4; 

  useEffect(() => {
     // replace with your base URL

    fetch(`${baseUrl}/api/movies?search=${searchTerm}&sort=${sortOption}&order=${sortOrder}&page=${page}&limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error('An error occurred while fetching the movies:', error));
  }, [searchTerm, sortOption, sortOrder, page]);
  // console.log(movies)
  return (
    <Box>
      <Navbar setSearchTerm={setSearchTerm}/>

      {/* Rest of your homepage components go here */}
      <Box p={5}>
      <Flex marginBottom={5}  justifyContent="space-evenly">
        <Select
            width={"25%"}
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
        >
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
        </Select>
        <Select
            width={"25%"}
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </Select>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5} >
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </SimpleGrid>
      <Flex marginTop={5} justifyContent="center">
          <Button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1} margin={3} width={20}>Prev</Button>
          <Button onClick={() => setPage((prevPage) => prevPage + 1)} margin={3} width={20}>Next</Button>
        </Flex>
    </Box>
    </Box>
  );
};

export default HomePage;
