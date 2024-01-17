const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/user.routes')
const movieRoutes = require('./routes/movie.routes')
const reviewRoutes = require('./routes/review.routes')
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.port || 3031

app.use('/api', userRoutes)
app.use('/api', movieRoutes)
app.use('/api', reviewRoutes)

app.listen(port, () => {
    try {
        connectDB()
        console.log(`Server is running at http://localhost:${port}`)
    } catch (error) {
        console.log(error)
        console.log('something went wrong')
    }
})