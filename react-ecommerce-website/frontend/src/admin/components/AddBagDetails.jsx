import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Button } from "bootstrap";
import React, { useState } from "react";
import "../style.css";
import axios from "axios";

function AddBagDetails() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // You can do additional checks or validations here if needed
      console.log(file);
      setSelectedImage(file);
    }
  };

  async function handleClick(e) {
    e.preventDefault();

    const data = {
      title,
      color,
      quantity,
      price,
      selectedImage,
      category: "Bags",
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/add-bag`,
      data
    );
    console.log(res);
    setTitle("");
    setColor("");
    setQuantity(0);
    setPrice(0);
    setSelectedImage(null);
  }

  function handlePrice(e) {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue) && newValue > 0) {
      // Update the quantity state only if it's a positive number
      setPrice(newValue);
    }
  }

  function handleQuantity(e) {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue) && newValue > 0) {
      // Update the quantity state only if it's a positive number
      setQuantity(newValue);
    }
  }
  // const
  return (
    <form className="d-flex flex-column gap-4 fade-in">
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        required
        style={{ width: "100%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Color"
        variant="outlined"
        required
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Quantity"
        variant="outlined"
        type="number"
        required
        value={quantity === 0 ? null : quantity}
        onChange={handleQuantity}
      />

      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        required
        type="number"
        InputProps={{
          startAdornment: <div style={{ marginRight: "8px" }}>$</div>,
          inputProps: {
            step: 1, // Set the step for decimal places if needed
          },
        }}
        value={price === 0 ? null : price}
        onChange={handlePrice}
      />

      <div>
        <div>
          <label htmlFor="imageInput">Select an image:</label>
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            width: "100%",
            height: "40px",
            marginBottom: "16px",
          }}
        />

        {selectedImage && (
          <div>
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "100%", maxHeight: "150px" }}
            />
          </div>
        )}
      </div>

      <button style={{ width: 300 }} className="m-1 bg-warning" type="submit">
        Add Bag
      </button>
    </form>
  );
}

export default AddBagDetails;
