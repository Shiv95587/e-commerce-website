import express from "express";
import { db } from "../server.js";
import { useParams } from "react-router-dom";
import fs from "fs";
import { table } from "console";
const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT * FROM PRODUCTS P JOIN PRODUCT_IMAGES PI ON P.PRODUCT_ID = PI.PRODUCT_ID";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from MySQL" + err);
    } else {
      res.json(result);
    }
  });
});

//---------------POST REQUESTS-------------------
router.post("/", async (req, res) => {
  console.log(req.body);

  // const sql =
  //   "INSERT INTO PRODUCTS (PRODUCT_TITLE,PRODUCT_PRICE, PRODUCT_CATEGORY) VALUES(?)";
  // const values = [req.body.title, req.body.price, req.body.category];

  // db.query(sql, [values], (err, result) => {
  //   if (err) {
  //     return res.json(err);
  //   } else {
  //     return res.json(result);
  //   }
  // });

  //   res.status(201).send("Product Added successfully");
});

//------------------GET REQUESTS-------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // res.send("hel");

  try {
    // starting a transaction
    await db.promise().beginTransaction();
    const [[{ PRODUCT_CATEGORY: categoryOfProduct }]] = await db
      .promise()
      .query(`SELECT PRODUCT_CATEGORY FROM PRODUCTS WHERE PRODUCT_ID = ?`, [
        id,
        2,
      ]);
    console.log(categoryOfProduct);

    let sqlQuery;
    switch (categoryOfProduct) {
      case "Shoes":
        sqlQuery = `SELECT * FROM PRODUCTS JOIN Shoes ON SHOES.PRODUCT_ID = PRODUCTS.PRODUCT_ID JOIN PRODUCT_IMAGES ON PRODUCT_IMAGES.PRODUCT_ID = PRODUCTS.PRODUCT_ID WHERE PRODUCTS.PRODUCT_ID = ?`;
        break;
      case "Pants":
        sqlQuery = `SELECT * FROM PRODUCTS JOIN PANTS ON PANTS.PRODUCT_ID = PRODUCTS.PRODUCT_ID JOIN PRODUCT_IMAGES ON PRODUCT_IMAGES.PRODUCT_ID = PRODUCTS.PRODUCT_ID WHERE PRODUCTS.PRODUCT_ID = ?`;
        break;
      case "Shirts":
        sqlQuery = `SELECT * FROM PRODUCTS JOIN SHIRTS ON SHIRTS.PRODUCT_ID = PRODUCTS.PRODUCT_ID JOIN PRODUCT_IMAGES ON PRODUCT_IMAGES.PRODUCT_ID = PRODUCTS.PRODUCT_ID WHERE PRODUCTS.PRODUCT_ID = ?`;
        break;
      case "Bags":
        sqlQuery = `SELECT * FROM PRODUCTS JOIN BAGS ON BAGS.PRODUCT_ID = PRODUCTS.PRODUCT_ID JOIN PRODUCT_IMAGES ON PRODUCT_IMAGES.PRODUCT_ID = PRODUCTS.PRODUCT_ID WHERE PRODUCTS.PRODUCT_ID = ?`;
        break;
      case "Caps":
        sqlQuery = `SELECT * FROM PRODUCTS JOIN CAPS ON CAPS.PRODUCT_ID = PRODUCTS.PRODUCT_ID JOIN PRODUCT_IMAGES ON PRODUCT_IMAGES.PRODUCT_ID = PRODUCTS.PRODUCT_ID WHERE PRODUCTS.PRODUCT_ID = ?`;
    }

    const [results] = await db.promise().query(sqlQuery, [id]);

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

// -----------------END GET REQUESTS---------------

// --------------DELETE REQUESTS-----------
router.delete("/delete", (req, res) => {});
// --------------END DELETE REQUESTS-------

// --------------PUT REQUESTS---------------
router.put("/update/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const category = req.body.category;
  const size = req.body.size;
  const quantity = req.body.quantity;
  try {
    // Start a transaction
    await db.promise().beginTransaction();

    const [result] = await db
      .promise()
      .query("SELECT * FROM PRODUCTS WHERE PRODUCT_ID = ?", [productId]);

    if (result.length === 0) {
      res.status(404).json({ message: "Item not found" });
    } else {
      const tableName = category.toUpperCase();
      if (tableName === "BAGS" || tableName === "CAPS") {
        const data = await db
          .promise()
          .query(
            `UPDATE ${tableName} SET QUANTITY = QUANTITY - ${quantity} WHERE PRODUCT_ID = ${productId} AND QUANTITY >= ${quantity}`
          );

        console.log(data);
        res
          .status(200)
          .json({ message: "item found and data updated", item: data });
      } else {
        const data = await db
          .promise()
          .query(
            `UPDATE ${tableName} SET QUANTITY = QUANTITY - ${quantity} WHERE PRODUCT_ID = ${productId} AND SIZE = ${
              tableName !== "SHIRTS" ? size : `${size}`
            } AND QUANTITY >= ${quantity}`
          );

        console.log(data);
        res
          .status(200)
          .json({ message: "item found and data updated", item: data });
      }
    }

    db.promise().commit();
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();
    console.error("Error updating data into multiple tables:", error);
    res.status(500).json({ message: error });
  }
});
// --------------END PUT REQUESTS-----------

