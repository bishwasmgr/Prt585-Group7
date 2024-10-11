import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = 'https://localhost:7226/api/Dealer';

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [newDealer, setNewDealer] = useState({
    dealerName: '',
    address: '',
    email: '',
    phone: '',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [dealerToEdit, setDealerToEdit] = useState({ id: '', dealerName: '', address: '', email: '', phone: '' });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealerToDelete, setDealerToDelete] = useState(null);

  // Fetch dealers from API when component mounts
  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await axios.get(API_URL);
      setDealers(response.data);
    } catch (error) {
      console.error('Error fetching dealers:', error);
      toast.error('Error fetching dealers!');
    }
  };

  // Function to add a new dealer
  const handleAddDealer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newDealer);
      toast.success('Dealer added successfully!');
      setNewDealer({ dealerName: '', address: '', email: '', phone: '' });
      fetchDealers(); // Refresh the list
    } catch (error) {
      console.error('Error adding dealer:', error);
      toast.error('Error adding dealer!');
    }
  };

  const handleNewDealerChange = (e) => {
    const { name, value } = e.target;
    setNewDealer({ ...newDealer, [name]: value });
  };

  // Function to update an existing dealer
  const updateDealer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${dealerToEdit.id}`, dealerToEdit);
      toast.success('Dealer updated successfully!');
      setShowEditModal(false);
      fetchDealers(); // Refresh the list
    } catch (error) {
      console.error('Error updating dealer:', error);
      toast.error('Error updating dealer!');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDealerToEdit({ ...dealerToEdit, [name]: value });
  };

  // Function to delete a dealer
  const deleteDealer = async () => {
    try {
      await axios.delete(`${API_URL}/${dealerToDelete.id}`);
      toast.success('Dealer deleted successfully!');
      setShowDeleteModal(false);
      fetchDealers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting dealer:', error);
      toast.error('Error deleting dealer!');
    }
  };

  // Handlers for opening modals
  const handleEdit = (dealer) => {
    setDealerToEdit(dealer);
    setShowEditModal(true);
  };

  const handleDelete = (dealer) => {
    setDealerToDelete(dealer);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      {/* Add New Dealer Form */}
      <div className="mb-4">
        <h2 className="text-center my-4">Add New Dealer</h2>
        <Form onSubmit={handleAddDealer}>
          <Form.Group className="mb-3">
            <Form.Label>Dealer Name</Form.Label>
            <Form.Control
              type="text"
              name="dealerName"
              value={newDealer.dealerName}
              onChange={handleNewDealerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={newDealer.address}
              onChange={handleNewDealerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newDealer.email}
              onChange={handleNewDealerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={newDealer.phone}
              onChange={handleNewDealerChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add Dealer</Button>
        </Form>
        <h2 className="text-center my-4">Dealer List</h2>
      </div>

      {/* Dealer List */}
      <DealerList dealers={dealers} handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Edit Dealer Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Dealer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateDealer}>
            <Form.Group className="mb-3">
              <Form.Label>Dealer Name</Form.Label>
              <Form.Control
                type="text"
                name="dealerName"
                value={dealerToEdit.dealerName}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={dealerToEdit.address}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={dealerToEdit.email}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={dealerToEdit.phone}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Dealer Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Dealer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the dealer "{dealerToDelete?.dealerName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteDealer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

// DealerList component
const DealerList = ({ dealers, handleEdit, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Dealer Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dealers.map((dealer) => (
          <tr key={dealer.id}>
            {/* <td>{dealer.id}</td> */}
            <td>{dealer.dealerName}</td>
            <td>{dealer.address}</td>
            <td>{dealer.email}</td>
            <td>{dealer.phone}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(dealer)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(dealer)} className="ms-2">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dealers;
