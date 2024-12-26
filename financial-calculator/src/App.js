import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import FixedDepositCalculator from './components/FixedDepositCalculator';
import GSTCalculator from './components/GSTCalculator';
import Home from './components/Home';
import Login from './components/Login';
import PostOfficeMISCalculator from './components/PostOfficeMISCalculator';
import RecurringDepositCalculator from './components/RecurringDepositCalculator';
import Signup from './components/Signup';
import SimpleInterestCalculator from './components/SimpleInterestCalculator';
import SIPCalculator from './components/SIPCalculator';
import SukanyaSamriddhiCalculator from './components/SukanyaSamriddhiCalculator';

import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <header className="header">
                <img src="/logo.jpg" alt="Financial Calculators Logo" className="logo" />
                <div className="header-content">
                    <h1 className="app-title">Fin-X</h1>
                    <p className="app-description">
                        Simplify your financial decisions with our easy-to-use calculators.
                    </p>
                </div>
            </header>
            <main className="main-content">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />

                    {/* Protected Routes */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/sip" element={<SIPCalculator />} />
                            <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
                            <Route path="/gst" element={<GSTCalculator />} />
                            <Route path="/fd" element={<FixedDepositCalculator />} />
                            <Route path="/rd" element={<RecurringDepositCalculator />} />
                            <Route path="/mis" element={<PostOfficeMISCalculator />} />
                            <Route path="/si" element={<SimpleInterestCalculator />} />
                            <Route path="/ssy" element={<SukanyaSamriddhiCalculator />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/signup" />} />
                    )}
                </Routes>
            </main>
        </Router>
    );
};

export default App;
