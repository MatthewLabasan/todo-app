require('dotenv').config();
const path = require('path')
const express = require('express')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

const app = express()
connectDB()

app.use(express.json()) 

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/tasks', require('./routes/taskRoutes'))
app.use('/users', require('./routes/userRoutes'))

mongoose.connection.once('open', () => {
    console.log("Server connected to MongoDB database successfully.")
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}.`)
    })
})