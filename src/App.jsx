import React from 'react';
import { Main } from './pages/Main';
import { Bookshelf } from './pages/Bookshelf';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
};
