const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const Stripe= require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.post("/pay", async (req, res) => {
    try {
      const { amount, token } = req.body;
  
      await Stripe.charges.create({
        source: token, // Ensure that token is a string representing the token ID
        amount: amount,
        currency: "usd",
      });
  
      // Send a success response
      res.status(200).send("Payment successful");
    } catch (error) {
      console.error("Stripe Error:", error);
  
      // Send an error response
      res.status(500).send("Payment failed");
    }
  });
  
app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`);
});