/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions/>} />
          <Route path="customers" element={<Customers />} />
          <Route path="services" element={<Services />} />
          
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
