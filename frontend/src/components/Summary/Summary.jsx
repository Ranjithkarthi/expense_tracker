import React, { useEffect, useState } from 'react';
import './index.css'

const Summary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transactions/summary');
        if (!response.ok) {
          throw new Error('Failed to fetch summary');
        }
        const data = await response.json();
        setSummary({
          totalIncome: data.totalIncome,
          totalExpenses: data.totalExpenses,
          balance: data.balance,
          loading: false,
          error: null,
        });
      } catch (error) {
        setSummary(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchSummary();
  }, []);

  if (summary.loading) {
    return <div>Loading...</div>;
  }

  if (summary.error) {
    return <div>Error: {summary.error}</div>;
  }

  return (
    <div className='summary-container'>
      <h2>Transaction Summary</h2>
      <p>Total Income: RS {summary.totalIncome}/-</p>
      <p>Total Expenses: RS {summary.totalExpenses}/-</p>
      <p>Balance: RS {summary.balance}/-</p>
    </div>
  );
};

export default Summary;
