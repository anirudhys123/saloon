import React from 'react';
import logo from '../Assets/logo.jpeg'; // Import your logo image file
import './Header.css';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Salon Logo" />
            
        </header>
    );
}

export default Header;
