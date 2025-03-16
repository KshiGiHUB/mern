import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import { SignUp } from './screens/SignUp.jsx';
import { CartProvider } from './components/ContextReducer.js';
import Orders from './screens/Orders.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>


  );
}

export default App;
