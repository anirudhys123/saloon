import React from 'react';
import { useNavigate } from 'react-router-dom';

const RazorpayPayment = ({ amount, bookingDetails }) => {
  const navigate = useNavigate();

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_k3e3fimeByvpbP', // Replace with your Razorpay key ID
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: bookingDetails.salonName,
      description: `Payment for ${bookingDetails.service}`,
      handler: function (response) {
        alert('Payment successful: ' + response.razorpay_payment_id);
        navigate('/bill', { state: { bookingDetails, paymentId: response.razorpay_payment_id } });
      },
      prefill: {
        name: bookingDetails.name,
        email: 'user@example.com', // Replace with actual user email if available
        contact: '9999999999', // Replace with actual user contact if available
      },
      notes: {
        address: 'some address',
      },
      theme: {
        color: '#3399cc',
      },
      // Changing "SAY" to "Bizwy" in the metadata
      metadata: {
        integration_name: "Bizwy",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button className="btn btn-primary" onClick={handlePayment}>
      Pay Now
    </button>
  );
};

export default RazorpayPayment;
