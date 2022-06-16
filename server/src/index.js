require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path');
const stripe = require("stripe")(process.env.stripe_private)

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

app.post('/api/stripe', async (req, res) => {
    const price = Number(req.body.price) * 100;

    const intent = await stripe.paymentIntents.create({
        amount: Math.round(price * 100) / 100,
        currency: 'usd'
    });

    res.json({ client_secret: intent.client_secret, intent_id: intent.id });
});
app.post('/api/confirm-payment', async (req, res) => {
    const paymentType = String(req.body.payment_type);

    if (paymentType == "stripe") {
        const clientid = String(req.body.payment_id);

        stripe.paymentIntents.retrieve(
            clientid,
            function (err, paymentIntent) {

                if (err) {
                    console.log(err);
                }

                if (paymentIntent.status === 'succeeded') {

                    /**/
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            }
        );
    }
})
app.get("/*", (_, res) => { res.sendFile(path.join(__dirname, "../../client/build/index.html")) });
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