import React from 'react';
import { useLocation } from 'react-router-dom';
import './BillPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BillPage = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const { name, gender, date, slot, service, price, salonName, location: bookingLocation } = bookingDetails;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <div className="bill-page-container" id="bill-page-container">
        <h1 className="bill-page-header">Slot Confirmation Receipt</h1>
        <div className="bill-details">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Slot Timing:</strong> {slot}</p>
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Price:</strong> ₹{price}</p>
          <p><strong>Salon Name:</strong> {salonName}</p>
          <p><strong>Location:</strong> {bookingLocation}</p>
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>Print</button>
      </div>
      <Footer />
    </>
  );
};

export default BillPage;
