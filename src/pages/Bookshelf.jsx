import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';

export const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="mx-12 my-2">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold">My Bookshelf</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookshelf.map((book, index) => (
            <Card 
              key={index} 
              title={book.title} 
              editionCount={book.editionCount} 
              isBookshelf={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
