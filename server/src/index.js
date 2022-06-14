require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path');

const router = require("./routers/index.js")
const errorHandler = require("./middleware/errorHandlingrMiddleware")

const app = express()
const port = process.env.PORT || 8000;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/api", router)
app.get("/*", (_, res) => { res.sendFile(path.join(__dirname, "../../client/build/index.html"))});
app.use(errorHandler)



const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`Im listening on ${port}`))
    } catch (e) {
        console.log(e);
    }
}
start()