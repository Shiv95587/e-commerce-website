import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import "./orders.css"; // Ensure your custom CSS is imported

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/orders/${email}`;
        const response = await axios.get(apiUrl);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div>
      <PageHeader title={"Your Orders"} currentPage={"OrdersPage"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <div className="table-responsive">
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th className="text-center">Order #</th>
                      <th className="text-center">Time</th>
                      <th className="text-center">Products</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={"/"}>{order.ORDER_ID}</Link>
                        </td>
                        <td className="text-center">{order.ORDER_TIME}</td>
                        <td className="text-center">{order.ORDER_PRODUCTS}</td>
                        <td>${order.TOTAL}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
