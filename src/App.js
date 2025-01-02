import React, { useState, useEffect } from 'react';
import IncomeExpenseForm from './IncomeExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import 'jspdf-autotable'; // Import the jsPDF autoTable plugin
import "./App.css";
import NavBar from "./NavBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const App = () => {
  const [entries, setEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // State to toggle transaction history

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries'));
    if (savedEntries) {
      setEntries(savedEntries);
      let income = 0;
      let expense = 0;
      const categories = {};

      savedEntries.forEach((entry) => {
        if (entry.type === 'income') income += entry.amount;
        else expense += entry.amount;

        // Track expenses by category
        if (entry.type === 'expense') {
          categories[entry.category] = categories[entry.category]
            ? categories[entry.category] + entry.amount
            : entry.amount;
        }
      });

      setTotalIncome(income);
      setTotalExpense(expense);
      setCategoryData(categories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry) => {
    setEntries([...entries, entry]);
    if (entry.type === 'income') {
      setTotalIncome(totalIncome + entry.amount);
    } else {
      setTotalExpense(totalExpense + entry.amount);
      setCategoryData((prevData) => {
        const updatedData = { ...prevData };
        updatedData[entry.category] = updatedData[entry.category]
          ? updatedData[entry.category] + entry.amount
          : entry.amount;
        return updatedData;
      });
    }
  };

  const handleDeleteEntry = (id, amount, type, category) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    if (type === 'income') {
      setTotalIncome(totalIncome - amount);
    } else {
      setTotalExpense(totalExpense - amount);
      setCategoryData((prevData) => {
        const updatedData = { ...prevData };
        updatedData[category] = updatedData[category] - amount;
        return updatedData;
      });
    }
  };

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4CAF50', '#FF5733'],
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: Object.keys(categoryData).map(
          (_, index) => `hsl(${(index * 360) / Object.keys(categoryData).length}, 70%, 60%)`
        ),
      },
    ],
  };

  const exportToCSV = () => {
    // Filter only expenses
    const expenseEntries = entries.filter(entry => entry.type === 'expense');
    const csv = Papa.unparse(expenseEntries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'expenses.csv');
      link.click();
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Report", 20, 20);

    // Using autoTable for the formatted table
    const tableColumns = ['Category', 'Amount'];
    const tableData = entries
      .filter((entry) => entry.type === 'expense') // Only include expenses
      .map(entry => [entry.category, entry.amount]);

    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: '#4CAF50', textColor: '#fff' },
      bodyStyles: { fontSize: 12 },
      margin: { top: 20, left: 20, right: 20, bottom: 20 },
    });

    doc.save('expenses.pdf');
  };

  // Toggle visibility of transaction history
  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    
    <div className="App">
      <div>
        <NavBar />
      </div>
      <h1>Personal Budget Tracker</h1>
      <IncomeExpenseForm onAddEntry={handleAddEntry} />
      <ExpenseList entries={entries} onDelete={handleDeleteEntry} />

      <div className="chart-container">
        <div>
          <h2>Spending Overview</h2>
          <Pie data={data} />
        </div>
        <div>
          <h2>Spending by Category</h2>
          <Pie data={categoryChartData} />
        </div>
      </div>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export Expenses CSV</button>
        <button onClick={exportToPDF}>Export Expenses PDF</button>
      </div>

      <div className="history-toggle">
        <button onClick={toggleHistory}>
          {isHistoryVisible ? 'Hide Full Transaction History' : 'Show Full Transaction History'}
        </button>
      </div>

      {/* Conditionally render the full transaction history */}
      {isHistoryVisible && (
        <div className="transaction-history">
          <h3>Full Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.type}</td>
                  <td>{entry.category}</td>
                  <td>{entry.amount}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
