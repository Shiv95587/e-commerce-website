import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider.jsx";
import axios from "axios";
function OrdersPage() {
  // const [cartItems, setCartItems] = useState([]);

  const [orders, setOrders] = useState([]);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual endpoint you want to request
        const apiUrl = `http://localhost:5000/api/orders/${email}`;
        const response = await axios.get(apiUrl);

        // Handle the successful response

        setOrders(response.data);
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, [email]); // The empty dependency array ensures that the effect runs once after the initial render

  return (
    <div>
      <PageHeader title={"Your Orders"} currentPage={"OrdersPage"}></PageHeader>
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top ">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Order #</th>
                    <th className="cat-price text-center">Time</th>
                    <th className="cat-quantity">Products</th>
                    <th className="cat-toprice">Total</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        {/* <div className="p-thumb">
                          <Link to={"/shop"}>
                            <img src={item.img} alt="" />
                          </Link>
                        </div> */}
                        <div className="p-content">
                          <Link to={"/"}>{order.ORDER_ID}</Link>
                        </div>
                      </td>

                      <td className="cat-price">
                        <div className="text-center">{order.ORDER_TIME}</div>
                      </td>
                      <td className="cat-quantity">
                        <div className="text-center">
                          {order.ORDER_PRODUCTS}
                        </div>
                      </td>

                      <td className="cat-price">$ {order.TOTAL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
