const express = require('express')
const { default: mongoose } = require('mongoose')
const userRouter = require('./routes/user')
const multer = require('multer')
const app = express()
require('dotenv').config()

//middleware
app.use(express.json())
const storage = multer.memoryStorage()
const upload = multer({storage: storage})



//env
const port = process.env.PORT
const db = process.env.MONGO_URL

//routes
const mainRoute = require('./routes/main')


app.use('/api/v1', upload.single('image'), mainRoute)
app.use('/api/user', userRouter)
 
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