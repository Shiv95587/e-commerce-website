import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
function Login() {
  const { login, email } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(emailAddress, password);
    if (result === 1) {
      navigate(from);
    } else {
      alert("Incorrect email or password");
    }
  }

  useEffect(() => {
    if (email.length > 0) navigate("/");
  }, [email, navigate]);

  return (
    <div>
      {email.length === 0 && (
        <div className="login-section padding-tb section bg">
          <div className="container">
            <div className="account-wrapper">
              <h3 className="title">Login</h3>
              <form className="account-form" onSubmit={handleSubmit}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                    <div className="checkgroup">
                      <input type="checkbox" name="remember" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                    <Link to={"/forgetpass"}>Forget Password?</Link>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="d-block lab-btn">
                    <span>Login Now</span>
                  </button>
                </div>
              </form>

              <div className="account-bottom">
                <span className="d-block cate pt-10">
                  Don{"'"}t Have an Account ?{" "}
                  <Link to={"/sign-up"}>Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
