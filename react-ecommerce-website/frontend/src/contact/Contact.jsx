import React from "react";
import "./ContactUs.css";
import PageHeader from "../components/PageHeader";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const ContactUs = () => {
  // TODO: Submit the message
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { email } = useContext(AuthContext);
  return (
    <div>
      <PageHeader title={"Contact Us"} currentPage={"Contact Us"} />

      <section id="contact-us-form" className="contact-us-py-5">
        <div className="contact-us-container">
          <div className="contact-us-row">
            <div className="contact-us-col-md-8 contact-us-offset-md-2">
              <form className="contact-us-form">
                {/* <div className="contact-us-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="contact-us-form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div> */}
                <div className="contact-us-form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="contact-us-form-control"
                    id="email"
                    value={email}
                    disabled
                    placeholder="Your Email"
                  />
                </div>
                <div className="contact-us-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="contact-us-form-control"
                    id="message"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  {/* <button
                    type="submit"
                    className="contact-us-btn contact-us-btn-primary"
                  >
                    Send Message
                  </button> */}
                  <button
                    type="submit"
                    className="contact-us-btn contact-us-btn-primary lab-btn"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-white text-center about-us-footer d-flex h-full justify-content-center">
        <p className="d-flex flex-column justify-content-center m-0 my-2">
          &copy; 2024 ShopCart. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ContactUs;
