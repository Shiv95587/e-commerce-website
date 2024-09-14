import express from "express";
import { db } from "../server.js";
import jwt from "jsonwebtoken";
// const secretKey = "secrethiddensecretkey";

const router = express.Router();
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await db.promise().beginTransaction();

    const sqlQuery = "SELECT * FROM CUSTOMERS WHERE CUSTOMER_EMAIL = ?";
    const [results] = await db.promise().query(sqlQuery, [email]);
    if (results.length === 0) {
      await db.promise().rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.PASSWORD !== password) {
      await db.promise().rollback();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await db.promise().commit();

    const token = jwt.sign(
      { email: user.CUSTOMER_EMAIL },
      process.env.AUTH_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    await db.promise().rollback();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
