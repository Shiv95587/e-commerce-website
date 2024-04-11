import express from "express";
import { db } from "../server.js";
import { useParams } from "react-router-dom";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM REVIEWS";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from MySQL");
    } else {
      res.json(result);
    }
  });
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result] = await db
      .promise()
      .query(
        "SELECT * FROM REVIEWS R JOIN CUSTOMERS C ON R.CUSTOMER_EMAIL = C.CUSTOMER_EMAIL WHERE R.PRODUCT_ID = ?",
        [productId]
      );
    console.log(result);
    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data received FROM REVIEWS table successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error RECEIVING data into REVIEWS table:", error);
    res.status(500).json({
      success: false,
      message: "Error RECEIVING data into REVIEWS table",
    });
  }
});

function getDate() {
  const currentDate = new Date();
  const options = { timeZoneName: "short", hour12: true };
  const dateString = currentDate.toLocaleString("en-US", options);
  return dateString;
}
router.post("/:custemail/:prodid", async (req, res) => {
  const custemail = req.params.custemail;
  const prodid = req.params.prodid;
  const { value: rating, desc } = req.body;
  console.log(custemail);
  console.log(prodid);

  const date = getDate();
  try {
    // starting a transaction
    await db.promise().beginTransaction();

    const sqlQuery =
      "INSERT INTO REVIEWS (CUSTOMER_EMAIL, PRODUCT_ID, RATING,REVIEW_DESCRIPTION,REVIEW_DATE) VALUES(?,?,?,?,?)";
    const [results] = await db
      .promise()
      .query(sqlQuery, [custemail, prodid, rating, desc, date]);
    console.log(results);
    // commiting the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into REVIEWS table successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into REVIEWS table:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into REVIEWS table",
    });
  }
});

export default router;
