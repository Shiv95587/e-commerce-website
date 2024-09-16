// PaymentConfirmationPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthProvider";

function PaymentConfirmationPage() {
  const navigate = useNavigate();
  const { email } = React.useContext(AuthContext);

  useEffect(() => {
    const handlePostPayment = async () => {
      const products = JSON.parse(localStorage.getItem(email));
      if (!products) {
        return navigate("/orders");
      }

      try {
        for (let i = 0; i < products.length; ++i) {
          const product = products[i];
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/update/${
              product.id
            }`,
            product
          );
        }

        let productsText = "";
        for (let i = 0; i < products.length; ++i) {
          const product = products[i];
          productsText += `${product.quantity}x ${product.name}\n`;
        }

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${email}`,
          {
            productsText,
            cartSubTotal: products.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          }
        );

        localStorage.removeItem(email);
        navigate("/orders");
      } catch (error) {
        console.error("Error during post-payment processing:", error);
      }
    };

    handlePostPayment();
  }, [email, navigate]);

  return <div>Processing your payment...</div>;
}

export default PaymentConfirmationPage;
