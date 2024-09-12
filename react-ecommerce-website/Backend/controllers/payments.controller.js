import express from "express";
import { db } from "../server.js";
const router = express.Router();
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res, next) => {
  const { products } = req.body;
  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products in request body" });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.img],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/orders",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

export default router;
