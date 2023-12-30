// Home page
import axiosClient from "../../config/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Customer = ({customer}) => {
    // Destructure values
    const {_id, name, lastname, company, email, phone} = customer;
    // Delete customer
    const deleteCustomer = (id) => {
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
                axiosClient.delete(`/api/delete-customer/${id}`)
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
        <li className="customer">
            <div className="info-customer">
                <p className="name">{name} {lastname}</p>
                <p className="company">{company}</p>
                <p>{email}</p>
                <p>{phone}</p>
            </div>
            <div className="actions">
                <Link to={`/customers/update/${_id}`} className="btn btn-blue">
                    <i className="fas fa-pen-alt"></i>
                    Edit Customer
                </Link>
                <button
                    type="button"
                    className="btn btn-red"
                    onClick={() => deleteCustomer(_id)}
                >
                    <i className="fas fa-times"></i>
                    Delete Customer
                </button>
                <Link to={`/orders/new/${_id}`} className="btn btn-yellow">
                    <i className="fas fa-plus"></i>
                    New Order
                </Link>
            </div>
        </li>
    );
};

export default Customer;
