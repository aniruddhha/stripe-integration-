const express = require("express");
const app = express();
const cors = require("cors");
// This is your real test secret API key.
const stripe = require("stripe")("");

app.use(cors())
app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    console.log(req.body.user)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "inr",
        description: 'hello test payment',
        shipping: {
            name: 'Parag',
            address: {
                line1: 'Paud Road',
                postal_code: '411038',
                city: 'pune',
                state: 'MH',
                country: 'IN',
            },
        },
        receipt_email: 'aniruddha.kudalkar@gmail.com'
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