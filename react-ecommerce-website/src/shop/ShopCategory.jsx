import React from "react";

function ShopCategory({ categories, filterItem, selectedCategory }) {
  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">All Categories</h5>
      </div>

      <div>
        <button
          className={`m-2 ${"All" === selectedCategory ? "bg-warning" : ""} `}
          onClick={() => filterItem("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            className={`m-2 ${
              category === selectedCategory ? "bg-warning" : ""
            } `}
            key={category}
            onClick={() => filterItem(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default ShopCategory;
