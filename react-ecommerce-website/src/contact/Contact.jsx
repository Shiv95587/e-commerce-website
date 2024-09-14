import React from "react";
import "./ContactUs.css";
import PageHeader from "../components/PageHeader";

const ContactUs = () => {
  // TODO: Submit the message
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <PageHeader title={"Contact Us"} currentPage={"Contact Us"} />

      <section id="contact-us-form" className="contact-us-py-5">
        <div className="contact-us-container">
          <div className="contact-us-row">
            <div className="contact-us-col-md-8 contact-us-offset-md-2">
              <form className="contact-us-form">
                <div className="contact-us-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="contact-us-form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="contact-us-form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="contact-us-form-control"
                    id="email"
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
                  <button
                    type="submit"
                    className="contact-us-btn contact-us-btn-primary"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-us-text-white contact-us-text-center contact-us-footer">
        <p>&copy; 2024 [Your Company Name]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
