import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'

const EditTransaction = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({ type: '', category: '', amount: '', description: '' });

  useEffect(() => {
    // Fetch the current transaction details
    fetch(`http://localhost:3000/api/transactions/${id}`)
      .then((response) => response.json())
      .then((data) => setTransaction(data.transaction));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the transaction by its ID
    try {
      await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      alert('Transaction updated successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <div className='edit-container'>
      <h2 className='edit-heading'>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <label>Type</label>
          <input
            type="text"
            value={transaction.type}
            onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
          />
        </div>
        <div>
          <label>Category </label>
          <input
            type="text"
            value={transaction.category}
            onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
          />
        </div>
        <div>
          <label>Amount </label>
          <input
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
          />
        </div>
        <div>
          <label>Description </label>
          <input
            type="text"
            value={transaction.description}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
          />
        </div>
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
};

export default EditTransaction;
