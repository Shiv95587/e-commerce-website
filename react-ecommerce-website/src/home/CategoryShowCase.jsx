import React, { useState } from "react";
import { Link } from "react-router-dom";
const title = "Our Products";

const ProductData = [
  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4feb20f4d990407cb4f1a88a0040b212_9366/Relaxed_Strap-Back_Hat_Black_BH7137_01_standard.jpg",
    cate: "Caps",
    title: "Relaxed Strap-Back Hat",
    brand: "Nike",
    price: "$30",
    id: 18,
  },
  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/ac09bb56249b43158485aca1007cc1ef_9366/Excel_Backpack_Black_EX6933_01_standard.jpg",
    cate: "Bags",
    title: "Excel Backpack",

    brand: "D&J Bags",
    price: "$62",
    id: 73,
  },

  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a520df1b51384c00af9caca100489f04_9366/Trefoil_Backpack_Black_EX6752_01_standard.jpg",
    cate: "Bags",
    title: "Trefoil Backpack",
    price: "$65",
    id: 69,
  },

  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    cate: "Shoes",
    title: "ULTRABOOST 22 SHOES",
    brand: "Nike",
    price: "$420",
    id: 22,
  },

  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ec81fbd781fe4aa3a8cead230019c192_9366/AEROREADY_Designed_2_Move_Feelready_Sport_Tee_Burgundy_H30268_21_model.jpg",
    cate: "Shirts",
    title: "MOVE FEELREADY SPORT TEE",
    brand: "Zaara",
    price: "$14",
    id: 41,
  },

  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c7058d8677742ac8519ac3f009cdcf4_9366/Tiro_21_Track_Pants_Black_GH7305_21_model.jpg",
    cate: "Pants",
    title: "TIRO TRACK PANTS",
    brand: "Gucci",
    price: "$146",
    id: 50,
  },
  {
    imgUrl:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9a8256bb7ca34da49ff8ad5600bb2812_9366/4DFWD_Pulse_Shoes_White_Q46221_01_standard.jpg",
    cate: "Shoes",
    title: "4DFWD PULSE SHOES",
    brand: "Bata",
    price: "$226",
    id: 29,
  },
];

function CategoryShowCase() {
  const [items, setItems] = useState(ProductData);

  function filterItem(categoryItem) {
    const filteredItems = ProductData.filter(
      (product) => product.cate === categoryItem
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
              <li onClick={() => setItems(ProductData)}>All</li>
              <li onClick={() => filterItem("Shoes")}>Shoes</li>
              <li onClick={() => filterItem("Bags")}>Bags</li>
              <li onClick={() => filterItem("Shirts")}>Shirts</li>
              <li onClick={() => filterItem("Caps")}>Caps</li>
              <li onClick={() => filterItem("Pants")}>Pants</li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {items.map((product) => (
              <div key={product.id} className="col">
                <div className="course-item style-4">
                  <div className="course-inner">
                    <div className="course-thumb">
                      <img src={product.imgUrl} alt="" />
                      <div className="course-category">
                        <div className="course-cate">
                          <a href="#">{product.cate}</a>
                        </div>
                      </div>
                    </div>

                    <div className="course-content">
                      <Link
                        to={`/shop/${product.cate.toLowerCase()}/${product.id}`}
                      >
                        <h6>{product.title}</h6>
                      </Link>
                      <div className="course-footer">
                        {/* <div className="course-author">
                          <Link to={"/"} className="ca-name">
                            {product.brand}
                          </Link>
                        </div> */}
                        <div className="course-price">{product.price}</div>
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
