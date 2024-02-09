import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './components/BookList';
import Register from './components/Register';
import './App.css';
import Navbar from './Navbar';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    fetch('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'react-api-books' }
    })
      .then(response => response.json())
      .then(data => {
        setBooks(data.books);
        setFilteredBooks(data.books);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleSearch = (searchText) => {
    const filtered = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredBooks(filtered);
  };

  const handleSuccessfulRegistration = () => {
    window.location.href = '/';
  };

  return (
    <div>
  
      <Navbar />
      <div className="search">
          <input type="text"  placeholder="Search for books..." onChange={(e) => handleSearch(e.target.value)} />
        </div>
      <Routes>
        <Route
          path="/"
          element={<Home books={filteredBooks} />}
        />
        <Route
          path="/register"
          element={<Register onSuccessfulRegistration={handleSuccessfulRegistration} />}
        />
      </Routes>
      </div>

  );
};

const Home = ({ books }) => {
  return (
    <div className="books-container">
      <BooksList books={books} />
    </div>
  );
};

export default App;