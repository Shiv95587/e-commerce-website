import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { AuthContext } from "../Contexts/AuthProvider";
import "./review.css";
import axios from "axios";

const reviewTitle = "Add a Review";

// let ReviewList = [
//   {
//     imgUrl: "/src/assets/images/instructor/01.jpg",
//     imgAlt: "Client thumb",
//     name: "Ganelon Boileau",
//     date: "Posted on Jun 10, 2022 at 6:57 am",
//     desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
//   },
//   {
//     imgUrl: "/src/assets/images/instructor/02.jpg",
//     imgAlt: "Client thumb",
//     name: "Morgana Cailot",
//     date: "Posted on Jun 10, 2022 at 6:57 am",
//     desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
//   },
//   {
//     imgUrl: "/src/assets/images/instructor/03.jpg",
//     imgAlt: "Client thumb",
//     name: "Telford Bois",
//     date: "Posted on Jun 10, 2022 at 6:57 am",
//     desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
//   },
//   {
//     imgUrl: "/src/assets/images/instructor/04.jpg",
//     imgAlt: "Client thumb",
//     name: "Cher Daviau",
//     date: "Posted on Jun 10, 2022 at 6:57 am",
//     desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
//   },
// ];

function Review({ prodid }) {
  // const [reviewShow, setReviewShow] = useSearchParams(true);

  const { email } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [desc, setDesc] = useState("");
  const [reviews, setReviews] = useState([]);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const r = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}/${prodid}`,
      { value, desc }
    );
    console.log(r);
    navigate("/shop");
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${prodid}`
        );
        console.log("Reviews of prod is: ", res.data.data);
        if (res.data.success) setReviews(res.data.data);
        else setReviews([]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReviews();
  }, [prodid]);

  useEffect(() => {
    async function isAlreadyReviewed() {
      console.log(`Email: ${email}, product id: ${prodid}`);
      const res = await axios.get(
        `http://localhost:5000/api/reviews/check-review?custemail=${email}&prodid=${prodid}`
      );
      setAlreadyReviewed(res.data.reviewed);
    }

    isAlreadyReviewed();
  }, [email, prodid]);

  return (
    <>
      {reviews.length > 0 && (
        <ul className={`review-nav lab-ul RevActive`}>
          {/* <li className="desc" onClick={() => setReviewShow(!reviewShow)}>
          Description
        </li> */}
          <li className="rev">
            Reviews {reviews.length > 1000 ? "1k+" : reviews.length}
          </li>
        </ul>
      )}

      {/* desc & review content */}

      <div className={`review-content review-content-show`}>
        <div className="review-showing">
          {reviews.length > 0 && (
            <ul
              className="content lab-ul"
              style={{
                height: "500px", // Adjust the height as needed
                overflowY: "auto",
                // border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              {reviews.map((review, i) => (
                <li key={i}>
                  <div className="post-thumb d-flex flex-row justify-content-center align-items-center">
                    <div className="avatar-circle">
                      {reviews[i].CUSTOMER_FIRSTNAME.charAt(0)}
                    </div>
                    {/* <img src={review.imgUrl} alt="" /> */}
                    {/* <img src={ReviewList[i].imgUrl} alt="" /> */}
                  </div>
                  <div className="post-content">
                    <div className="entry-meta">
                      <div className="posted-on">
                        <a href="#">
                          {/* {review.CUSTOMER_FIRSTNAME +
                            " " +
                            review.CUSTOMER_LASTNAME} */}
                          {review.CUSTOMER_EMAIL}
                        </a>
                        <p>{review.REVIEW_DATE}</p>
                      </div>
                    </div>
                    <div className="entry-content">
                      <p>{review.REVIEW_DESCRIPTION}</p>
                    </div>
                  </div>
                </li>
              ))}
              {/* {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={review.imgUrl} alt="" />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.date}</p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))} */}
            </ul>
          )}

          {/* add review field */}

          {!alreadyReviewed && (
            <div className="client-review">
              <div className="review-form">
                <div className="review-title">
                  <h5>{reviewTitle}</h5>
                </div>
                <form action="action" className="row" onSubmit={handleSubmit}>
                  <div className="col-md-4 col-12 mb-2">
                    <div className="rating">
                      <span className="me-2">Your Rating</span>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      {/* Here we will put actual rating */}
                      {/* <Rating /> */}
                    </div>
                  </div>

                  {/* <div className="col-md-8 col-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                  />
                </div> */}

                  {/* <div className="col-md-4 col-12">
                  <input
                    type="email"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                  />
                </div> */}

                  <div className="col-md-12 col-12">
                    <textarea
                      name="message"
                      id="message"
                      rows="8"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Type Here message"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="default-button">
                      <span>Submit Review</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
