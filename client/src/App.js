import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="text-center my-5">To-Do List</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/update/:id" element={<UpdateItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
