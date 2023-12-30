import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const UpdateCustomer = () => {
  // Get ID
  const { id } = useParams();
  //console.log(id)
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
  // Call to queryAPI()
  useEffect(() => {
  // Query the API
  const queryAPI = async () => {
    const response = await axiosClient.get(`/api/get-customer/${id}`);
    setCustomer(response.data);
  };
    queryAPI();
    // eslint-disable-next-line
  }, []);

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
    let valid = !name || !lastname || !company || !email || !phone;
    return valid;
  };
  // Update customer
  const updateCustomer = (event) => {
    event.preventDefault();
    axiosClient
      .put(`/api/update-customer/${customer._id}`, customer)
      .then((res) => {
        //console.log(res);
        const { name, lastname } = customer;
        Swal.fire({
          title: "Edited Customer",
          text: `${name} ${lastname} was edited correctly!`,
          icon: "success",
        });
        // Send the user to the customer page.
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          console.error("Server error:", errorMessage);
          Swal.fire({
            title: "Some Thing Went Wrong",
            text: "The email already exists ",
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
      <h2>Edit Customer</h2>
      <p className="p">
        Use the following form to edit the information necessary to update the
        customer.
      </p>
      <form onSubmit={updateCustomer}>
        <legend>Edit any of the fields</legend>

        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Customer Name"
            name="name"
            onChange={updateState}
            value={customer.name}
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
            value={customer.lastname}
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
            value={customer.company}
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
            value={customer.email}
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
            value={customer.phone}
          />
        </div>

        <div className="send">
          <input
            type="submit"
            className="btn btn-blue"
            value="Save Changes"
            disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
};

export default UpdateCustomer;
