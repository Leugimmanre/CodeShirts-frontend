import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosProduct from "../../config/axios";

const CreateProducts = () => {
  const navigate = useNavigate();
  // products = state, setProducts = function to save state
  const [products, setProducts] = useState({
    name: "",
    price: "",
  });
  // file = state, setFile = function to save state
  const [file, setFile] = useState(null);

  // Read form data
  const updateStateProducts = (event) => {
    setProducts({
      ...products,
      [event.target.name]: event.target.value,
    });
  };

  // Read files form data
  const updateStateFiles = (event) => {
    const selectedFiles = event.target.files[0];
    setFile(selectedFiles);
  };

  // Validate form
  const validateProducts = () => {
    const { name, price } = products;
    return !name || !price || !file;
  };

  // Add a new product
  const addProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("price", products.price);
    formData.append("image", file);
    try {
      await axiosProduct
        .post("/api/add-product", formData)
        .then((res) => {
          const { name } = products;
          Swal.fire({
            title: "New Product Aded",
            text: `${name} was created correctly!`,
            icon: "success",
          });
          // Send the user to the products page
          navigate("/products");
        })
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          title: "Something went Wrong",
          text: errorMessage,
          icon: "error",
        });
      } else {
        console.error("Error when making request:", error);
      }
    }
  };

  return (
    <>
      <h2>New Product</h2>
      <p className="p">
        Complete the following form with the information necessary to register a new product.
      </p>
      <form onSubmit={addProduct}>
        <legend>Fill out all fields</legend>

        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            name="name"
            onChange={updateStateProducts}
          />
        </div>

        <div className="field">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Product Price"
            name="price"
            min="0.00"
            step="0.01"
            onChange={updateStateProducts}
          />
        </div>

        <div className="field">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={updateStateFiles}
          />
        </div>

        <div className="send">
          <input
            type="submit"
            className="btn btn-blue"
            value="Add Product"
            disabled={validateProducts()}
          />
        </div>
      </form>
    </>
  );
};

export default CreateProducts;
