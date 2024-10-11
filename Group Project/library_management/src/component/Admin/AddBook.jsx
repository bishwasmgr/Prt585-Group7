// src/components/Admin/AddBook.js
import React, { useState } from 'react';
import axios from '../../api/axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [numberOfCopies, setNumberOfCopies] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/Admin/add-book', {
        title,
        author,
        isbn,
        numberOfCopies: parseInt(numberOfCopies),
      });
      setMessage('Book added successfully');
    } catch (error) {
      setMessage('Failed to add book');
    }
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Copies"
          value={numberOfCopies}
          onChange={(e) => setNumberOfCopies(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddBook;
