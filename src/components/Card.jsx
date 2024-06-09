import React, { useState } from 'react';

export const Card = ({ title, editionCount, onAdd, isBookshelf }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
  };

  return (
    <div className="w-60 h-80 bg-white border border-black rounded-lg shadow-md p-4 mx-2 my-4 flex flex-col justify-between">
      <div>
        <h5 className="font-bold text-lg mb-2">Book Title: <span className="font-normal">{title}</span></h5>
        <p className="font-bold text-lg mb-4">Edition Count: <span className="font-normal">{editionCount}</span></p>
      </div>
      {!isBookshelf && !added && (
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full self-center"
          onClick={handleAdd}
        >
          Add to Bookshelf
        </button>
      )}
    </div>
  );
};
