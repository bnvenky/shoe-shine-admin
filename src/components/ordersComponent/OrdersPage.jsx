/* eslint-disable no-unused-vars */
import React from 'react'
import './OrdersComponent.css'
function OrdersComponent() {
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
      },
      {
        id: '002',
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        price: '$200',
        status: 'Pending',
        date: '2024-08-02',
      },
      {
        id: '003',
        customerName: 'Bob Johnson',
        customerEmail: 'bob.johnson@example.com',
        price: '$300',
        status: 'Cancelled',
        date: '2024-08-03',
      },
    ],
  };

  return (
    <div className="orders-container">
      <h2>Orders Overview</h2>
      <div className="cards-container">
        <div className="card">
          <h3>Total Sales</h3>
          <p>${mockData.totalSales}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{mockData.totalOrders}</p>
        </div>
        <div className="card">
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
            <tr key={order.id}>
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

export default OrdersComponent
