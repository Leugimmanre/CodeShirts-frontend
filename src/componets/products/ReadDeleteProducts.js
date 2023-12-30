import axiosClient from "../../config/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Product = ({ product }) => {
  // Destructure values
  const { _id, name, price, image } = product;
    // Delete product
    const deleteProduct = (id) => {
        //console.log('removing', id)
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
                axiosClient.delete(`/api/delete-product/${id}`)
                    .then(res => {
                        //console.log(res)
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: res.data.message,
                                icon: "success"
                              });
                        }
                    })
            }
          });
    };
  return (
    <>
      <li className="product">
        <div className="info-producto">
          <p className="name">{name}</p>
          <p className="price">$ {price}</p>
          {image ? (
                <img src={`http://localhost:4000/${image}`} alt="Product images" />
            ) : null
          }
        </div>
        <div className="actions">
          <Link to={`/products/update/${_id}`} className="btn btn-blue">
            <i className="fas fa-pen-alt"></i>
            Edit Product
          </Link>

          <button
            type="button"
            className="btn btn-red btn-delete"
            onClick={() => deleteProduct(_id)}
            >
            <i className="fas fa-times"></i>
            Delete Product
          </button>
        </div>
      </li>
    </>
  );
};

export default Product;
