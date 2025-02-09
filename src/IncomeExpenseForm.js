import { useState, useEffect } from "react"

const IncomeExpenseForm = ({ onAddEntry }) => {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("income")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [customCategory, setCustomCategory] = useState("")
  const [categories, setCategories] = useState([
    "Food",
    "Entertainment",
    "Rent",
    "Utilities",
    "Salary",
    "Shopping",
    "Travel", // New category
    "Healthcare", // New category
  ])

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories"))
    if (savedCategories) {
      setCategories(savedCategories)
    }
  }, [])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // If category is empty, use "Misc"
    const finalCategory =
      category === "" ? "Misc" : type === "expense" ? (category === "Custom" ? customCategory : category) : "N/A"

    const entry = {
      id: Date.now(),
      amount: Number.parseFloat(amount),
      category: finalCategory,
      type,
    }

    onAddEntry(entry)

    // Reset form fields
    setAmount("")
    setCategory("") // Reset category to empty to avoid showing "Misc"
    setCustomCategory("")
  }

  // Handle the button click for credit/debit
  const handleTypeChange = (type) => {
    setType(type)
    if (type === "expense") {
      setShowCategoryDropdown(true) // Show category dropdown for expenses
    } else {
      setShowCategoryDropdown(false) // Hide category dropdown for credit
    }
  }

  // Add custom category to the list
  const handleAddCustomCategory = () => {
    if (customCategory.trim() && !categories.includes(customCategory)) {
      const updatedCategories = [...categories, customCategory]
      setCategories(updatedCategories)
      localStorage.setItem("categories", JSON.stringify(updatedCategories))
      setCategory(customCategory) // Select the newly added category
      setCustomCategory("") // Clear the input
    }
  }

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
        <button type="button" onClick={() => handleTypeChange("income")} className={type === "income" ? "active" : ""}>
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
      <br></br>
      {/* Show category dropdown only when 'Debit' is selected */}
      {showCategoryDropdown && (
        <>
          <label htmlFor="category">Expense Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select an Expense Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>

          {/* Show custom category input if "Custom" is selected */}
          {category === "Custom" && (
            <div className="custom-category-input">
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
              <button id="submit" type="button" onClick={handleAddCustomCategory} disabled={!customCategory.trim()}>
                Add
              </button>
            </div>
          )}
        </>
      )}

      <button id="submit" type="submit">
        Add Entry
      </button>
    </form>
  )
}

export default IncomeExpenseForm