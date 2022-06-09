require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser')

const router=require("./routers/index.js")
const errorHandler =require("./middleware/errorHandlingrMiddleware")

const app = express()
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/",router)

app.use(errorHandler)



const start= async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, ()=> console.log(`Im listening on ${port}`))
    } catch (e) {
        console.log(e);
    }
}
start()