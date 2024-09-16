import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory";
import axios from "axios";
const title = <h2>Search Your One From Thousand of Products</h2>;

const desc = "We have the largest collection of products";

function Banner() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [productsData, setProductsData] = useState([]);

  // useEffect(() => {
  //   console.log(productsData);
  // }, [productsData]);
  // let data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual endpoint you want to request
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/`;
        const response = await axios.get(apiUrl);

        // Handle the successful response

        setProductsData(response.data);
        setFilteredProducts(response.data);
        // console.log(filteredProducts);
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []); // The empty dependency array ensures that the effect runs once after the initial render

  function handleSearch(e) {
    setSearchInput(e.target.value);

    const filtered = productsData.filter((product) =>
      product.PRODUCT_TITLE.toLowerCase().includes(e.target.value)
    );
    setFilteredProducts(filtered);
    console.log(filtered);
  }
  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            {/* <SelectedCategory select={"all"} /> */}
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search your product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p>{desc}</p>
          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, index) => (
                <li key={index}>
                  <Link
                    to={`/shop/${product.PRODUCT_CATEGORY.toLowerCase()}/${
                      product.PRODUCT_ID
                    }`}
                  >
                    {product.PRODUCT_TITLE}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Banner;
