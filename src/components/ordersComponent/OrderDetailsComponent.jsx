/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetailsComponent.css';
import 'bootstrap/dist/css/bootstrap.css';

function OrderDetailsComponent() {
  const { orderId } = useParams(); // Get the orderId from the URL params

  // Mock data (In real scenario, fetch order details based on orderId)
  const order = {
    id: '001',
    date: 'Wed, Aug 13, 2020, 4:34 PM',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+998 99 22123456'
    },
    deliveryAddress: '123 Main St, Springfield',
    paymentInfo: {
      method: 'Master Card **** **** 4768',
      businessName: 'Master Card, inc.',
      phone: '+1 (800) 555-154-52'
    },
    items: [
      { name: 'Supreme helinox chair one', quantity: 2, unitPrice: 43.50, total: 87.00, imageUrl: 'chair.jpg' },
      { name: 'Gopro hero 7', quantity: 1, unitPrice: 43.50, total: 87.00, imageUrl: 'gopro.jpg' }
    ],
    subtotal: 973.35,
    shippingCost: 10.00,
    total: 983.00,
    status: 'Completed'
  };

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-summary">
        <div className="order-date">
          <p>{order.date}</p>
          <p>#ID {order.id}</p>
        </div>
        <div className="order-info">
          <div className='order-info-card'>
            <div className='d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
               <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              <h3>Customer</h3>
            </div>
            
            <p>{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>
          <div className='order-info-card'>
            <div className='d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
              </svg>
              <h3>Deliver to</h3>
            </div>

            <p>{order.deliveryAddress}</p>
          </div>
          <div className='order-info-card'>
            <h3>Payment Info</h3>
            <p>{order.paymentInfo.method}</p>
            <p>{order.paymentInfo.businessName}</p>
            <p>{order.paymentInfo.phone}</p>
          </div>
        </div>
      </div>
      <div className="order-items">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="order-total">
          <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
          <p>Shipping cost: ${order.shippingCost.toFixed(2)}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
          <p className="status">{order.status}</p>
        </div>
        
      </div>
      
    </div>
  );
}

export default OrderDetailsComponent;
