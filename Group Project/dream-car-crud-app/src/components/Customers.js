import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = 'https://localhost:7226/api/Customer';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState({ id: '', name: '', address: '', email: '', phone: '' });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Fetch customers from API when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Error fetching customers!');
    }
  };

  // Function to add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newCustomer);
      toast.success('Customer added successfully!');
      setNewCustomer({ name: '', address: '', email: '', phone: '' });
      fetchCustomers(); // Refresh the list
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Error adding customer!');
    }
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  // Function to update an existing customer
  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${customerToEdit.id}`, customerToEdit);
      toast.success('Customer updated successfully!');
      setShowEditModal(false);
      fetchCustomers(); // Refresh the list
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error updating customer!');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCustomerToEdit({ ...customerToEdit, [name]: value });
  };

  // Function to delete a customer
  const deleteCustomer = async () => {
    try {
      await axios.delete(`${API_URL}/${customerToDelete.id}`);
      toast.success('Customer deleted successfully!');
      setShowDeleteModal(false);
      fetchCustomers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer!');
    }
  };

  // Handlers for opening modals
  const handleEdit = (customer) => {
    setCustomerToEdit(customer);
    setShowEditModal(true);
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      {/* Add New Customer Form */}
      <div className="mb-4">
        <h2 className="text-center my-4">Add New Customer</h2>
        <Form onSubmit={handleAddCustomer}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={newCustomer.address}
              onChange={handleNewCustomerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newCustomer.email}
              onChange={handleNewCustomerChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={newCustomer.phone}
              onChange={handleNewCustomerChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add Customer</Button>
        </Form>
        <h2 className="text-center my-4">Customer List</h2>
      </div>

      {/* Customer List */}
      <CustomerList customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Edit Customer Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateCustomer}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={customerToEdit.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={customerToEdit.address}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={customerToEdit.email}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={customerToEdit.phone}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Customer Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the customer "{customerToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCustomer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

// CustomerList component
const CustomerList = ({ customers, handleEdit, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            {/* <td>{customer.id}</td> */}
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(customer)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(customer)} className="ms-2">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Customers;
