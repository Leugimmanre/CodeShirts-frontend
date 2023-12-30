import { useState, useEffect } from "react";
import axiosClient from "../../config/axios";
import { useContext } from "react";
import OrderDetails from "./OrderDetails";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

const PageOrders = () => {
  const navigate = useNavigate();
  // Get ID
  //const { id } = useParams();
  //console.log(id);
  const [orders, setOrders] = useState([]);
  // Use context values
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(CRMContext);
  // Call to queryAPI()
  useEffect(() => {
    // Protect route by authentication
    if (auth.token !== "") {
      // Query the API
      const queryAPI = async () => {
        try {
          const response = await axiosClient.get("/api/get-orders", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setOrders(response.data);
        } catch (error) {
          if (!orders.length) {
            //console.error("Error getting orders:", error);
            Swal.fire({
              icon: "error",
              title: "No Orders",
              text: "There are no orders",
            });
          }
        }
      };
      // Call API
      queryAPI();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  //console.log(orders);
    // Load spinner
 if (!orders.length) {
   return <Spinner />
 }

  return (
    <>
      <h2>Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <OrderDetails
            // Key ID
            key={order._id}
            // Pass all the informations
            order={order}
          />
        ))}
      </ul>
    </>
  );
};

export default PageOrders;
