import React from 'react';

const ExpenseList = ({ entries, onDelete }) => {
  const latestEntries = entries.slice(-5).reverse(); // Get the last 5 entries
  const olderEntries = entries.slice(0, -5).reverse(); // Remaining entries

  return (
    <div className="expense-list">
      {/* Latest Transactions */}
      <div className="latest-transactions">
        <h2>Latest Transactions</h2>
        <div className="latest-transaction-cards">
          {latestEntries.map((entry) => (
            <div key={entry.id} className="transaction-card">
              <div className="entry-type">{entry.type.toUpperCase()}</div>
              <div className="entry-category">{entry.category}</div>
              <div className="entry-amount">{entry.amount}</div>
              <button onClick={() => onDelete(entry.id, entry.amount, entry.type, entry.category)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Full Transaction History */}
      <div className="full-transaction-history">
        <h2>Full Transaction History</h2>
        <div className="transaction-table">
          {olderEntries.map((entry) => (
            <div key={entry.id} className="transaction-row">
              <div className="entry-type">{entry.type.toUpperCase()}</div>
              <div className="entry-category">{entry.category}</div>
              <div className="entry-amount">{entry.amount}</div>
              <button onClick={() => onDelete(entry.id, entry.amount, entry.type, entry.category)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
