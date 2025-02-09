"use client";

import { useState, useEffect } from "react";
import IncomeExpenseForm from "./IncomeExpenseForm";
import { Pie } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import "jspdf-autotable";
import "./BT.css";
import { Link } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Advice from "./Advice";
ChartJS.register(ArcElement, Tooltip, Legend);

const BT = () => {
  const [entries, setEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    if (savedEntries.length > 0) {
      setEntries(savedEntries);
      let income = 0;
      let expense = 0;
      const categories = {};

      savedEntries.forEach((entry) => {
        if (entry.type === "income") income += entry.amount;
        else expense += entry.amount;

        if (entry.type === "expense") {
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
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    localStorage.setItem("entries", JSON.stringify(newEntries));
    if (entry.type === "income") {
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
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    if (type === "income") {
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
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
          "#f59e0b",
          "#10b981",
          "#6366f1",
        ],
        borderWidth: 0,
      },
    ],
  };

  const exportToCSV = () => {
    const expenseEntries = entries.filter((entry) => entry.type === "expense");
    const csv = Papa.unparse(expenseEntries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "expenses.csv");
      link.click();
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Report", 20, 20);

    const tableColumns = ["Category", "Amount"];
    const tableData = entries
      .filter((entry) => entry.type === "expense")
      .map((entry) => [entry.category, entry.amount]);

    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: "#4CAF50", textColor: "#fff" },
      bodyStyles: { fontSize: 12 },
      margin: { top: 20, left: 20, right: 20, bottom: 20 },
    });

    doc.save("expenses.pdf");
  };

  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
      },
    },
  };

  return (
    <div className="App">
      <h1>BudgetFlo</h1>

      <IncomeExpenseForm onAddEntry={handleAddEntry} />

      <div className="chart-container">
        <div className="chart-wrapper">
          <h2>Spending Overview</h2>
          <div style={{ position: "relative", height: "250px" }}>
            <Pie data={data} options={chartOptions} />
          </div>
        </div>
        <div className="chart-wrapper">
          <h2>Spending by Category</h2>
          <div style={{ position: "relative", height: "250px" }}>
            <Pie data={categoryChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="expense-list">
        {entries.slice(-4).map((entry) => (
          <div key={entry.id} className="transaction-card">
            <div className="entry-type">{entry.type}</div>
            <div className="entry-amount">₹{entry.amount.toFixed(2)}</div>
            <div className="entry-category">{entry.category}</div>
            <div>{new Date(entry.date).toLocaleDateString()}</div>
            <button onClick={() => handleDeleteEntry(entry.id, entry.amount, entry.type, entry.category)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>

      <div className="history-toggle">
        <button onClick={toggleHistory}>
          {isHistoryVisible
            ? "Hide Transaction History"
            : "Show Transaction History"}
        </button>
      </div>

      {isHistoryVisible && (
        <div className="transaction-history">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.type}</td>
                  <td>{entry.category}</td>
                  <td>₹{entry.amount.toFixed(2)}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteEntry(
                          entry.id,
                          entry.amount,
                          entry.type,
                          entry.category
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Advice />
    </div>
  );
};

export default BT;
