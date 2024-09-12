import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PageHeader from "../components/PageHeader";
import AddShoeDetails from "./components/AddShoeDetails";
import AddPantDetails from "./components/AddPantDetails";
import AddShirtDetails from "./components/AddShirtDetails";
import AddBagDetails from "./components/AddBagDetails";
import AddCapDetails from "./components/AddCapDetails";
import UpdateProduct from "./components/UpdateProduct";

function Admin() {
  const options = ["Shoes", "Pants", "Shirts", "Caps", "Bags"];
  const [selectedBtn, setSelectedBtn] = useState("Add");
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = React.useState(options[0]);

  return (
    <div>
      <PageHeader title={"Admin Page"} />

      <div className="padding-tb">
        <div className="container">
          <div className="row d-flex flex-column justify-content-center gap-5 ">
            <div className="col-lg-12 col-12 d-flex justify-content-center">
              <button
                className={`m-1 ${selectedBtn === "Add" ? "bg-warning" : ""}`}
                onClick={() => setSelectedBtn("Add")}
              >
                Add
              </button>
              <button
                className={`m-1 ${
                  selectedBtn === "Search" ? "bg-warning" : ""
                }`}
                onClick={() => setSelectedBtn("Search")}
              >
                Search
              </button>
              <button
                className={`m-1 ${
                  selectedBtn === "Update" ? "bg-warning" : ""
                }`}
                onClick={() => setSelectedBtn("Update")}
              >
                Update
              </button>
              <button
                className={`m-1 ${
                  selectedBtn === "Delete" ? "bg-warning" : ""
                }`}
                onClick={() => setSelectedBtn("Delete")}
              >
                Delete
              </button>
            </div>

            <div>
              {selectedBtn === "Add" && (
                <div className="d-flex col-lg-12 col-12">
                  <div className="col-lg-12 col-12">
                    <form>
                      <div className="mb-2 d-flex flex-column gap-3 align-items-center">
                        {/* <select className="select-product" aria-label="Select">
                          <option value="">Select a Category</option>
                          <option value="Shirt">Shirts</option>
                          <option value="pants">Pants</option>
                          <option value="caps">Caps</option>
                          <option value="Bags">Bags</option>
                        </select> */}
                        <Autocomplete
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          id="controllable-states-demo"
                          options={options}
                          sx={{ width: 330 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select a Category" />
                          )}
                        />

                        <div className="add-details">
                          {value === "Shoes" && <AddShoeDetails />}
                          {value === "Pants" && <AddPantDetails />}
                          {value === "Shirts" && <AddShirtDetails />}
                          {value === "Bags" && <AddBagDetails />}
                          {value === "Caps" && <AddCapDetails />}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {selectedBtn === "Search" && (
                <div className="col-lg-12 col-12">Search</div>
              )}

              {selectedBtn === "Update" && (
                <div className="d-flex flex-column align-items-center col-lg-12 col-12">
                  <form>
                    <div className="mb-2 d-flex flex-column gap-3 align-items-center">
                      <UpdateProduct />
                    </div>
                  </form>
                </div>
              )}

              {selectedBtn === "Delete" && (
                <div className="col-lg-12 col-12">Delete</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Admin;
