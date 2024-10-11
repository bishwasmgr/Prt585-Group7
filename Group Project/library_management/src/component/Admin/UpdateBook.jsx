// src/components/Admin/UpdateBook.js
import axios from '../../api/axios';

const UpdateBook = () => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [numberOfCopies, setNumberOfCopies] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/Admin/update-book/${bookId}`, {
        title,
        author,
        isbn,
        numberOfCopies: parseInt(numberOfCopies),
      });
      setMessage('Book updated successfully');
    } catch (error) {
      setMessage('Failed to update book');
    }
  };

  return (
    <div>
      <h1>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
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
        <button type="submit">Update Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateBook;
