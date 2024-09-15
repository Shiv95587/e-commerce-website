import { Link } from "react-router-dom";
export default function PaymentCancel() {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <p className="lead" style={{ fontWeight: "400" }}>
        Payment Failed, Try again🥲{" "}
        <Link
          to={"/cart-page"}
          className="text-decoration-underline text-warning font-weight-bold"
          style={{ fontWeight: "600", letterSpacing: "0.5px" }}
        >
          Cart
        </Link>
      </p>
    </div>
  );
}
