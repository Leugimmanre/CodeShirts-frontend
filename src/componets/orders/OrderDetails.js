import axiosClient from "../../config/axios";
import Swal from "sweetalert2";

const OrderDetails = ({order}) => {
  const { _id, customer } = order;
  //console.log(order)
  if (!order) {
    return null;
  }

  // Delete order
  const deleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/api/delete-order/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: res.data.message,
                icon: "success"
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete order.",
              icon: "error"
            });
          });
      }
    });
  };
  return (
    <>
      <li className="order">
        <div className="info-order">
          <p className="id">ID: {order._id}</p>
          {customer && (
            <>
              <p className="name">Customer: {customer.name} {customer.lastname}</p>
            </>
          )}
          <div className="order-items">
            <p className="products">Items Order</p>
            <ul>
              {order.order.map((items) =>
                items.product && (
                  <li
                    className="order-items-datail"
                    key={order._id + items.product._id}
                  >
                    <p><span>Item</span>: {items.product.name}</p>
                    <p><span>Price</span>: ${items.product.price}</p>
                    <p><span>Quantity</span>: {items.quantity}</p>
                  </li>
                )
              )}
            </ul>
          </div>
          <p className="total">Total: ${order.total} </p>
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn btn-red btn-delete"
            onClick={() => deleteOrder(_id)}
            >
            <i className="fas fa-times"></i>
            Delete Order
          </button>
        </div>
      </li>
    </>
  );
};

export default OrderDetails;
