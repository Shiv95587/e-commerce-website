import React from "react";
import "./AboutUs.css";
import PageHeader from "../components/PageHeader";
// import shivProfile from "./shiv-profile.jpg";
const AboutUs = () => {
  return (
    <>
      <PageHeader title={"About Us"} currentPage={"About Us"} />{" "}
      <div>
        <section id="our-mission" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Our Mission</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="mission-content">
                  <p>
                    At [Your Company Name], we are dedicated to offering a
                    diverse range of high-quality products including Shoes,
                    Pants, Shirts, Bags, and Caps. Our mission is to provide an
                    exceptional online shopping experience with a commitment to
                    excellent customer service and innovation.
                  </p>
                  <p>
                    We strive to stay ahead of trends and ensure that our
                    customers have access to the best and most reliable products
                    available. Our team works hard to meet your needs and exceed
                    your expectations.
                  </p>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <img
                  src="https://via.placeholder.com/400"
                  alt="Mission Image"
                  className="img-fluid mission-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="our-team" className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-4">Meet the Team</h2>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="team-member">
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt="Shiv Kumar"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h4>Shiv Kumar</h4>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="team-member">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Rohit Raja"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h4>Rohit Raja</h4>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="team-member">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Lov Kumar"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h4>Lov Kumar</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-white text-center about-us-footer">
          <p className="d-flex flex-row justify-content-center align-items-center py-2">
            &copy; 2024 [Your Company Name]. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;
