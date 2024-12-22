import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import connectCloudinary from './config/cloudinary.js';



const app = express()

const port = process.env.PORT || 4000;


app.use(express.json())

app.use(cors({origin:'*'}))

connectDB()
connectCloudinary()

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)


app.get('/', (req,res) => {

    res.send("API WORKING")
})

app.listen(port, () => console.log("Server started: ", port))