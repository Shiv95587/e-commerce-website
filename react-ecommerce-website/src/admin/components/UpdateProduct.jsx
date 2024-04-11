import { TextField } from "@mui/material";
import React, { useState } from "react";

function UpdateProduct() {
  const [productId, setProductId] = useState(0);

  return (
    <div className="widget-search">
      <form>
        <TextField
          id="outlined-basic"
          label="Product Id"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <div style={{ marginLeft: "8px" }}>
                <i className="icofont-search-2"></i>
              </div>
            ),
            inputProps: {
              step: 1, // Set the step for decimal places if needed
            },
          }}
          value={productId === 0 ? null : productId}
          onChange={(e) => setProductId(Number(e.target.value))}
        />
      </form>
      {/* <TextField
        id="outlined-basic"
        label="Product ID"
        variant="outlined"
        value={productId === 0 ? null : productId}
        style={{ width: "300px" }}
        onChange={(e) => setProductId(Number(e.target.value))}
      /> */}
    </div>
  );
}

export default UpdateProduct;
