/* eslint-disable no-unused-vars */
import React from 'react';
import './TransactionPage.css';

const transactions = [
  { id: 134, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
  { id: 135, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
  { id: 136, paid: 294.00, method: 'Visa', created: '16.12.2020, 14:21' },
  { id: 137, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
  { id: 138, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
  { id: 139, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
];

const TransactionPage = () => {
  return (
    <div className="transactions-page">
      <div className="content">
        <div className="table-section">
          <div className="transactions-table">
            <h2>Transactions</h2>
            <div className="table-controls">
              <input type="text" placeholder="Search" />
              <select>
                <option>Show 20</option>
              </select>
              <button>Date</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Paid</th>
                  <th>Method</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>#{transaction.id}</td>
                    <td>${transaction.paid.toFixed(2)}</td>
                    <td>{transaction.method}</td>
                    <td>{transaction.created}</td>
                    <td><button className="view-button">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="details-section">
          <div className="transaction-details">
            <h2>Transaction Details</h2>
            <p><strong>Supplier:</strong> TempleMount</p>
            <p><strong>Date:</strong> December 19th, 2020</p>
            <p><strong>Billing address:</strong> 1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
            <p><strong>VAT ID:</strong> 54741654180</p>
            <p><strong>Email:</strong> support@example.com</p>
            <p><strong>Item purchased:</strong> Adidas Air Jordan</p>
            <p><strong>PayPal:</strong> customer@example.com</p>
          </div>
        </div>
      </div>
      <button className="create-button">+ Create new</button>
    </div>
  );
};

export default TransactionPage;
