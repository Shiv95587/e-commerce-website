import React from "react";
import "./ContactUs.css";
import PageHeader from "../components/PageHeader";

const ContactUs = () => {
  return (
    <div>
      {/* <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Contact Us</h1>
          <p className="lead">
            We&apos;d love to hear from you. Fill out the form below to get in
            touch.
          </p>
        </div>
      </header> */}
      <PageHeader title={"Contact Us"} currentPage={"Contact Us"} />

      <section id="contact-form" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white text-center py-3">
        <p>&copy; 2024 [Your Company Name]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
