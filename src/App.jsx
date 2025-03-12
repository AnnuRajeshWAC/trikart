
import './App.css'
import Home from './components/Home';
import ProductList from './components/ProductList';
import Search from './components/Search'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
    <Router>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductList/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
