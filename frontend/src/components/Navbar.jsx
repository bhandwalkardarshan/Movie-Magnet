import {React, useState} from 'react'
import {
    Box,
    Flex,
    Text,
    Input,
    InputGroup,
    Button,
    Link,
    useBreakpointValue
  } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ setSearchTerm }) => {
    const variant = useBreakpointValue({ base: 'outline', md: 'solid' });
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        // Perform the search using the searchTerm
        setSearchTerm(inputValue)
        console.log(`Searching for ${inputValue}`);
    };
  return (
    <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={2}
        bg="teal.500"
        color="white"
      >
        <Flex align="center">
          <Link as={RouterLink} to="/home">
            <Text fontSize="20px" fontWeight="bold">
              MovieMagnet
            </Text>
          </Link>
        </Flex>

        <InputGroup maxW="md" ml="2">
          <Input bg="white" color="black" placeholder="Search movies..." value={inputValue}
        onChange={handleInputChange}/>
          <Button variant={variant} bg="gray" color="white" justifyContent="center" alignItems="center" onClick={handleSearch}>Search</Button>
        </InputGroup>

        <Box ml="2">
          <Link as={RouterLink} to="/watchlist" mr="4">
            Watchlist
          </Link>
          <Link as={RouterLink} to="/">
            Logout
          </Link>
        </Box>
      </Flex>
  )
}

export default Navbar
