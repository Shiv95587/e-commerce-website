import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const title = "Popular Products";

function CategoryShowCase() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchPopularItems() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/popular-products`
        );
        console.log(res.data.items);
        setAllItems(res.data.items);
        setItems(res.data.items);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPopularItems();
  }, []);

  function filterItem(categoryItem) {
    const filteredItems = allItems.filter(
      (product) => product.PRODUCT_CATEGORY === categoryItem
    );

    setItems(filteredItems);
  }
  return (
    <div className="course-section style-3 padding-tb">
      {/* shapes */}
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt="" />
      </div>
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt="" />
      </div>

      {/* main section */}
      <div className="container">
        {/* section header */}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(allItems)}>All</li>
              <li onClick={() => filterItem("Shoes")}>Shoes</li>
              <li onClick={() => filterItem("Bags")}>Bags</li>
              <li onClick={() => filterItem("Caps")}>Caps</li>
              <li onClick={() => filterItem("Pants")}>Pants</li>
              <li onClick={() => filterItem("Shirts")}>Shirts</li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {items.map((product) => (
              <div key={product.PRODUCT_ID} className="col">
                <div className="course-item style-4">
                  <div className="course-inner">
                    <div className="course-thumb">
                      <img src={product.PRODUCT_IMAGE} alt="" />
                      <div className="course-category">
                        <div className="course-cate">
                          <a
                            href={`/shop/${product.PRODUCT_CATEGORY.toLowerCase()}`}
                          >
                            {product.PRODUCT_CATEGORY}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="course-content">
                      <Link
                        to={`/shop/${product.PRODUCT_CATEGORY.toLowerCase()}/${
                          product.PRODUCT_ID
                        }`}
                      >
                        <h6>{product.PRODUCT_TITLE}</h6>
                      </Link>
                      <div className="course-footer">
                        {/* <div className="course-author">
                          <Link to={"/"} className="ca-name">
                            {product.brand}
                          </Link>
                        </div> */}
                        <div className="course-price">
                          $ {product.PRODUCT_PRICE}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryShowCase;
