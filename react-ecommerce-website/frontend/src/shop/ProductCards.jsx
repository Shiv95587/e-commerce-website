import React from "react";
import { Link } from "react-router-dom";
function ProductCards({ GridList, products }) {
  function getCategoryName(category) {
    return category.substring(0, 1).toLowerCase() + category.substring(1);
  }
  return (
    <div>
      <div
        className={`shop-product-wrap row justify-content-left ${
          GridList ? "grid" : "list"
        }`}
      >
        {products.map((product, i) => (
          <div key={i} className="col-lg-4 col-md-6 col-12">
            <div className="product-item">
              <div className="product-thumb">
                {/* product image */}
                <div className="pro-thumb">
                  <img src={product.PRODUCT_IMAGE} alt="" />
                </div>

                {/* product action links */}
                <div className="product-action-link">
                  <Link
                    to={`/shop/${getCategoryName(product.PRODUCT_CATEGORY)}/${
                      product.PRODUCT_ID
                    }`}
                  >
                    <i className="icofont-eye"></i>
                  </Link>
                  {/* <a href="#">
                    <i className="icofont-heart"></i>
                  </a> */}
                  <Link to={`/shop/cart-page`}>
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>

              <div className="product-content">
                <h5>
                  <Link
                    to={`/shop/${getCategoryName(product.PRODUCT_CATEGORY)}/${
                      product.PRODUCT_ID
                    }`}
                  >
                    {product.PRODUCT_TITLE}
                  </Link>
                </h5>
                {/* TODO: Add Rating Feature */}

                {/* <p className="productRating">Rating</p> */}
                <p className="rating">
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  {/* <span>{ratingsCount}</span> */}
                </p>
                <h6>${product.PRODUCT_PRICE}</h6>
              </div>
            </div>

            {/* List Style */}
            <div className="product-list-item">
              <div className="product-thumb">
                {/* product image */}
                <div className="pro-thumb">
                  <img src={product.PRODUCT_IMAGE} alt="" />
                </div>

                {/* product action links */}
                <div className="product-action-link">
                  <Link
                    to={`/shop/${getCategoryName(product.PRODUCT_CATEGORY)}/${
                      product.PRODUCT_ID
                    }`}
                  >
                    <i className="icofont-eye"></i>
                  </Link>
                  {/* <a href="#">
                    <i className="icofont-heart"></i>
                  </a> */}
                  <Link to={`/cart-page`}>
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>

              <div className="product-content">
                <h5>
                  <Link
                    to={`/shop/${getCategoryName(product.PRODUCT_CATEGORY)}/${
                      product.PRODUCT_ID
                    }`}
                  >
                    {product.PRODUCT_TITLE}
                  </Link>
                </h5>
                {/* TODO: Add Rating Feature */}
                {/* <p className="productRating">Rating</p> */}
                <p className="rating">
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  <i className="icofont-star"></i>
                  {/* <span>{ratingsCount}</span> */}
                </p>
                <h6>${product.PRODUCT_PRICE}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
