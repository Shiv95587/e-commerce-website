import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "swiper/css";
import { Home } from "./home/Home.jsx";
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blog from "./blog/Blog.jsx";
import Shop from "./shop/Shop.jsx";
import SingleProduct from "./shop/SingleProduct.jsx";
import CartPage from "./shop/CartPage.jsx";
import Admin from "./admin/Admin.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import OrdersPage from "./orders/OrdersPage.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import About from "./about/About.jsx";
import Contact from "./contact/Contact.jsx";
import ErrorNotFound from "./not-found.jsx";
import PaymentCancel from "./paymentCancel.jsx";
import PaymentConfirmationPage from "./shop/PaymentConfirmationPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/payment-confirmation", element: <PaymentConfirmationPage /> },
      { path: "/404", element: <ErrorNotFound /> },
      // { path: "/blog", element: <Blog /> },
      {
        path: "/shop",
        element: <Shop />,
      },
      { path: "*", element: <ErrorNotFound /> },
      {
        path: "shop/:category",
        element: <Shop />,
      },
      {
        path: "shop/:category/:id",
        element: (
          <PrivateRoute>
            <SingleProduct />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "shop/:id",
      //   element: (
      //     <PrivateRoute>
      //       <SingleProduct />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },

      { path: "/about", element: <About /> },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/admin", element: <Admin /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/shop/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
