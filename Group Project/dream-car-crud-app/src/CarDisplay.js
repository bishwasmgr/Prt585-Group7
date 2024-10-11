import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://localhost:7226/api/Car';

const CarDisplayApp = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(API_URL);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error.response ? error.response.data : error.message);
        setError('Error fetching cars! Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1 className="text-center my-4">Car Inventory</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Make</th>
            <th>Model</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.Id}>
              <td>{car.Id}</td>
              <td>{car.carName}</td>
              <td>{car.carDescription}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarDisplayApp;
