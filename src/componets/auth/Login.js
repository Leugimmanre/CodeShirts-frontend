import { useState, useEffect, useContext } from "react";
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  //console.log(auth);
  // State with form data
  const [credentials, setCredentials] = useState({});
  // Redirect
  const navigate = useNavigate();
  // login function
  const login = async (e) => {
    e.preventDefault();
    // Authenticate user
    try {
      const response = await axiosClient.post("/api/authenticate", credentials);
      // Put the result in the state.
      //console.log(response);
      setCredentials(response.data);
      //console.log(credentials)
      // Extract the token and place it in localstorage.
      const { token } = response.data;
      //console.log(token);
      // Send token to localstorage
      localStorage.setItem("token", token);
      // Send token to context
      setAuth({
        token,
        auth: true,
      });
      Swal.fire({
        title: "Correct login",
        text: "Welcome to the administration panel",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
          Swal.fire({
            title: "Error authenticating user",
            text: error.response.data.error,
            icon: "error",
          });
      } else {
        Swal.fire({
            title: "Error authenticating user",
            text: "Authentication Error, CORS",
            icon: "error",
          });
      }
    }
  };
  // Store form data in state
  const readData = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  // Use useEffect to perform the redirection
  useEffect(() => {
    // Check if the user is authenticated
    if (auth.auth) {
      // Redirect to the desired route
      navigate("/");
    }
  }, [auth.auth, navigate]);
  return (
    <div className="login">
      <h2>Login</h2>
      <div className="form-container">
        <form onSubmit={login}>
          <div className="field">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={readData}
            />
          </div>
          <div className="field">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={readData}
            />
          </div>
          <input
            type="submit"
            className="btn btn-green btn-block"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
