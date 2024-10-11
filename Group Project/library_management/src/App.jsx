import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./component/Auth/SignUp";  // Ensure the filename is SignUp.js
import Login from './component/Auth/Login';
import AddBook from './component/Admin/AddBook';
import RequestLoan from './component/Student/RequestLoan';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route path="/request-loan" element={<RequestLoan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
