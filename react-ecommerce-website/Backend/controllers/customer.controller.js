import express from "express";
import { db } from "../server.js";
const router = express.Router();

// ----------GET REQUESTS-------------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM customers";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from MySQL");
    } else {
      res.json(result);
    }
  });
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email);
  // res.send("hel");

  try {
    // starting a transaction
    await db.promise().beginTransaction();

    const sqlQuery = "SELECT * FROM CUSTOMERS WHERE CUSTOMER_EMAIL = ?";
    const [results] = await db.promise().query(sqlQuery, [email]);
    console.log(results);
    // commiting the transaction
    await db.promise().commit();

    res.status(200).send(results);
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error Reading data: ", error);
    res.status(500).send({
      success: false,
      message: "Error reading data",
    });
  }
});

// ----------END GET REQUESTS----------

// ----------POST REQUESTS--------------

router.post("/add-customer", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  // Assuming req.body has the necessary data for multiple tables

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    const sqlQuery = "SELECT * FROM CUSTOMERS WHERE CUSTOMER_EMAIL = ?";
    const [result] = await db.promise().query(sqlQuery, [email]);
    console.log("result: ");
    if (result.length > 0) {
      await db.promise().rollback();
      return res
        .status(200)
        .json({ message: "User already Exists", success: false });
    }

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO CUSTOMERS (CUSTOMER_EMAIL, CUSTOMER_FIRSTNAME,CUSTOMER_LASTNAME, PASSWORD) VALUES (?, ?,?,?)",
        [email, firstName, lastName, password]
      );
    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into customer table successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into customer table:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into customer table",
    });
  }
});
// ----------END POST REQUESTS----------
export default router;
