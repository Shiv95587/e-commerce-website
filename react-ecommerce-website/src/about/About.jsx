import React from "react";
import "./AboutUs.css";
import PageHeader from "../components/PageHeader";
import shivProfile from "./shiv-profile.jpg";
import lovProfile from "./lov-profile.jpg";
import missionImage from "./mission.jpg";
import rohitProfile from "./rohit-profile.jpg";
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
                    At <strong>ShopCart</strong>, we are dedicated to offering a
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
              <div className="col-md-6 text-center mission">
                <img
                  src={missionImage}
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
                  <a href="src\about\shiv-profile.jpg" target="_blank">
                    <img
                      src={shivProfile}
                      alt="Shiv Kumar"
                      className="img-fluid rounded-circle mb-3"
                    />
                  </a>
                  <h4>Shiv Kumar</h4>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="team-member">
                  <a href="src\about\rohit-profile.jpg" target="_blank">
                    <img
                      src={rohitProfile}
                      alt="Shiv Kumar"
                      className="img-fluid rounded-circle mb-3"
                    />
                  </a>
                  <h4>Rohit Raja</h4>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="team-member">
                  <a href="src\about\lov-profile.jpg" target="_blank">
                    <img
                      src={lovProfile}
                      alt="Lov Kumar"
                      className="img-fluid rounded-circle mb-3"
                    />
                  </a>

                  <h4>Lov Kumar</h4>
                </div>
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
    </>
  );
};

export default AboutUs;