router.post("/add-cap", async (req, res) => {
  const { title, price, category, color, quantity, img } = req.body;
  // Assuming req.body has the necessary data for multiple tables

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO PRODUCTS (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category]
      );

    console.log("Product id is\n");

    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    const [result2] = await db
      .promise()
      .query(`INSERT INTO CAPS (PRODUCT_ID, COLOR, QUANTITY) VALUES (?,?,?)`, [
        productId,
        color,
        quantity,
      ]);

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO PRODUCT_IMAGES (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
        [img, productId]
      );

    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into multiple tables successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into multiple tables:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into multiple tables",
    });
  }
});

router.post("/add-bag", async (req, res) => {
  const { title, price, category, color, quantity, img } = req.body;
  // Assuming req.body has the necessary data for multiple tables

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO PRODUCTS (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category]
      );

    console.log("Product id is\n");

    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    const [result2] = await db
      .promise()
      .query(`INSERT INTO BAGS (PRODUCT_ID, COLOR, QUANTITY) VALUES (?,?,?)`, [
        productId,
        color,
        quantity,
      ]);

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO PRODUCT_IMAGES (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
        [img, productId]
      );

    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into multiple tables successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into multiple tables:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into multiple tables",
    });
  }
});

router.post("/add-pant", async (req, res) => {
  const { title, color, category, size, quantity, img, price } = req.body;

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO PRODUCTS (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category]
      );

    // fetching the product id from db
    console.log("Product id is\n");
    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    for (let i = 0; i < size.length; ++i) {
      const [result2] = await db
        .promise()
        .query(
          `INSERT INTO Pants (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO PRODUCT_IMAGES (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
        [img, productId]
      );

    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into multiple tables successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into multiple tables:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into multiple tables",
    });
  }
});

router.post("/add-shirt", async (req, res) => {
  const { title, color, category, size, quantity, img, price } = req.body;

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO PRODUCTS (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category]
      );

    // fetching the product id from db
    console.log("Product id is\n");
    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    for (let i = 0; i < size.length; ++i) {
      const [result2] = await db
        .promise()
        .query(
          `INSERT INTO Shirts (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO PRODUCT_IMAGES (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
        [img, productId]
      );

    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into multiple tables successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into multiple tables:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into multiple tables",
    });
  }
});

router.post("/add-shoe", async (req, res) => {
  const { title, color, category, size, quantity, img, price } = req.body;
  console.log("Hello body: ", req.body);

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Insert into Table 1
    const [result1] = await db
      .promise()
      .query(
        "INSERT INTO PRODUCTS (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, "Shoes"]
      );

    // fetching the product id from db
    console.log("Product id is\n");
    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    for (let i = 0; i < size.length; ++i) {
      const [result2] = await db
        .promise()
        .query(
          `INSERT INTO SHOES (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO PRODUCT_IMAGES (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
        [img, productId]
      );
    // Commit the transaction
    await db.promise().commit();

    res.status(200).json({
      success: true,
      message: "Data inserted into multiple tables successfully",
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.promise().rollback();

    console.error("Error inserting data into multiple tables:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data into multiple tables",
    });
  }
});
//---------------END POST REQUESTS-------------------

export default router;
