import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "../../App.css";
import { toast } from "react-toastify";
import axios from "axios";
import VARIABLES from "../../../environmentVariables";

const columns = [
    {
      name: "Image",
      selector: (row) => <img src={`${VARIABLES.API_URL_REMOTE}/uploads/${row.productImage}`} alt="Product" style={{width:'100px'}} />,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
    },
  ];
  

const data = [
  {
    order: "123",
    date: "Apple",
    status: "status",
    total: 454,
    action: "view",
  },
  {
    order: "312413",
    date: "Apple",
    status: "status",
    total: 454,
    action: "view",
  },
  {
    order: "54353",
    date: "Apple",
    status: "status",
    total: 454,
    action: "view",
  },
  {
    order: "546564",
    date: "Apple",
    status: "status",
    total: 454,
    action: "view",
  },
];

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }) => (
  <Button onClick={onExport} className="btn_filled">
    Export
  </Button>
);

export default function Products() {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    productImage: "",
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleExport = () => {
    downloadCSV(data);
  };

  const actionsMemo = React.useMemo(
    () => <Export onExport={handleExport} />,
    []
  );
  const productDetailsFormData = new FormData();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      productDetailsFormData.append(
        "productImage",
        productDetails.productImage
      );
      productDetailsFormData.append("productName", productDetails.productName);
      productDetailsFormData.append("price", productDetails.price);
      productDetailsFormData.append("stock", productDetails.stock);
      productDetailsFormData.append("category", productDetails.category);
      productDetailsFormData.append("description", productDetails.description);
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-product`,
        productDetailsFormData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        setProductDetails({
          productName: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          productImage: "",
        });

        handleProductsList();
        toast.success("Product added successfully !!");
      } else {
        toast.error("Failed to add the product!!");
      }
    } catch (error) {
      toast.error("Failed to add the product");
      console.log("Error:", error);
    }
  };

  const handleCategoryList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${VARIABLES.API_URL_REMOTE}/view-category`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);

      if (response.status === 200) {
        console.log("Category viewed successfully");
        setCategoryList(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("Category view failed");
      }
    } catch (error) {
      console.log("Error in category list:", error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "productImage") {
      setProductDetails({ ...productDetails, productImage: e.target.files[0] });
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const handleProductsList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${VARIABLES.API_URL_REMOTE}/view-product`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        // Map over the data and add an id property using the _id property
        const productListWithId = response.data.data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setProductList(productListWithId);
        console.log(productListWithId);

        console.log(response.data.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    handleProductsList();
  }, []);
  return (
    <>
    <div className="row justify-content-end ">
        <button
          className="btn_filled mb-3 me-3 w-auto"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          type="button"
          onClick={handleCategoryList}
        >
          <p className="p-0 m-0 fs-6">+ Add</p>
        </button>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                action="/add-product"
                method="post"
                onSubmit={handleAddProduct}
                enctype="multipart/form-data"
              >
                <div className="mb-3">
                  <label htmlFor="product-name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-name"
                    name="productName"
                    value={productDetails.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row m-0 p-0">
                  <div className="mb-3 col-6 ps-0">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-6 pe-0">
                    <label htmlFor="stock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={productDetails.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 ps-0">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select form-select-md"
                    aria-label="Large select example"
                    id="category"
                    name="category"
                    value={productDetails.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select category</option>
                    {categoryList.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 ps-0">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="formFileMultiple" className="form-label">
                    Product Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    id="formFileMultiple"
                    name="productImage"
                    // value={productDetails.productImage}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Card className="p-3">
        <DataTable
          title="Products"
          columns={columns}
          data={productList}
          progressPending={pending}
          actions={actionsMemo}
          selectableRows
          pagination
        />
      </Card>
    </>
  );
}
