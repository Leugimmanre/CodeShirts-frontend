import { useEffect, useState, useContext } from "react";
import axiosClient from "../../config/axios";
import ReadDeleteCustomer from "./ReadDeleteCustomers";
import { Link } from "react-router-dom";
//import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";
//import Spinner from "../layout/Spinner";

const Customers = () => {
  const navigate = useNavigate();
  // customers = state, setCustomers = function to save state
  const [customers, setCustomers] = useState([]);
  // Use context values
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  //console.log(auth);
  useEffect(() => {
    // Protect route by authentication
    if (auth.token !== "") {
      // Query the API
      const queryAPI = async () => {
        try {
          const consultCustomers = await axiosClient.get("/api/get-customers", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          // Put the result in the state.
          setCustomers(consultCustomers.data);
          //console.log(customers);
        } catch (error) {
          //Handle the error
          if (error.response && error.response.status === 500) {
            navigate("/login");
          }
        }
      };
      // Call to queryAPI(), right after the component starts for the first time,
      queryAPI();
    } else {
      navigate("/login");
    }
  }, [customers, auth.token, navigate]);
  //If state false
  if (!auth.auth) {
    navigate("/login");
  }
  //Load spinner
  // if (!customers.length) {
  //   return <Spinner />;
  // }

  return (
    <>
      <h2>Customers</h2>
      {/* Button to add customers */}
      <div className="line">
        <Link to={"/customers/new"} className="btn btn-green new-customer">
          <i className="fas fa-plus-circle"></i>
          New Customer
        </Link>
      </div>
      {/* Generate a list of customers */}
      <ul className="customers-list">
        {customers.map((customer) => (
          <ReadDeleteCustomer key={customer._id} customer={customer} />
        ))}
      </ul>
    </>
  );
};

export default Customers;
