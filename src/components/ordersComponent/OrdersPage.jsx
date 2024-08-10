
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdersComponent.css';

function OrdersComponent() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch the data from the API
    fetch('https://mrv1.indianwelfarefoundation.org.in/ordersall')
      .then(response => response.json())
      .then(data => {
        setOrders(data);

        // Calculate total sales and total orders
        const totalSales = data.reduce((acc, order) => acc + parseFloat(order.productPrice), 0);
        setTotalSales(totalSales);
        setTotalOrders(data.length);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="orders-container">
      <h2>Orders Overview</h2>
      <div className="cards-container">
        <div className="cards">
          <h3>Total Sales</h3>
          <p>${totalSales}</p>
        </div>
        <div className="cards">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Price</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} onClick={() => handleOrderClick(order.orderId)} style={{ cursor: 'pointer' }}>
              <td>{order.orderId}</td>
              <td>{JSON.parse(order.address).fullName}</td>
              <td>{JSON.parse(order.address).email || "N/A"}</td> {/* Assuming email is part of address */}
              <td>${order.productPrice}</td>
              <td className={`status ${order.deliveryDate ? 'completed' : 'pending'}`}>
                {order.deliveryDate ? 'Completed' : 'Pending'}
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersComponent;
