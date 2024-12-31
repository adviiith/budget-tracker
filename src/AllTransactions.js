import React from 'react';
import './AllTransactions.css';
const AllTransactions = ({ entries }) => {
  return (
    <div className="all-transactions">
      <h1>All Transactions</h1>
      {entries.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.type.toUpperCase()}</td>
                <td>{entry.category}</td>
                <td>{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTransactions;
