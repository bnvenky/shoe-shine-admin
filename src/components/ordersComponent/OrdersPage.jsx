/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import if using React Router
import './OrdersComponent.css';

function OrdersComponent() {
  const navigate = useNavigate(); // Initialize navigate

  const mockData = {
    totalSales: 150000,
    totalOrders: 120,
    totalProducts: 350,
    orders: [
      {
        id: '001',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        price: '$150',
        status: 'Completed',
        date: '2024-08-01',
        deliveryAddress: '123 Main St, Springfield',
        paymentInfo: 'Master Card **** **** 4768',
        items: [
          { name: 'Supreme helinox chair one', quantity: 2, unitPrice: 43.50, total: 87.00, imageUrl: 'chair.jpg' },
          { name: 'Gopro hero 7', quantity: 1, unitPrice: 43.50, total: 87.00, imageUrl: 'gopro.jpg' }
        ]
      },
      {
        id: '002',
        customerName: 'Michael',
        customerEmail: 'john.doe@example.com',
        price: '$150',
        status: 'Completed',
        date: '2024-08-01',
        deliveryAddress: '123 Main St, Springfield',
        paymentInfo: 'Master Card **** **** 4768',
        items: [
          { name: 'Supreme helinox chair one', quantity: 2, unitPrice: 43.50, total: 87.00, imageUrl: 'chair.jpg' },
          { name: 'Gopro hero 7', quantity: 1, unitPrice: 43.50, total: 87.00, imageUrl: 'gopro.jpg' }
        ]
      },
      {
        id: '003',
        customerName: 'John Smith',
        customerEmail: 'john.doe@example.com',
        price: '$150',
        status: 'Completed',
        date: '2024-08-01',
        deliveryAddress: '123 Main St, Springfield',
        paymentInfo: 'Master Card **** **** 4768',
        items: [
          { name: 'Supreme helinox chair one', quantity: 2, unitPrice: 43.50, total: 87.00, imageUrl: 'chair.jpg' },
          { name: 'Gopro hero 7', quantity: 1, unitPrice: 43.50, total: 87.00, imageUrl: 'gopro.jpg' }
        ]
      },
      // other orders...
    ],
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order-details/${orderId}`); // Navigate to OrderDetails page with orderId
  };

  return (
    <div className="orders-container">
      <h2>Orders Overview</h2>
      <div className="cards-container">
        <div className="cards">
          <h3>Total Sales</h3>
          <p>${mockData.totalSales}</p>
        </div>
        <div className="cards">
          <h3>Total Orders</h3>
          <p>{mockData.totalOrders}</p>
        </div>
        <div className="cards">
          <h3>Total Products</h3>
          <p>{mockData.totalProducts}</p>
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
          {mockData.orders.map((order) => (
            <tr key={order.id} onClick={() => handleOrderClick(order.id)} style={{ cursor: 'pointer' }}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td>{order.price}</td>
              <td className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersComponent;