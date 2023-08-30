
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Trading from "./pages/Trading";
import Assets from "./pages/Assets";
import Navbar from './pages/Navbar';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/trading" element={<Trading/>} />
          <Route path="/assets" element={<Assets/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
