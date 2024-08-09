/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './TransactionPage.css';

const transactions = [
  { id: 134, paid: 294.00, method: 'Master card', created: '16.12.2020, 14:21' },
  { id: 135, paid: 350.75, method: 'Visa', created: '17.12.2020, 10:15' },
  { id: 136, paid: 412.50, method: 'PayPal', created: '18.12.2020, 09:30' },
  { id: 137, paid: 185.20, method: 'American Express', created: '19.12.2020, 14:50' },
  { id: 138, paid: 525.00, method: 'Discover', created: '20.12.2020, 16:05' },
  { id: 139, paid: 299.99, method: 'Master card', created: '21.12.2020, 12:45' },
];

const TransactionPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleViewClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

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
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewClick(transaction)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="details-section">
          {selectedTransaction ? (
            <div className="transaction-details">
              <h2>Transaction Details</h2>
              <p><strong>Transaction ID:</strong> #{selectedTransaction.id}</p>
              <p><strong>Paid:</strong> ${selectedTransaction.paid.toFixed(2)}</p>
              <p><strong>Method:</strong> {selectedTransaction.method}</p>
              <p><strong>Created:</strong> {selectedTransaction.created}</p>
              <p><strong>Supplier:</strong> TempleMount</p>
              <p><strong>Date:</strong> December 19th, 2020</p>
              <p><strong>Billing address:</strong> 1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
              <p><strong>VAT ID:</strong> 54741654180</p>
              <p><strong>Email:</strong> support@example.com</p>
              <p><strong>Item purchased:</strong> Adidas Air Jordan</p>
              <p><strong>PayPal:</strong> customer@example.com</p>
            </div>
          ) : (
            <div className="transaction-details">
              <p>Select a Transaction Details</p>
            </div>
          )}
        </div>
      </div>
      <button className="create-button">+ Create new</button>
    </div>
  );
};

export default TransactionPage;
