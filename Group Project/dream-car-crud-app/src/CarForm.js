import React, { useState, useEffect } from 'react';

const CarForm = ({ addCar, carToEdit, updateCar }) => {
  const [car, setCar] = useState({
    name: '',
    description: '',
    make: '',
    model: '',
    price: '',
  });

  useEffect(() => {
    if (carToEdit) {
      setCar(carToEdit);
    }
  }, [carToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carToEdit) {
      updateCar(car);
    } else {
      addCar(car);
    }
    setCar({ name: '', description: '', make: '', model: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label className="form-label">Car Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={car.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={car.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Make</label>
        <input
          type="text"
          className="form-control"
          name="make"
          value={car.make}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Model</label>
        <input
          type="text"
          className="form-control"
          name="model"
          value={car.model}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={car.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {carToEdit ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
};

export default CarForm;
