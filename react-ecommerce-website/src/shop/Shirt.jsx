import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const desc = "Shirts";
function Shirt({ items }) {
  // const { name, img, id, price, seller, ratingsCount, quantity } = item;

  const {
    PRODUCT_ID: id,
    PRODUCT_TITLE: name,
    PRODUCT_IMAGE: img,
    PRODUCT_PRICE: price,
    ratingsCount,
  } = items[0];

  const colors = [...new Set(items.map((item) => item.COLOR))];
  const sizes = items.map((item) => item.SHIRT_SIZE);
  const quantities = items.map((item) => item.QUANTITY);

  const [prequantity, setQuantity] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");

  const [color, setColor] = useState("Select Color");
  const { email } = useContext(AuthContext);

  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleDecrease(e) {
    if (prequantity > 1) setQuantity((prequantity) => prequantity - 1);
  }
  function handleIncrease(e) {
    setQuantity((prequantity) => prequantity + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const product = {
      id: id,
      img: img,
      name: name,
      price: price,
      quantity: prequantity,
      size: size,
      color: color,
      category: "Shirts",
      coupon,
    };

    const existingCart = JSON.parse(localStorage.getItem(email)) || [];

    console.log(existingCart);
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }

    console.log(existingCart);

    localStorage.setItem(email, JSON.stringify(existingCart));

    setQuantity(0);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");
  }

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>{ratingsCount}</span>
        </p>
        <h4>${price}</h4>

        <p>{desc}</p>
      </div>

      {/* Cart components */}

      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="select-product">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              {colors.map((color) => (
                <option key={color}>{color}</option>
              ))}
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              type="text"
              className="cart-plus-minus-box"
              name="qtybutton"
              id="qtybutton"
              value={prequantity}
              onChange={(e) => setQuantity(e.target.value, 10)}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>

          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          {/* btn section */}
          <button type="submit" className="lab-btn">
            <span>Add to Cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Shirt;
