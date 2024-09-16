import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";

// import SwiperCore, { AutoPlay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
// import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import axios from "axios";
import SingleProductDisplay from "./SingleProductDisplay";
import ErrorNotFound from "../not-found";

// SwiperCore.use([AutoPlay]);

function SingleProduct() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log("id is: " + id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`;
        const response = await axios.get(apiUrl);
        console.log("res is " + response.data);
        setProduct(response.data);
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const result = product;

  console.log("product: ", result);
  // finding the category of item with given id
  const category = result[0]?.PRODUCT_CATEGORY;
  console.log("Cat", category);

  const isAllowedCategory = (category) => {
    if (!category) return;
    return (
      category === "Shoes" ||
      category === "Bags" ||
      category === "Caps" ||
      category === "Pants" ||
      category === "Shirts"
    );
  };

  return (
    <div>
      <PageHeader
        title={"OUR SHOP SINGLE"}
        currentPage={"shop / single-product"}
      />

      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            {/* Left Side */}

            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={"true"}
                            // autoplay={{
                            //   delay: 2000,
                            //   disawbleOnInteraction: false,
                            // }}
                            // modules={[AutoPlay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                            className="mySwiper"
                          >
                            {result.map((r, index) => (
                              <SwiperSlide key={index}>
                                <div className="single-thumb">
                                  <img src={r.PRODUCT_IMAGE} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          {/* <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>

                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          {typeof result[0] !== "undefined" &&
                            // <ProductDisplay
                            //   key={result[0].PRODUCT_ID}
                            //   items={result}
                            //   category={result[0].PRODUCT_CATEGORY}
                            // />
                            isAllowedCategory(category) && (
                              <SingleProductDisplay
                                key={result[0].PRODUCT_ID}
                                items={result}
                                category={result[0].PRODUCT_CATEGORY}
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  {typeof result[0] !== "undefined" && (
                    <Review prodid={result[0].PRODUCT_ID} />
                  )}
                </div>
              </article>
            </div>
            {/* <div className="col-lg-4 col-12">
              <aside></aside>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
