import { useEffect, useState, useContext } from "react";
import axiosClient from "../../config/axios";
import { Link } from "react-router-dom";
//import Swal from "sweetalert2";
import ReadDeleteProducts from "./ReadDeleteProducts";
//import Spinner from "../layout/Spinner";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

// Listar todos los productos
const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // products = state, saveProducts = function to save state
  const [products, setProducts] = useState([]);
  // Use context values
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  //console.log(auth);
  // Query the API
  useEffect(() => {
    // Protect route by authentication
    if (auth.token !== '') {
      const queryAPI = async () => {
        try {
          const consultProducts = await axiosClient.get("/api/get-products", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          // Put the result in the state.
          setProducts(consultProducts.data);
        } catch (error) {
          // Handle the error
          if (error.response && error.response.status === 404) {
            //console.error("Error 404: No registered product found.");
            // Swal.fire({
            //   title: "No registered product found",
            //   text: "Press the new product button to add products",
            //   icon: "question",
            // });
          } else {
            console.error("Error:", error.message);
          }
        }
      };
      // Call to queryAPI(), right after the component starts for the first time,
      queryAPI();
    } else {
       navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Load spinner
  // if (!products.length) {
  //   return <Spinner />
  // }

  return (
    <>
      <h2>Products</h2>
      {/* Button to add products */}
      <div className="line">
        <Link to={"/products/new"} className="btn btn-green new-product">
          <i className="fas fa-plus-circle"></i>
          New Product
        </Link>
      </div>
      <ul className="product-list">
        {products.map((product) => (
            <ReadDeleteProducts
              // Key ID
              key={product._id}
              // Pass all the informations
              product={product}
            />
            ))}

      </ul>
    </>
  );
};

export default Products;
