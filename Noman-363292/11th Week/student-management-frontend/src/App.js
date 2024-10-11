import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/student');
            setStudents(response.data);
        } catch (error) {
            console.error("There was an error fetching the students!", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/student', newStudent);
            fetchStudents();
        } catch (error) {
            console.error("There was an error adding the student!", error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/student/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("There was an error deleting the student!", error);
        }
    };

    return (
        <div className="App">
            <h1>Student Management System</h1>

            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newStudent.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newStudent.lastName}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    value={newStudent.dateOfBirth}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={handleChange}
                />
                <button type="submit">Add Student</button>
            </form>

            <h2>Students List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.studentId}>
                        {student.firstName} {student.lastName} - {student.email}
                        <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
