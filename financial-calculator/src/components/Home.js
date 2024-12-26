import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">Welcome to Financial Calculators</h1>
                <p className="home-description">
                    Your one-stop solution for simplifying financial decisions! Whether it's calculating interest, GST, or savings plans, our tools are here to help you make smarter choices with ease.
                </p>
            </div>
            <nav className="calculator-navbar">
                <Link to="/sip" className="calc-button">SIP Calculator</Link>
                <Link to="/compound-interest" className="calc-button">Compound Interest Calculator</Link>
                <Link to="/gst" className="calc-button">GST Calculator</Link>
                <Link to="/fd" className="calc-button">Fixed Deposit Calculator</Link>
                <Link to="/rd" className="calc-button">Recurring Deposit Calculator</Link>
                <Link to="/mis" className="calc-button">Post Office MIS Calculator</Link>
                <Link to="/si" className="calc-button">Simple Interest Calculator</Link>
                <Link to="/ssy" className="calc-button">Sukanya Samriddhi Calculator</Link>
            </nav>
            <div className="home-image-container">
                <img
                    src="./logo1.jpg"
                    alt="Financial Tools"
                    className="home-image"
                />
            </div>
        </div>
    );
};

export default Home;