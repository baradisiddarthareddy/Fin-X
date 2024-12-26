import axios from "axios";
import React, { useState } from "react";
import "./SimpleInterestCalculator.css"; // Import the CSS file

const SimpleInterestCalculator = () => {
    const [principalAmount, setPrincipalAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [timePeriod, setTimePeriod] = useState("");
    const [simpleInterest, setSimpleInterest] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);

    const calculateSI = async (e) => {
        e.preventDefault();

        const formData = {
            principalAmount: principalAmount,
            interestRate: interestRate,
            timePeriod: timePeriod,
        };

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/simple_interest/", {
                params: formData,
            });
            setSimpleInterest(response.data.result.simpleInterest);
            setTotalAmount(response.data.result.totalAmount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="simple-interest-container">
            <h2 className="simple-interest-title">Simple Interest Calculator</h2>
            <form className="simple-interest-form" onSubmit={calculateSI}>
                <div className="form-group">
                    <label>Principal Amount (₹):</label>
                    <input
                        type="number"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rate of Interest (%):</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time Period (Years):</label>
                    <input
                        type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Calculate</button>
            </form>

            {simpleInterest !== null && (
                <div className="result-container">
                    <h3 className="result-title">Results:</h3>
                    <p>Simple Interest: ₹{simpleInterest}</p>
                    <p>Total Amount (Principal + Interest): ₹{totalAmount}</p>
                </div>
            )}
        </div>
    );
};

export default SimpleInterestCalculator;
