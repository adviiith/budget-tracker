import React, { useState, useEffect } from 'react';
import IncomeExpenseForm from './IncomeExpenseForm';
import ExpenseList from './ExpenseList';
import { Pie } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import { Charts as ChartJS } from 'chart.js/auto';
import "./App.css"

const App = () => {
  const [entries, setEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});

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

    // Create a table for expenses
    let y = 30;
    doc.setFontSize(12);
    doc.text("Category", 20, y);
    doc.text("Amount", 100, y);
    y += 10;

    entries
      .filter((entry) => entry.type === 'expense') // Only include expenses
      .forEach((entry) => {
        doc.text(entry.category, 20, y);
        doc.text(`${entry.amount}`, 100, y);
        y += 10;
      });

    doc.save('expenses.pdf');
  };

  return (
    <div className="App">
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
    </div>
  );
};

export default App;
