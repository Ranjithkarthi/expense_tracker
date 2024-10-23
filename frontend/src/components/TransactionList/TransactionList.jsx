import React, { useEffect, useState } from 'react';
import './index.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ type: '', category: '', amount: '', description: '' });

  // Fetch all transactions on component load
  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions));
  }, []);

  // Add a new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      const data = await response.json();
      setTransactions([...transactions, data.transaction]); // Add new transaction to the list
      setNewTransaction({ type: '', category: '', amount: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Delete a transaction by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await fetch(`http://localhost:3000/api/transactions/${id}`, {
          method: 'DELETE',
        });
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  // Edit button handler
  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  return (
    <div className='transaction-list-container'>
      {/* Add Transaction Form */}
      <form onSubmit={handleAddTransaction} className='transaction-form'>
        <h3>Add New Transaction</h3>
        <div className='form-group'>
          <label>Type (Expense/Income)</label>
          <input
            type='text'
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <label>Category</label>
          <input
            type='text'
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <label>Amount</label>
          <input
            type='number'
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <input
            type='text'
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
        </div>
        <button type='submit' className='add-transaction-btn'>
          Add Transaction
        </button>
      </form>

      {/* Transaction List */}
      <ul className='transaction-list-ul'>
        {transactions.map((transaction) => (
          <li key={transaction._id} className='transaction-list-li'>
            {transaction.category}: {transaction.amount} ({transaction.type})
            <div>
              <button onClick={() => handleEdit(transaction._id)}>Edit</button>
              <button onClick={() => handleDelete(transaction._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
