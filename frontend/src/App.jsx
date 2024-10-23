import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionList from './components/TransactionList/TransactionList';
// import AddTransaction from './components/AddTransaction/AddTransaction';
import EditTransaction from './components/EditTransaction/EditTransaction';
import Summary from './components/Summary/Summary';
import "./App.css"
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-heading">Expense Tracker</h1>
        <hr className='horizontal-line'/>
        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/edit/:id" element={<EditTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
