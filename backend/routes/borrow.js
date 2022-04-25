const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const client = require("../mongodb");
const multer = require("multer");
const path = require("path");

// Get all order borrow
router.get("/all", async (req, res) => {
  client.query(`Select * from borrows`, (err, result) => {
    if (res) {
      const response = result.rows;
      res.json({
        response,
      });
      return result.rows;
    } else {
      console.log(err.message);
    }
    client.end;
  });
});

// Create order borrow
router.post("/new", async (req, res) => {
  const { title, category, image, description, price, rate, count } = req.body;
  if (req.body) {
    const query = `INSERT INTO borrows (title, category, image, description, price, rate, count) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    let params = [title, category, image, description, price, rate, count];
    await client.query(query, params, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      } else {
        res.send({
          message: "Create Borrow Success !",
          data: {
            title: title,
            category: category,
            image: image,
            description: description,
            rating: {
              rate: rate,
              count: count,
            },
            price: price,
          },
        });
        console.log("Data insert successful");
        return result;
      }
    });
  }
  client.end;
});

module.exports = router;
