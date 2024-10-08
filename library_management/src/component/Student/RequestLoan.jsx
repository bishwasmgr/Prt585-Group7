// src/components/Student/RequestLoan.js
import React, { useState } from 'react';
import axios from '../../api/axios';

const RequestLoan = () => {
  const [studentId, setStudentId] = useState('');
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/Book/request-loan/${bookId}`, {
        studentId: parseInt(studentId),
      });
      setMessage('Loan request successful');
    } catch (error) {
      setMessage('Loan request failed');
    }
  };

  return (
    <div>
      <h1>Request Book Loan</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <button type="submit">Request Loan</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RequestLoan;
