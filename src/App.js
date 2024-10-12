import logo from './logo.svg';
import './App.css';
import Header from './common/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // {{ edit_1 }}
import Login from './common/login'; // {{ edit_2 }}
import Signup from './common/signup';
import Home from './components/home/home';
import Pdp from './components/pdp/index';
import Address from './components/address';
import Confirm from './components/confirm';
import EditProduct from './components/editProduct';

function App() {
  return (
    <Router> 
      <div className="App">
        <Header />
        {/* <Login /> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '89vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pdp/:id" element={<Pdp />} />
            <Route path="/address" element={<Address />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router> 
  );
}

export default App;
