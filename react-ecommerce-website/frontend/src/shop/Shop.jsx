import React, { useCallback, useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import data from "../products.json";
import ProductCards from "./ProductCards";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import Pagination from "./Pagination.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import categoriesData from "../categories.json";

function Shop({ someprops }) {
  console.log("Somepo\n");
  console.log(someprops);
  const [GridList, setGridList] = useState(true);
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log("Category is:", searchParams.get("category"));

  const { category } = useParams();

  const [data, setData] = useState([]);
  const [products, setProducts] = useState(data);

  // Validate category
  useEffect(() => {
    console.log("PArams: ", category);
    if (!category) return;

    if (
      categoriesData.every(
        (categoryData) =>
          categoryData.category.toUpperCase() !== category.toUpperCase()
      )
    ) {
      navigate("/404", { replace: true });
    }
  }, [category, navigate]);

  // Fetch All Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual endpoint you want to request
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/products/`;
        const response = await axios.get(apiUrl);

        setData(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []); // The empty dependency array ensures that the effect runs once after the initial render

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  function paginate(pageNum) {
    setCurrentPage(pageNum);
  }

  const [selectedCategory, setSelectedCategory] = useState("All");
  // const menuItems = [...new Set(data.map((product) => product.category))];
  const menuItems = ["Shoes", "Pants", "Bags", "Caps", "Shirts"];
  const filterItem = useCallback(
    (curcat) => {
      if (curcat === "All") {
        setSelectedCategory(curcat);
        setProducts(data);
        return;
      } else {
        const items = data.filter(
          (product) =>
            product.PRODUCT_CATEGORY.toLowerCase() === curcat.toLowerCase()
        );

        setSelectedCategory(curcat);
        setCurrentPage(1);
        setProducts(items);
      }
    },
    [data]
  );

  useEffect(() => {
    if (!category) return;
    const currentCategory =
      category.substring(0, 1).toUpperCase() + category.substring(1);
    console.log("Current Category:", currentCategory);
    filterItem(currentCategory);
  }, [filterItem, category]);

  return (
    <div>
      <PageHeader title={"Our Shop Page"} currentPage={"Shop"}></PageHeader>

      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            {/* Left Side */}
            <div className="col-lg-12 col-12">
              <Search products={products} GridList={GridList} />
              <ShopCategory
                categories={menuItems}
                filterItem={filterItem}
                selectedCategory={selectedCategory}
              />
            </div>
            <div className="col-lg-12 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{`Showing ${products.length} results of ${data.length}`}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>

                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <ProductCards
                    GridList={GridList}
                    products={currentProducts}
                  />
                </div>
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            {/* Right Side */}
            {/* <div className="col-lg-4 col-12">
              <Search products={products} GridList={GridList} />
              <ShopCategory
                categories={menuItems}
                filterItem={filterItem}
                selectedCategory={selectedCategory}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
