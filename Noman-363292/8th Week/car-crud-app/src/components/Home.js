import React from 'react';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="display-4">Welcome to the Car Inventory System</h1>
      <p className="lead">Manage your Cars, Customers, and Dealers with ease!</p>
      <div className="mt-4">
        <h2 className="mb-3">Quick Access</h2>
        <div className="d-grid gap-2 col-6 mx-auto">
          <a className="btn btn-primary" href="/cars">View Cars</a>
          <a className="btn btn-secondary" href="/customers">View Customers</a>
          <a className="btn btn-success" href="/dealers">View Dealers</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
