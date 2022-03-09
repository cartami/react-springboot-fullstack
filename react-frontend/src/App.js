
import './App.css';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import ListCarsComponent from './components/ListCarsComponent';
import AddCar from './components/AddCar';

function App() {
  return (
    <div>
      <Router>
      <div className="container">
        <Routes>
            <Route path="/" element={<ListCarsComponent/>} exact></Route>
            <Route path="/cars" element={<ListCarsComponent/>}></Route>
            <Route path="/add-car" element={<AddCar/>}></Route>
            <Route path="/edit-car/:id" element={<AddCar/>}></Route>
        </Routes>
      </div>
      
    </Router>
  </div>
  );
}

export default App;
