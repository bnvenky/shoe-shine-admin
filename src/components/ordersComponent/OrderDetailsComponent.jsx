import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetailsComponent.css';
import 'bootstrap/dist/css/bootstrap.css';

function OrderDetailsComponent() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch the order details from the API
    fetch('https://mrv1.indianwelfarefoundation.org.in/ordersall')
      .then(response => response.json())
      .then(data => {
        const orderData = data.find(order => order.orderId === parseInt(orderId));
        setOrder(orderData);
      })
      .catch(error => console.error('Error fetching order details:', error));
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const address = JSON.parse(order.address);
  const orderDate = new Date(order.orderDate).toLocaleDateString();
  const deliveryDate = order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'Pending';

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-summary">
        <div className="order-date">
          <p>Order Date: {orderDate}</p>
          <p>#ID {order.orderId}</p>
        </div>
        <div className="order-info">
          <div className='order-info-card'>
            <div className='d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
               <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              <h3>Customer</h3>
            </div>
            <p>{address.fullName}</p>
            <p>{order.paymentMethod}</p>
            <p>{address.mobileNumber}</p>
          </div>
          <div className='order-info-card'>
            <div className='d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
              </svg>
              <h3>Delivery Address</h3>
            </div>
            <p>{address.addressLine1}, {address.addressLine2}</p>
            <p>{address.city}, {address.state}, {address.pincode}</p>
            <p>{address.country}</p>
          </div>
          <div className='order-info-card'>
            <div className='d-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zM0 7v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm2-1a1 1 0 0 1-1-1h14a1 1 0 0 1-1 1H2z"/>
              </svg>
              <h3>Payment Info</h3>
            </div>
            <p>{order.paymentMethod}</p>
            <p>{order.productPrice}</p>
          </div>
        </div>
        <div className="order-total">
          <h3>Order Total: ${order.productPrice}</h3>
          <p>Status: {order.deliveryDate ? 'Completed' : 'Pending'}</p>
          <p>Delivery Date: {deliveryDate}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsComponent;
