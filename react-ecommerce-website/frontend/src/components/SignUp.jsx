import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

function SignUp() {
  const [fullName, setfullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const { createUser, email } = useContext(AuthContext);

  function isFullNameValid(name) {
    // Check if the name contains exactly two words
    const words = name.split(" ");
    return words.length === 2;
  }

  useEffect(() => {
    if (email.length > 0) navigate("/");
  }, [email, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFullNameValid(fullName)) {
      alert("Please enter a valid full name with exactly two words");
      return;
    }

    if (pass.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (pass !== confirmPass) {
      alert("Passwords don't match");
      return;
    }

    const res = await createUser(fullName, emailAddress, pass);

    if (res) {
      clearFields();
      navigate("/login");
    } else {
      alert("Email already registered");
    }
  }

  function clearFields() {
    setfullName("");
    setEmailAddress("");
    setPass("");
    setConfirmPass("");
  }

  return (
    <div className="login-section padding-tb section bg">
      {email.length === 0 && (
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">Register</h3>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address *"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password *"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password *"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="d-block lab-btn">
                  <span>SignUp Now</span>
                </button>
              </div>
            </form>

            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Have an Account ? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
