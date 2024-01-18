# Movie Magnet

## Description
This is a movie listing platform where users can browse, search, and save movies to watchlist.

## Features
- **Browse Movies**: Users can browse through a list of movies.
- **Search Movies**: 
    - Users can search for movies using the search bar. 
    - User can enter full or partial movie name to search movie.
    - User can search movie by genre of movie through search bar.
- **Watchlist**: Users can add and remove movies to watchlist.
- **Sorting**: 
    - User can sort movies by title and year
    - First select tag is to select sorting by year or name
    - Second select tag is to select soting type i.e. ascending to descending

## Installation
### For Backend Server
1. Clone the repository: `git clone https://github.com/bhandwalkardarshan/Movie-Magnet`
2. Navigate to the project directory: `cd backend`
3. Install dependencies: `npm install`
4. Create .env file.
5. Add MongoDB URL in .env file for connection : `MongoURL = <Mongo Database URL>` 
6. Add JWT_KEY in .env file: `JWT_KEY = <Your JWT secret key>`
7. Add port number in .env file: `port = <port number>`
8. Start the backend server: `npm start` 

### For Frontend Server
1. Navigate to the project directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend server: `npm run dev`

### TechStack
- Frontend: ReactJS + Vite, Chakra UI
- Backend: Express, Mongo DB, Json web token(JWT)

## API Endpoints

### User Registration - `/api/register`
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
        "username": "<username>",
        "avatar": "<avatar image url>",
        "email": "<email for registration>",
        "password": "<password>"
    }
    ```

### User Login - `/api/login`
- **Method**: POST
- **Description**: Login a user.
- **Request Body**:
    ```json
    {
        "email": "<email>",
        "password": "<password>"
    }
    ```

### Create Movie - `/api/movies`
- **Method**: POST
- **Description**: Add a new movie to the database.
- **Request Body**:
     ```json
        {
            "title": <title>,
            "genre": <genre>,
            "year": <year>,
            "director": <director name>,
            "cast": [
                <cast 1>,
                <cast 2>,
                <cast 3>
            ],
            "synopsis": <description of movie>,
            "posterURL": <movie poster url>
        }
    ```

### Get Movies - `/api/movies`
- **Method**: GET
- **Description**: Retrieve movies with optional search and sort parameters. 
- **Query Parameters**:
    - `search`: To search movie with title or genre.
    - `sort`: To sort by title or year.
    - `order`: To specify the order of sorting (asc or desc).
    ```json
        /movies?search=<search query> ->  To search movie with title or genre
        /movies?sort=title&order=desc  -> to sort by title in descending order
        /movies?sort=year&order=desc  -> to sort by year in descending order
### Get Movie by ID - `/api/movies/:id`
- **Method**: GET
- **Description**: Retrieve a specific movie by its ID.

### Update Movie - `/api/movies/:id`
- **Method**: PATCH
- **Description**: Update a specific movie by its ID.

### Delete Movie - `/api/movies/:id`
- **Method**: DELETE
- **Description**: Delete a specific movie by its ID.

### Add Movie to Watchlist - `/api/users/watchlist/:movieId`
- **Method**: PUT
- **Description**: Add a movie to the user's watchlist.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

### Get Movies from Watchlist - `/api/users/watchlist`
- **Method**: GET
- **Description**: Retrieve all movies in the user's watchlist.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

### Remove Movie from Watchlist - `/api/users/watchlist/:movieId`
- **Method**: DELETE
- **Description**: Remove a movie from the user's watchlist.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

### Create Review - `/api/movies/:movieId/reviews`
- **Method**: POST
- **Description**: Add review and rating for a movie.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

### Get Reviews of a movie - `/api/movies/:id/reviews`
- **Method**: GET
- **Description**: Retrieves all reviews of a movie.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

### Remove Review of Movie - `/api/reviews/:id`
- **Method**: DELETE
- **Description**: Removes a review from the movie.
- **Authentication**: This route requires a valid token to be sent in the `Authorization` header.

## Usage
Open your browser and visit `http://localhost:<port_number>`

## Deployed Links
    - Backend : `https://moviemagnet1.onrender.com`
    - Frontend : `https://movie-magnet-phi.vercel.app/`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

