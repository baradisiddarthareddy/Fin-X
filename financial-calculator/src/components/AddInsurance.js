import React, { useState } from 'react';
import axios from 'axios';

const AddInsurance = () => {
    const [insuranceType, setInsuranceType] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [provider, setProvider] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access');
            await axios.post('/api/insurance/', {
                insurance_type: insuranceType,
                policy_number: policyNumber,
                provider,
                start_date: startDate,
                end_date: endDate,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Insurance added successfully!');
        } catch (error) {
            console.error('Error adding insurance:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Insurance</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Insurance Type:</label>
                    <select value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Car">Car Insurance</option>
                        <option value="Home">Home Insurance</option>
                        <option value="Health">Health Insurance</option>
                        <option value="Life">Life Insurance</option>
                        <option value="Term">Term Insurance</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Policy Number:</label>
                    <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        placeholder="Enter policy number"
                    />
                </div>
                <div className="form-group">
                    <label>Provider:</label>
                    <input
                        type="text"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        placeholder="Enter provider"
                    />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="auth-btn" type="submit">Add Insurance</button>
            </form>
        </div>
    );
};

export default AddInsurance;
