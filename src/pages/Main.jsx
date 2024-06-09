import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Main = () => {
  const [book, setBook] = useState('');
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setBook(e.target.value);
  };

  useEffect(() => {
    if (book) {
      setBooks([]);
      const search = book.replace(' ', '+');
      const source = axios.CancelToken.source();
      axios.get(`https://openlibrary.org/search.json?q=${search}&limit=10&page=1`, {
        cancelToken: source.token
      })
        .then(res => {
          const bookData = res.data.docs.map(book => {
            const title = book.title;
            const editionCount = book.edition_count;
            return { title, editionCount };
          });
          setBooks(bookData);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            console.log('Error', error.message);
          }
        });

      return () => {
        source.cancel();
      };
    } else {
      setBooks([]);
    }
  }, [book]);

  const addToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };
  
  const isBookInBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    return bookshelf.some(b => b.title === book.title);
  };

  return (
    <div className="mx-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center w-full">Search by book name:</h1>
        <Link to="/bookshelf">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 w-40 rounded-2xl">
            My Bookshelf
          </button>
        </Link>
      </div>
      <div className="flex justify-center mb-4">
        <input 
          type="text" 
          onChange={handleChange} 
          className="w-full max-w-lg p-2 border rounded"
        />
      </div>
      <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book, index) => (
        <Card 
          key={index} 
          title={book.title} 
          editionCount={book.editionCount} 
          onAdd={() => addToBookshelf(book)}
          isBookshelf={isBookInBookshelf(book)}
        />
      ))}
    </div>
  </div>
  </div>
  );
};
