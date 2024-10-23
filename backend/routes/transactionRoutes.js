const express = require('express');
const Transaction = require('../models/Transaction'); // Import the Transaction model

const router = express.Router();

// Route to retrieve a summary of transactions
router.get('/summary', async (req, res) => {
    try {
      const transactions = await Transaction.find();
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
      const balance = totalIncome - totalExpenses;
  
      res.json({ success: true, totalIncome, totalExpenses, balance });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
});

// Route to add a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;

    // Create a new transaction
    const newTransaction = new Transaction({
      type,
      category,
      amount,
      description,
      date: new Date() // Add current date automatically
    });

    // Save the transaction
    const savedTransaction = await newTransaction.save();
    res.json({ success: true, transaction: savedTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to retrieve all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to retrieve a transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to update a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, transaction: updatedTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to delete a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to retrieve a summary of transactions

// router.get('/summary', async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     const totalIncome = transactions
//       .filter(t => t.type === 'income')
//       .reduce((acc, curr) => acc + curr.amount, 0);
//     const totalExpenses = transactions
//       .filter(t => t.type === 'expense')
//       .reduce((acc, curr) => acc + curr.amount, 0);
//     const balance = totalIncome - totalExpenses;

//     res.json({ success: true, totalIncome, totalExpenses, balance });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

module.exports = router;

