import React from 'react';
import { Pie } from 'react-chartjs-2';

const Charts = ({ totalIncome, totalExpense, categoryData }) => {
  // Data for Income vs Expense chart
  const overallData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4CAF50', '#FF5733'],
        hoverBackgroundColor: ['#45A049', '#E04C2E'],
      },
    ],
  };

  // Data for Category-wise Expense chart
  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: Object.keys(categoryData).map(
          (_, index) => `hsl(${(index * 360) / Object.keys(categoryData).length}, 70%, 60%)`
        ),
        hoverBackgroundColor: Object.keys(categoryData).map(
          (_, index) => `hsl(${(index * 360) / Object.keys(categoryData).length}, 80%, 50%)`
        ),
      },
    ],
  };

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Income vs Expense</h3>
        <Pie data={overallData} />
      </div>

      <div className="chart">
        <h3>Spending by Category</h3>
        {Object.keys(categoryData).length === 0 ? (
          <p>No expense data to show</p>
        ) : (
          <Pie data={categoryChartData} />
        )}
      </div>
    </div>
  );
};

export default Charts;