import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosProduct from "../../config/axios";
import Spinner from "../layout/Spinner";
import { CRMContext } from "../../context/CRMContext";

const UpdateProducts = () => {
  // Get ID
  const { id } = useParams();
  //console.log(id)
  const navigate = useNavigate();
  // Use context values
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  // product = state, setProduct = function to save state
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // file = state, setFile = function to save state
  const [file, setFile] = useState(null);
  useEffect(() => {
  // Query the API
  const queryAPI = async () => {
    const response = await axiosProduct.get(`/api/get-product/${id}`);
    setProduct(response.data);
  };
    queryAPI();
    // eslint-disable-next-line
  }, []);

  // Read form data
  const updateStateProducts = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  // Read files form data
  const updateStateFiles = (event) => {
    const selectedFiles = event.target.files[0];
    setFile(selectedFiles);
  };

  // Validate form
  const validateProduct = () => {
    const { name, price, image } = product;
    let valid = !name || !price || !image;
    return valid;
  };

  // Update product
  const updateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('image', file);
    await axiosProduct
      .put(`/api/update-product/${product._id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        //console.log(res);
        const { name } = product;
        Swal.fire({
          title: "Edited Product",
          text: `${name} was edited correctly!`,
          icon: "success",
        });
        // Send the user to the product page.
        navigate("/products");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          console.error("Server error:", errorMessage);
        } else {
          console.error("Error when making request:", error);
        }
      });
  };
  // Use useEffect to perform the redirection
  useEffect(() => {
    // Check if the user is authenticated
    if (!auth.auth && (localStorage.getItem('token') === auth.token)) {
      // Redirect to the desired route
      navigate("/");
    }
  }, [auth.auth, auth.token, navigate]);
  // Destructure data and spinner
  const { name, price, image } = product;
  if (!name) {
    return <Spinner/>
  }
  return (
    <>
      <h2>Edit Products</h2>
      <p className="p">
        Use the following form to edit the information necessary to update the
        product.
      </p>
      <form onSubmit={updateProduct}>
        <legend>Edit any of the fields</legend>

        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="product Name"
            name="name"
            onChange={updateStateProducts}
            defaultValue={name}
          />
        </div>

        <div className="field">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Product Price"
            name="price"
            min="0.00"
            step="0.01"
            onChange={updateStateProducts}
            defaultValue={price}
          />
        </div>

        <div className="field">
          <label htmlFor="image">Image:</label>
          {image ? (
            <img
                src={`http://localhost:4000/${image}`}
                alt="Pictures"
                width="300"
            />
          ): null
          }
          <input
            type="file"
            id="image"
            placeholder="product image"
            name="image"
            onChange={updateStateFiles}
          />
        </div>

        <div className="send">
          <input
            type="submit"
            className="btn btn-blue"
            value="Save Changes"
            disabled={validateProduct()}
          />
        </div>
      </form>
    </>
  );
};

export default UpdateProducts;
