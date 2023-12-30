import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiodClient from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const CreateCustomer = () => {
  const navigate = useNavigate();
  // Use context values
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  // customer = state, setCustomer = function to save state
  const [customer, setCustomer] = useState({
    name: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
  });
  // Read form data
  const updateState = (event) => {
    //console.log(event.target.value)
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
    //console.log(customer)
  };
  // Validate form
  const validateCustomer = () => {
    const { name, lastname, company, email, phone } = customer;
    let valid =
      !name.length ||
      !lastname.length ||
      !company.length ||
      !email.length ||
      !phone.length;
    return valid;
  };
  // Add a new customer
  const addCustomer = async (event) => {
    event.preventDefault();
    await axiodClient
      .post("/api/add-customer", customer)
      .then((res) => {
        const { name, lastname } = customer;
        Swal.fire({
          title: "New Customer Added",
          text: `${name} ${lastname} was created correctly!`,
          icon: "success",
        });
       // Send the user to the customer page
       navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          //console.error("Server error:", errorMessage);
          Swal.fire({
            title: "Something Went Wrong",
            text: errorMessage,
            icon: "error",
          });
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

  return (
    <>
      <h2>New Customer</h2>
      <p className="p">
        Complete the following form with the information necessary to register a
        new client.
      </p>
      <form onSubmit={addCustomer}>
        <legend>Fill out all fields</legend>

        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Customer Name"
            name="name"
            onChange={updateState}
          />
        </div>

        <div className="field">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            placeholder="Customer Last Name"
            name="lastname"
            onChange={updateState}
          />
        </div>

        <div className="field">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            placeholder="Customer Company"
            name="company"
            onChange={updateState}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Customer Email"
            name="email"
            onChange={updateState}
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Customer Phone"
            name="phone"
            onChange={updateState}
          />
        </div>

        <div className="send">
          <input
            type="submit"
            className="btn btn-blue"
            value="Add Customer"
            disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
};

export default CreateCustomer;
