import express from "express";
import { db } from "../server.js";

const router = express.Router();

// ----------GET REQUESTS-------------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM ORDERS";
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
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result] = await db
      .promise()
      .query("SELECT * FROM ORDERS R WHERE CUSTOMER_EMAIL = ?", [email]);
    console.log("Hi My orders are\n");
    console.log(result);
    // Commit the transaction
    await db.promise().commit();

    res.status(200).send(result);
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error RECEIVING data FROM ORDERS table:", error);
    res.status(500).json({
      success: false,
      message: "Error RECEIVING data FROM REVIEWS table",
    });
  }
});

function getDate() {
  const currentDate = new Date();
  const options = { timeZoneName: "short", hour12: true };
  const dateString = currentDate.toLocaleString("en-US", options);
  return dateString;
}

router.post("/:email", async (req, res) => {
  const email = req.params.email;
  const { productsText, cartSubTotal: total } = req.body;
  // Assuming req.body has the necessary data for multiple table
  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO ORDERS (CUSTOMER_EMAIL, ORDER_TIME,ORDER_PRODUCTS, TOTAL) VALUES (?, ?,?,?)",
        [email, getDate(), productsText, total]
      );
    // localStorage.setItem(email, []);
    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into ORDERS table successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into ORDERS table:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into ORDERS table",
    });
  }
});

export default router;
