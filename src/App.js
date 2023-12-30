import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componets/layout/Header";
import Aside from "./componets/layout/Aside";
import Customers from "./componets/customers/PageCustomers";
import CreateCustomer from "./componets/customers/CreateCustomer";
import UpdateCustomer from "./componets/customers/UpdateCustomer";
import Products from "./componets/products/PageProducts";
import CreateProducts from "./componets/products/CreateProduct";
import UpdateProducts from "./componets/products/UpdateProducts";
import PageOrders from "./componets/orders/PageOrders";
import CreateOrder from "./componets/orders/CreateOrder";
import Login from "./componets/auth/Login";
import { CRMContext, CRMProvider } from "./context/CRMContext";
import { useContext } from "react";

function App() {
  // Use context in the component
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <BrowserRouter>
      <>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="grid container main-content">
            <Aside />
            <main className="box-content col-9">
              <Routes>
                {/* Customers */}
                <Route path="/" element={<Customers />} />
                <Route path="/customers/new" element={<CreateCustomer />} />
                <Route
                  path="/customers/update/:id"
                  element={<UpdateCustomer />}
                />

                {/* Products */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<CreateProducts />} />
                <Route
                  path="/products/update/:id"
                  element={<UpdateProducts />}
                />

                {/* Orders */}
                <Route path="/orders" element={<PageOrders />} />
                <Route path="/orders/new/:id" element={<CreateOrder />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/authenticate/:id" element={<CreateOrder />} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </>
    </BrowserRouter>
  );
}

export default App;
