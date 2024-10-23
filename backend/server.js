const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://expense-tracker-frontend-rtxq.onrender.com',
}));

app.use(express.json());

mongoose.connect('mongodb+srv://ranjithskr44:XcVSluqjwL1kSGJu@cluster0.a45bl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

//routes
app.use('/api/transactions', transactionRoutes);

//start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
