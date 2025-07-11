import express from "express";
import { db } from "../server.js";
import fs from "fs";
import { table } from "console";
const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT * FROM products P JOIN product_images PI ON P.PRODUCT_ID = PI.PRODUCT_ID";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from MySQL" + err);
    } else {
      res.json(result);
    }
  });
});

router.get("/popular-products", async (req, res, next) => {
  const categories = ["Shoes", "Pants", "Bags", "Caps", "Shirts"];
  const items = [];

  try {
    // Use Promise.all to execute queries in parallel
    await Promise.all(
      categories.map(async (category) => {
        const [results] = await db.promise().query(
          `SELECT *
          FROM products P 
          JOIN product_images PI ON P.PRODUCT_ID = PI.PRODUCT_ID 
          WHERE LOWER(P.PRODUCT_CATEGORY) = LOWER(?) 
          LIMIT 2`,
          [category]
        );
        items.push(...results); // Spread the results into the items array
      })
    );

    // console.log("Popular products on backend are: ", items);
    res.status(200).json({
      items: items,
      message: "Successfully retrieved popular products",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//---------------POST REQUESTS-------------------
router.post("/", async (req, res) => {
  console.log(req.body);

  // const sql =
  //   "INSERT INTO products (PRODUCT_TITLE,PRODUCT_PRICE, PRODUCT_CATEGORY) VALUES(?)";
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
      .query(`SELECT PRODUCT_CATEGORY FROM products WHERE PRODUCT_ID = ?`, [
        id,
        2,
      ]);
    console.log(categoryOfProduct);

    let sqlQuery;
    switch (categoryOfProduct) {
      case "Shoes":
        sqlQuery = `SELECT * FROM products JOIN shoes ON shoes.PRODUCT_ID = products.PRODUCT_ID JOIN product_images ON product_images.PRODUCT_ID = products.PRODUCT_ID WHERE products.PRODUCT_ID = ?`;
        break;
      case "Pants":
        sqlQuery = `SELECT * FROM products JOIN pants ON pants.PRODUCT_ID = products.PRODUCT_ID JOIN product_images ON product_images.PRODUCT_ID = products.PRODUCT_ID WHERE products.PRODUCT_ID = ?`;
        break;
      case "Shirts":
        sqlQuery = `SELECT * FROM products JOIN shirts ON shirts.PRODUCT_ID = products.PRODUCT_ID JOIN product_images ON product_images.PRODUCT_ID = products.PRODUCT_ID WHERE products.PRODUCT_ID = ?`;
        break;
      case "Bags":
        sqlQuery = `SELECT * FROM products JOIN bags ON bags.PRODUCT_ID = products.PRODUCT_ID JOIN product_images ON product_images.PRODUCT_ID = products.PRODUCT_ID WHERE products.PRODUCT_ID = ?`;
        break;
      case "Caps":
        sqlQuery = `SELECT * FROM products JOIN caps ON caps.PRODUCT_ID = products.PRODUCT_ID JOIN product_images ON product_images.PRODUCT_ID = products.PRODUCT_ID WHERE products.PRODUCT_ID = ?`;
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
async function deleteProduct(id, color, size, category) {
  try {
    // Start the transaction
    await db.promise().beginTransaction();

    let sqlQuery = "";
    let result = null;

    // Conditionally handle the presence of size
    if (size) {
      sqlQuery = `DELETE FROM ?? WHERE PRODUCT_ID=? AND COLOR=? AND SIZE=?`;
      result = await db
        .promise()
        .query(sqlQuery, [category.toLowerCase(), id, color, size]);
    } else {
      sqlQuery = `DELETE FROM ?? WHERE PRODUCT_ID=? AND COLOR=?`;
      result = await db
        .promise()
        .query(sqlQuery, [category.toLowerCase(), id, color]);
    }

    // Check if any other rows exist with the same PRODUCT_ID
    const [result2] = await db
      .promise()
      .query(`SELECT COUNT(*) as count FROM ?? WHERE PRODUCT_ID=?`, [
        category.toLowerCase(),
        id,
      ]);

    // If no rows exist, delete from products table
    if (result2[0].count === 0) {
      await db.promise().query(`DELETE FROM products WHERE PRODUCT_ID=?`, [id]);
    }

    await db.promise().commit();
    console.log("Product deleted successfully");
  } catch (error) {
    await db.promise().rollback();
    console.error("Error deleting product: ", error);
    throw error;
  }
}

// --------------PUT REQUESTS---------------
router.put("/update/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const category = req.body.category.toLowerCase();
  const size = req.body.size;
  const quantity = req.body.quantity;
  const color = req.body.color;
  try {
    // Start a transaction
    await db.promise().beginTransaction();

    const [result] = await db
      .promise()
      .query("SELECT * FROM products WHERE PRODUCT_ID = ?", [productId]);

    if (result.length === 0) {
      res.status(404).json({ message: "Item not found" });
    } else {
      const tableName = category;
      if (tableName === "bags" || tableName === "caps") {
        const data = await db
          .promise()
          .query(
            `UPDATE ${tableName} SET QUANTITY = QUANTITY - ${quantity} WHERE PRODUCT_ID = ${productId} AND QUANTITY >= ${quantity}`
          );

        console.log(data);

        const query2 =
          "SELECT QUANTITY FROM ?? WHERE PRODUCT_ID = ? AND COLOR=?";
        const [rows] = await db
          .promise()
          .query(query2, [category, productId, color]);

        if (rows.length > 0) {
          const quantity = rows[0].QUANTITY;
          console.log("Quantity is: ", quantity);

          if (quantity === 0) {
            deleteProduct(productId, color, size, category);
          }
        } else {
          console.log("No product found with the given details.");
        }

        res
          .status(200)
          .json({ message: "item found and data updated", item: data });
      } else {
        const data = await db
          .promise()
          .query(
            `UPDATE ${tableName} SET QUANTITY = QUANTITY - ${quantity} WHERE PRODUCT_ID = ${productId} AND SIZE = ${
              tableName !== "shirts" ? size : `${size}`
            } AND QUANTITY >= ${quantity}`
          );

        console.log(data);

        const query2 =
          "SELECT QUANTITY FROM ?? WHERE PRODUCT_ID = ? AND SIZE=? AND COLOR=?";
        const [rows] = await db
          .promise()
          .query(query2, [category.toLowerCase(), productId, size, color]);
        if (rows.length > 0) {
          const quantity = rows[0].QUANTITY;
          console.log("Quantity is: ", quantity);

          if (quantity === 0) {
            deleteProduct(productId, color, size, category);
          }
        } else {
          console.log("No product found with the given details.");
        }
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
        "INSERT INTO products (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category.toLowerCase()]
      );

    console.log("Product id is\n");

    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    const [result2] = await db
      .promise()
      .query(`INSERT INTO caps (PRODUCT_ID, COLOR, QUANTITY) VALUES (?,?,?)`, [
        productId,
        color,
        quantity,
      ]);

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO product_images (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
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
        "INSERT INTO products (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category.toLowerCase()]
      );

    console.log("Product id is\n");

    const [[{ PRODUCT_ID: productId }]] = await db
      .promise()
      .query("SELECT * FROM products ORDER BY product_id DESC LIMIT 1");
    console.log(productId);

    // Insert into Table 2
    const [result2] = await db
      .promise()
      .query(`INSERT INTO bags (PRODUCT_ID, COLOR, QUANTITY) VALUES (?,?,?)`, [
        productId,
        color,
        quantity,
      ]);

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO product_images (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
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
        "INSERT INTO products (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category.toLowerCase()]
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
          `INSERT INTO pants (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO product_images (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
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
        "INSERT INTO products (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, category.toLowerCase()]
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
          `INSERT INTO shirts (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO product_images (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
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
        "INSERT INTO products (PRODUCT_TITLE, PRODUCT_PRICE,PRODUCT_CATEGORY) VALUES (?,?,?)",
        [title, price, "shoes"]
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
          `INSERT INTO shoes (PRODUCT_ID, COLOR, SIZE, QUANTITY) VALUES (?,?,?,?)`,
          [productId, color, size[i], quantity[i]]
        );
    }

    const [result3] = await db
      .promise()
      .query(
        `INSERT INTO product_images (PRODUCT_IMAGE, PRODUCT_ID) VALUES(?,?)`,
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
