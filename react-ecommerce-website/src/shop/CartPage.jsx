import React, { useContext, useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import delImg from "../assets/images/shop/del.png";
import { AuthContext } from "../Contexts/AuthProvider";
import axios from "axios";
function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const { email } = useContext(AuthContext);

  useEffect(() => {
    // fetch cart item from db
    const storedCartItems = JSON.parse(localStorage.getItem(email)) || [];

    setCartItems(storedCartItems);
  }, [email]);

  function calculateTotalPrice(item) {
    return item.price * item.quantity;
  }

  //   handle quantity increase
  function handleIncrease(item) {
    item.quantity += 1;
    setCartItems([...cartItems]);

    // updte local storage with new items
    localStorage.setItem(email, JSON.stringify(cartItems));
  }

  // handle check out

  //   handle quantity increase
  function handleDecrease(item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);

      // updte local storage with new items
      localStorage.setItem(email, JSON.stringify(cartItems));
    }
  }

  //   handle item remove
  function handleRemoveItem(item) {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  }

  function updateLocalStorage(cart) {
    localStorage.setItem(email, JSON.stringify(cart));
  }

  //   cart sub-total
  const cartSubTotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  const navigate = useNavigate();
  async function handleCheckOut(e) {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem(email));

    for (let i = 0; i < products.length; ++i) {
      const product = products[i];

      const res = await axios.put(
        `http://localhost:5000/api/products/update/${product.id}`,
        product
      );
      console.log(res);
    }

    let productsText = "";

    for (let i = 0; i < products.length; ++i) {
      const product = products[i];
      productsText += `${product.quantity}x ${product.name}\n`;
    }

    console.log(productsText);

    const res = await axios.post(`http://localhost:5000/api/orders/${email}`, {
      productsText,
      cartSubTotal,
    });
    console.log(res);

    localStorage.removeItem(email);
    console.log("Key removed from local storage.");
    navigate("/");
  }

  return (
    <div>
      <PageHeader title={"Shop Cart"} currentPage={"Cart Page"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to={"/shop"}>
                            <img src={item.img} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={"/shop"}>{item.name}</Link>
                        </div>
                      </td>

                      <td className="cat-price">$ {item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>

                      <td className="cat-toprice">
                        ${calculateTotalPrice(item)}
                      </td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImg} alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-bottom">
              <div className="cart-checkout-box">
                <form className="cart-checkout">
                  <input
                    type="submit"
                    value={"Check Out"}
                    onClick={handleCheckOut}
                  />
                  {/* <div>Checkout Page</div> */}
                </form>
              </div>
              {/* checkout box end */}

              {/* shipping box */}
              <div className="shipping-box">
                <div className="row">
                  <div className="col-md-12 col-12">
                    {/* <div className="calculate-shipping"> */}
                    {/* <h3>Calculate Shipping</h3> */}

                    <div className="cart-overview">
                      <h3>Cart Total</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart SubTotal</span>
                          <p className="pull-right">$ {cartSubTotal}</p>
                        </li>

                        {/* <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li> */}

                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">
                            $ {orderTotal.toFixed(2)}
                          </p>
                        </li>

                        {/* <li>
                          <span className="pull-left">
                            <input type="textbox" />
                          </span>
                        </li> */}
                      </ul>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
