import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../config/axios";
import Swal from "sweetalert2";
import SearchProducts from "./SearchProducts";
import FormQuantityProducts from "./FormQuantityProducts";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  // Get ID
  const { id } = useParams();
  //console.log(id)
  // Return home
  const navigate = useNavigate();

  // customer = state, setCustomer = function to save state
  const [customer, setCustomer] = useState({});
  const [query, setSearchProducts] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // Call to queryAPI()
  useEffect(() => {
    // Query the API
    const queryAPI = async () => {
      const response = await axiosClient.get(`/api/get-customer/${id}`);
      //console.log(response)
      setCustomer(response.data);
    };
    // Call API
    queryAPI();
    // Call update total
    updateTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Function to search products
  const searchProduct = async (event) => {
    event.preventDefault();
    // Get the search products
    const searchResult = await axiosClient.post(`/api/find-product/${query}`);
    // Results were found
    if (searchResult.data[0]) {
        //console.log(searchResult.data[0]);
        let searchedProduct = searchResult.data[0];
        // Add product key
        searchedProduct.product = searchResult.data[0]._id;
        searchedProduct.quantity = 0;
        //console.log(searchedProduct);
        // Add searchedProduct to state
        setProducts([...products, searchedProduct])

    } else {
        // Results were no found
        Swal.fire({
            icon: "error",
            title: "Product no found",
            text: "No products were found with the established search criteria.",
            footer: ''
          });
    }
  }
  // Function to store the search in the state
  const readFoundData = (event) => {
    setSearchProducts(event.target.value);
    //console.log(query)
  }

  // Mdify the quantity of products
  // Function to subtract products
  const subtractProduct = (index) => {
    // Original array
    const allProducts = [...products];
    //console.log(...products)
    // Validation
    if (allProducts[index].quantity > 0) {
      allProducts[index].quantity--;
      // Add to state
      setProducts(allProducts);
    }
  }

  // Function to add products
  const addProduct = (index) => {
    // Original array
    const allProducts = [...products]
    //console.log(...products)
    // Add products
    allProducts[index].quantity++;
    // Add to state
    setProducts(allProducts);
  }

  // Function to delete a product
  const deleteProduct = (id) => {
    //console.log(id)
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
        const allProducts = products.filter(product => product.product !== id);
        setProducts(allProducts);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  // Function to update the total to pay
  const updateTotal = () => {
    // If product array = 0, total = 0
    if (products.length === 0) {
      setTotal(0);
      return;
    }
    // Calc new total
    let newTotal = 0;
      //Browse products and quantities
      products.map(product => newTotal += (product.quantity * product.price))
      setTotal(newTotal);
  }

  // Place order and store in the database
  const makeOrder = async (event) => {
    event.preventDefault();
    // Build the order object
    const order = {
      "customer": customer,
      "order": products,
      "total": total
    }
    //console.log(order);
    // Store in DB
    const storeDB = await axiosClient.post(`/api/add-order/${id}`, order);
    // Read result
    if (storeDB.status === 201) {
      Swal.fire({
        title: "Order placed!",
        text: "Your order has been placed successfully!",
        icon: "success"
      });
      //console.log(order);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    // Send the user to the customer page
    navigate("/orders");
  }
  const { name, lastname, company, email, phone } = customer;

  return (
    <>
        <h2>New Order</h2>
        <div className="summary">
        <div className="client-ticket ">
            <h3>Customer Data</h3>
            <p>Name: {name} {lastname}</p>
            <p>Company: {company}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
        </div>
        </div>

        <SearchProducts
            searchProduct={searchProduct}
            readFoundData={readFoundData}
        />

        <ul className="summary">
          {/* Generate a list of products */}
          {products.map((product, index) => (
            <FormQuantityProducts
              key={product.product}
              product={product}
              subtractProduct={subtractProduct}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
              index={index}
            />
          ))}

        </ul>
        <div className="summary">
            <p
              className="total"
              >Total to pay:
              <span> $ {total}</span>
            </p>
            {total > 0 ? (
              <form
                onSubmit={makeOrder}
              >
                <div className="send">
                  <input
                    type="submit"
                    className="btn btn-green btn-block"
                    value="Add Order"
                  />
                </div>

              </form>
            ) : null }
        </div>
    </>
  );
};

export default CreateOrder;
