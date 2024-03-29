const morgan = require('morgan')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const dotenv = require('dotenv')
/* eslint-disable-next-line no-unused-vars */
const colors = require('colors')

dotenv.config()
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const patientRoutes = require('./routes/patientRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

// Connect to database
connectDB()

const app = express()

// Added Builtin Middlewares Here
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)

app.get('/', (req, res) => {
    res.send('App is live :)')
})

// Custom Middlewares
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold))
