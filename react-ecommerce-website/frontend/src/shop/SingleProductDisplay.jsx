import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import axios from "axios";
import Modal from "./Modal";
import "./temp.css";
export default function SingleProductDisplay({ items, category }) {
  const {
    PRODUCT_ID: id,
    PRODUCT_TITLE: name,
    PRODUCT_IMAGE: img,
    PRODUCT_PRICE: price,
    ratingsCount,
  } = items[0];
  // DB DATA
  const colors = [...new Set(items.map((item) => item.COLOR))];
  const sizes = items.map((item) => item.SIZE);
  console.log(`Category: ${category}, sizes: ${sizes}`);
  const quantities = items.map((item) => item.QUANTITY);

  // STATES
  const [prequantity, setQuantity] = useState(0);
  //   TODO: Implement discount/coupon functionality
  //   const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [error, setError] = useState(0);
  const [color, setColor] = useState("Select Color");
  const { email } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  // Effects
  useEffect(() => {
    setDesc(category);
  }, [category]);

  // Event Handlers
  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleDecrease(e) {
    if (prequantity > 1)
      setQuantity((prequantity) => parseInt(prequantity) - 1);
  }

  function handleIncrease(e) {
    setQuantity((prequantity) => parseInt(prequantity) + 1);
  }

  function hasSize(category) {
    return (
      category === "Shoes" || category === "Pants" || category === "Shirts"
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (
      color === "Select Color" ||
      parseInt(prequantity) === 0 ||
      (hasSize(category) && size === "Select Size")
    ) {
      alert("fill all fields");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    console.log("Data: ", res.data[0]);
    if (parseInt(prequantity) > res.data[0].QUANTITY) {
      setError(1);
    } else {
      const product = {
        id: id,
        img: img,
        name: name,
        price: price,
        quantity: parseInt(prequantity),
        ...(size === "Select Size" ? {} : { size }),
        color: color,
        category: category,
      };

      const existingCart = JSON.parse(localStorage.getItem(email)) || [];

      console.log(existingCart);
      const existingProductIndex = existingCart.findIndex(
        (item) => item.id === id && item.color == color && item.size === size
      );

      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += parseInt(prequantity);
      } else {
        existingCart.push(product);
      }

      console.log(existingCart);

      localStorage.setItem(email, JSON.stringify(existingCart));

      setQuantity(0);
      setSize("Select Size");
      setColor("Select Color");
      //   setCoupon("");
      setError(0);
    }
  }

  return (
    <div>
      <div>
        {" "}
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
          {hasSize(category) && (
            <div className="select-product size">
              <select value={size} onChange={handleSizeChange}>
                <option>Select Size</option>
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <i className="icofont-rounded-down"></i>
            </div>
          )}
          <div
            className={`select-product ${
              !hasSize(category) ? "select-product-full" : ""
            }`}
          >
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
              className="cart-plus-minus-box cart-plus-minus-box-2"
              name="qtybutton"
              id="qtybutton"
              value={prequantity}
              onChange={(e) => {
                if (/[^0-9]/.test(e.target.value)) return;
                setQuantity(e.target.value, 10);
              }}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>
          {error === 1 && <Modal setError={setError} />}

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
