const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const port = process.env.PORT || 3001
const app = express()

// Imported Routes
const itemRoutes = require('./routes/itemRoutes')
const userRoutes = require('./routes/userRoutes')

const { errorHandler } = require('./middleware/errorMiddleware')


// Connection to MongoDB Atlas
const connectDB = require('./config/db')
connectDB()

// ** Important that this goes before routes **
// Allows req.body to be used 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/hello', (req, res) => {
  res.status(200).json({message: 'Hello World'})
})

app.use('/api/items', itemRoutes)
app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))