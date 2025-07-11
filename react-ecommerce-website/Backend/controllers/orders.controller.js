import express from "express";
import { db } from "../server.js";

const router = express.Router();

// ----------GET REQUESTS-------------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM orders"; // ✅ lowercase table name
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from MySQL");
    } else {
      res.json(result);
    }
  });
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    await db.promise().beginTransaction();

    const [result] = await db
      .promise()
      .query("SELECT * FROM orders WHERE CUSTOMER_EMAIL = ?", [email]);

    console.log("Hi My orders are\n", result);

    await db.promise().commit();

    res.status(200).send(result);
  } catch (error) {
    await db.promise().rollback();

    console.error("Error receiving data from orders table:", error);
    res.status(500).json({
      success: false,
      message: "Error receiving data from orders table",
    });
  }
});

function getDate() {
  const currentDate = new Date();
  const options = { timeZoneName: "short", hour12: true };
  return currentDate.toLocaleString("en-US", options);
}

router.post("/:email", async (req, res) => {
  const email = req.params.email;
  const { productsText, cartSubTotal: total } = req.body;
  console.log(`products Text: ${productsText}   cartSubTotal: ${total}`);
  try {
    await db.promise().beginTransaction();

    await db
      .promise()
      .query(
        "INSERT INTO orders (CUSTOMER_EMAIL, ORDER_TIME, ORDER_PRODUCTS, TOTAL) VALUES (?, ?, ?, ?)",
        [email, getDate(), productsText, total]
      );

    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into orders table successfully",
    });
  } catch (error) {
    await db.promise().rollback();

    console.error("Error inserting data into orders table:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into orders table",
    });
  }
});

export default router;
