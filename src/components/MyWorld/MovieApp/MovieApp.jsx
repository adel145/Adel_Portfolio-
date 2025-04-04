// src/components/MyWorld/MovieApp.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './MovieApp/App';  // Adjust the import path as needed

const MovieApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MovieApp;