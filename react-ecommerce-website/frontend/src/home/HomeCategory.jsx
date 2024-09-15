import React from "react";
import { Link } from "react-router-dom";
const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";

const categoryList = [
  // {
  //   imgUrl: "src/assets/images/category/01.jpg",
  //   imgAlt: "category rajibraj91 rajibraj",
  //   iconName: "icofont-brand-windows",
  //   title: "DSLR Camera",
  // },
  {
    imgUrl: "src/assets/images/category/shirts.jpg",
    imgAlt: "Category Shirts",
    iconName: "icofont-brand-windows",
    title: "Shirts",
    categoryName: "shirts",
  },
  {
    imgUrl: "src/assets/images/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Shoes",
    categoryName: "shoes",
  },
  // {
  //   imgUrl: "src/assets/images/category/03.jpg",
  //   imgAlt: "category rajibraj91 rajibraj",
  //   iconName: "icofont-brand-windows",
  //   title: "Photography",
  // },
  {
    imgUrl: "src/assets/images/category/pants.jpg",
    imgAlt: "Category Pants",
    iconName: "icofont-brand-windows",
    title: "Pants",
    categoryName: "pants",
  },
  {
    imgUrl: "src/assets/images/category/caps.jpg",
    imgAlt: "Category Pants",
    iconName: "icofont-brand-windows",
    title: "Caps",
    categoryName: "caps",
  },
  // {
  //   imgUrl: "src/assets/images/category/04.jpg",
  //   imgAlt: "category rajibraj91 rajibraj",
  //   iconName: "icofont-brand-windows",
  //   title: "Formal Dress",
  // },
  {
    imgUrl: "src/assets/images/category/05.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Bags",
    categoryName: "bags",
  },
  // {
  //   imgUrl: "src/assets/images/category/06.jpg",
  //   imgAlt: "category rajibraj91 rajibraj",
  //   iconName: "icofont-brand-windows",
  //   title: "Home Decor",
  // },
];

function HomeCategory() {
  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        {/* Section header */}
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>

        {/* Section Card */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categoryList.map((category, index) => (
              <div key={index} className="col">
                <Link
                  to={`/shop/${category.categoryName}`}
                  className="category-item"
                >
                  <div className="category-inner">
                    {/* Image of category */}
                    <div className="category-thumb">
                      <img src={category.imgUrl} alt="" />
                    </div>

                    {/* content of category */}
                    <div className="category-content">
                      <div className="cate-icon">
                        <i className={category.iconName}></i>
                      </div>
                      <Link to={`/shop/${category.categoryName}`}>
                        <h6>{category.title}</h6>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to={"/shop"} className="lab-btn">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategory;
