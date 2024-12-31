import React, { useState } from "react";

const IncomeExpenseForm = ({ onAddEntry }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Categories for expenses
  const categories = [
    "Food",
    "Entertainment",
    "Rent",
    "Utilities",
    "Salary",
    "Shopping",
    "Misc",
    "Travel",   // New category
    "Healthcare" // New category
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount) {
      const entry = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: type === "expense" ? category : "N/A", // No category for credit
        type,
      };

      onAddEntry(entry);
      setAmount("");
      setCategory("");
    }
  };

  // Handle the button click for credit or debit
  const handleTypeChange = (type) => {
    setType(type);
    if (type === "expense") {
      setShowCategoryDropdown(true); // Show category dropdown for expenses
    } else {
      setShowCategoryDropdown(false); // Hide category dropdown for credit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      {/* Buttons for credit/debit */}
      <div className="button-group">
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={type === "income" ? "active" : ""}
        >
          Credit
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={type === "expense" ? "active" : ""}
        >
          Debit
        </button>
      </div>

      {/* Show category dropdown only when 'Debit' is selected */}
      {showCategoryDropdown && (
        <>
          <label htmlFor="category">Expense Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select an Expense Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </>
      )}

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default IncomeExpenseForm;
