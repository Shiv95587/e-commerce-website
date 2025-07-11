import express, { json } from "express";
import cors from "cors";
import { createConnection } from "mysql2";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = [process.env.FRONTEND_DOMAIN];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Optional: if using cookies or auth headers
  })
);

app.use(json());

// import product Route it will handle all request related to product

import productRoute from "./controllers/product.controller.js";
import customerRoute from "./controllers/customer.controller.js";
import reviewRoute from "./controllers/review.controller.js";
import orderRoute from "./controllers/orders.controller.js";
import paymentRoute from "./controllers/payments.controller.js";
import authRoutes from "./controllers/auth.js";

// Middleware
app.use("/api/products", productRoute);
app.use("/api/customers", customerRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/auth", authRoutes);

// MySQL Connection
const db = createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: Buffer.from(process.env.DB_CA_CERT, "base64").toString("ascii"),
  },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong");
});

// Your API routes go here
// Example route to get data from MySQL
// app.get("/api/data", (req, res) => {
//   // res.json("Hi I am from bac");
//   const sql = "SELECT * FROM products";
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).send("Error retrieving data from MySQL");
//     } else {
//       res.json(result);
//     }
//   });
// });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { db };
