import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Services.css";
import haircut from "../Assets/haircut.jpg";
import hairwash from "../Assets/hairwash.jpg";
import Manicure from "../Assets/manicure.jpg";
import hairspa from "../Assets/hairspa.jpg";
import shaving from "../Assets/shaving.jpg";
import pedicure from "../Assets/pedicure.jpg";
import facial from "../Assets/facial.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RazorpayPayment from '../components/RazorpayPayment';

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { salonType, salonName } = location.state || {};
  const [selectedService, setSelectedService] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // State for location
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    gender: '',
    date: '',
    slot: '',
    service: '',
    price: '',
    salonName: salonName || '',
    location: ''
  });

  useEffect(() => {
    filterServices(salonType);
  }, [salonType]);

  const handleDropdownChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      service: service.title,
      price: service.price
    }));
  };

  const servicesData = [
    { id: 1, title: "Haircut", description: "Get a trendy haircut from our professional stylists.", price: 150, image: haircut },
    { id: 2, title: "Shaving and Face Massage", description: "Enjoy a soothing shaving and face massage session.", price: 250, image: shaving },
    { id: 3, title: "Hairwash", description: "Treat your hair with a rejuvenating hairwash session.", price: 200, image: hairwash },
    { id: 4, title: "Pedicure", description: "Treat your feet with a rejuvenating pedicure session.", price: 200, image: pedicure },
    { id: 5, title: "Manicure", description: "Pamper yourself with a relaxing manicure session.", price: 180, image: Manicure },
    { id: 6, title: "Facial", description: "Rejuvenate your skin with our facial treatments.", price: 300, image: facial },
    { id: 7, title: "Hair Spa", description: "Relax with our nourishing hair spa services.", price: 350, image: hairspa },
  ];

  const filterServices = (salonType) => {
    let filtered;
    switch (salonType) {
      case "men":
        filtered = servicesData.filter((service) => service.id >= 1 && service.id <= 3);
        break;
      case "women":
        filtered = servicesData.filter((service) => service.id >= 4 && service.id <= 7);
        break;
      case "both":
        filtered = servicesData;
        break;
      default:
        filtered = servicesData;
        break;
    }
    setFilteredServices(filtered);
  };

  return (
    <>
      <Header />
      <section id="services">
        <h1>Our Salon Services</h1>
        <div className="dropdown-container">
          <div className="location">
            <select value={selectedOption} onChange={(event) => {
              setSelectedOption(event.target.value);
              setBookingDetails(prevDetails => ({
                ...prevDetails,
                location: event.target.value
              }));
            }}>
              <option value="">Select the location</option>
              <option value="Kukatpally">Kukatpally</option>
              <option value="Gachibowli">Gachibowli</option>
              <option value="Madhapur">Madhapur</option>
              <option value="Kondapur">Kondapur</option>
            </select>
            {selectedOption && <p>Selected Location: {selectedOption}</p>}
          </div>
          <select id="serviceDropdown" value={selectedService} onChange={handleDropdownChange}>
            {salonType === 'men' && <option value="Regis salon">Only for Men</option>}
            {salonType === 'women' && <option value="American Crew">Only for Women</option>}
            {salonType === 'both' && <option value="Tony & Guy">For both Men and Women</option>}
          </select>
        </div>
        <div className="services-container">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Price:</strong> ₹{service.price}</p>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${service.id}`} onClick={() => handleServiceSelect(service)}>
                Book Slot
              </button>
            </div>
          ))}
        </div>
        {filteredServices.map((service) => (
          <div key={service.id} className="modal fade" id={`exampleModal${service.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${service.id}`} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id={`exampleModalLabel${service.id}`}>Enter the details</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div>Name</div>
                  <input type="text" name="name" required placeholder="Enter your Name" onChange={handleInputChange} style={{ width: "100%" }} />
                  <div>Gender</div>
                  <select name="gender" onChange={handleInputChange}>
                    <option> Select the gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                  <div>Select Date</div>
                  <input type="date" name="date" onChange={handleInputChange} style={{ width: "100%" }} />
                  <div>Slot Timing</div>
                  <select name="slot" onChange={handleInputChange}>
                    <option>Select Slot Timing</option>
                    <option>7:00AM</option>
                    <option>9:00AM</option>
                    <option>4:00PM</option>
                    <option>6:00PM</option>
                  </select>
                  <div>Select Service</div>
                  <select name="service" value={service.title} readOnly>
                    <option>{service.title}</option>
                  </select>
                  <div>Price</div>
                  <input type="text" name="price" value={service.price} readOnly />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <RazorpayPayment amount={service.price} bookingDetails={bookingDetails} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Services;
