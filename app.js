const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()

//middleware
app.use(express.json())

//env
const port = process.env.PORT
const db = process.env.MONGO_URL

//routes
const mainRoute = require('./routes/main')


app.use('/api/v1', mainRoute)

const start = async () => {
    try {
        await mongoose.connect(db)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()