import axios from '../../api/axios';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/Admin/view-requests');
        setRequests(response.data);
      } catch (error) {
        setMessage('Failed to fetch requests');
      }
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>View Book Loan Requests</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Student ID</th>
            <th>Book ID</th>
            <th>Loan Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.studentId}</td>
                <td>{request.bookId}</td>
                <td>{new Date(request.loanDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequests;
