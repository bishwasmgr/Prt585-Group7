import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = 'https://localhost:7226/api/Car';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    carName: '',
    carDescription: '',
    make: '',
    model: '',
    price: '',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState({ id: '', carName: '', carDescription: '', make: '', model: '', price: '' });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Fetch cars from API when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(API_URL);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Error fetching cars!');
    }
  };

  // Function to add a new car
  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newCar);
      toast.success('Car added successfully!');
      setNewCar({ carName: '', carDescription: '', make: '', model: '', price: '' });
      fetchCars(); // Refresh the list
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Error adding car!');
    }
  };

  const handleNewCarChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // Function to update an existing car
  const updateCar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${carToEdit.id}`, carToEdit);
      toast.success('Car updated successfully!');
      setShowEditModal(false);
      fetchCars(); // Refresh the list
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error('Error updating car!');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCarToEdit({ ...carToEdit, [name]: value });
  };

  // Function to delete a car
  const deleteCar = async () => {
    try {
      await axios.delete(`${API_URL}/${carToDelete.id}`);
      toast.success('Car deleted successfully!');
      setShowDeleteModal(false);
      fetchCars(); // Refresh the list
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Error deleting car!');
    }
  };

  // Handlers for opening modals
  const handleEdit = (car) => {
    setCarToEdit(car);
    setShowEditModal(true);
  };

  const handleDelete = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  return (
    <div className="container">
      

      {/* Add New Car Form */}
      <div className="mb-4">
        <h2 className="text-center my-4">Add New Car</h2>
        <Form onSubmit={handleAddCar}>
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              type="text"
              name="carName"
              value={newCar.carName}
              onChange={handleNewCarChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="carDescription"
              value={newCar.carDescription}
              onChange={handleNewCarChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={newCar.make}
              onChange={handleNewCarChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={newCar.model}
              onChange={handleNewCarChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newCar.price}
              onChange={handleNewCarChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add Car</Button>
        </Form>
        <h2 className="text-center my-4">Car List</h2>
      </div>

      {/* Car List */}
      <CarList cars={cars} handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Edit Car Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateCar}>
            <Form.Group className="mb-3">
              <Form.Label>Car Name</Form.Label>
              <Form.Control
                type="text"
                name="carName"
                value={carToEdit.carName}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="carDescription"
                value={carToEdit.carDescription}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={carToEdit.make}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={carToEdit.model}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={carToEdit.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Car Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the car "{carToDelete?.carName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCar}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

// CarList component
const CarList = ({ cars, handleEdit, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {/* <th>id</th> */}
          <th>Car Name</th>
          <th>Description</th>
          <th>Make</th>
          <th>Model</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            {/* <td>{car.id}</td> */}
            <td>{car.carName}</td>
            <td>{car.carDescription}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.price}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(car)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(car)} className="ms-2">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Car;
