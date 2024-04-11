import React, { useState } from "react";
import { Link } from "react-router-dom";
import Shop from "./Shop";
import Bag from "./Bag";
import Shoe from "./Shoe";
import Pant from "./Pant";
import Shirt from "./Shirt";
import Cap from "./Cap";

// const desc =
//   " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas alias fuga et ipsa sint assumenda inventore corrupti adipisci harum. Aliquid laudantium ad est fugit quia quisquam deleniti numquam tempore placeat?";

function ProductDisplay({ items, category }) {
  console.log(category);
  // const { name, img, id, price, seller, ratingsCount, quantity } = item;

  // const [prequantity, setQuantity] = useState(quantity);
  // const [coupon, setCoupon] = useState("");
  // const [size, setSize] = useState("Select Size");
  // const [color, setColor] = useState("Select Color");

  // function handleSizeChange(e) {
  //   setSize(e.target.value);
  // }

  // function handleColorChange(e) {
  //   setColor(e.target.value);
  // }

  // function handleDecrease(e) {
  //   if (prequantity > 1) setQuantity((prequantity) => prequantity - 1);
  // }
  // function handleIncrease(e) {
  //   setQuantity((prequantity) => prequantity + 1);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const product = {
  //     id: id,
  //     img: img,
  //     name: name,
  //     price: price,
  //     quantity: prequantity,
  //     size: size,
  //     color: color,
  //     coupon,
  //   };

  //   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const existingProductIndex = existingCart.findIndex(
  //     (item) => item.id === id
  //   );

  //   if (existingProductIndex !== -1) {
  //     existingCart[existingProductIndex].quantity += prequantity;
  //   } else {
  //     existingCart.push(product);
  //   }

  //   localStorage.setItem("cart", JSON.stringify(existingCart));

  //   setQuantity(0);
  //   setSize("Select Size");
  //   setColor("Select Color");
  //   setCoupon("");
  // }
  return (
    <div>
      {/* <div>
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
        <h6>{seller}</h6>
        <p>{desc}</p>
      </div> */}

      {/* Cart components */}
      {/* <div> */}
      {/* <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>Pink</option>
              <option>Ash</option>
              <option>Red</option>
              <option>White</option>
              <option>Blue</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div> */}

      {category === "Shoes" && <Shoe items={items} />}
      {category === "Pants" && <Pant items={items} />}
      {category === "Bags" && <Bag items={items} />}
      {category === "Caps" && <Cap items={items} />}
      {category === "Shirts" && <Shirt items={items} />}

      {/* <div className="cart-plus-minus">
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

          <div className="discount-code 8mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div> */}

      {/* btn section */}
      {/* <button type="submit" className="lab-btn">
            <span>Add to Cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div> */}
    </div>
  );
}

export default ProductDisplay;
