const express = require("express");
const app = express();
const cors = require("cors");
// This is your real test secret API key.
const stripe = require("stripe")("");

app.use(cors())
app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
    return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'inr',
        description: req.body.description,
        // shipping: {
        //     name: req.body.name,
        //     address: {
        //         line1: req.body.line1,
        //         postal_code: req.body.zip,
        //         city: req.body.city,
        //         state: req.body.state,
        //         country: req.body.country,
        //     },
        // },
        receipt_email: req.body.email,
    });
    res.json({
        clientSecret: paymentIntent.client_secret
    });
});

app.post('/returnUrl', async (req, res) => {
    console.log('return url called')
    res.json({ sts: 'called' })
})
app.listen(3000, () => console.log('Node server listening on port 3000!')); 