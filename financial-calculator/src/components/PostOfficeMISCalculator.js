import axios from "axios";
import React, { useState } from "react";
import "./PostOfficeMISCalculator.css"; // Importing the CSS file

const PostOfficeMISCalculator = () => {
    const [principalAmount, setPrincipalAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [investmentPeriod, setInvestmentPeriod] = useState("");
    const [monthlyInterest, setMonthlyInterest] = useState(null);

    const calculateMIS = async (e) => {
        e.preventDefault();

        const formData = {
            principalAmount: principalAmount,
            interestRate: interestRate,
            investmentPeriod: investmentPeriod,
        };

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/mis_calculator/", {
                params: formData,
            });
            setMonthlyInterest(response.data.result.monthlyInterest);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="mis-calculator-container">
            <h2 className="mis-calculator-title">Post Office MIS Calculator</h2>
            <form className="mis-calculator-form" onSubmit={calculateMIS}>
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
                    <label>Annual Interest Rate (%):</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Investment Period (Years):</label>
                    <input
                        type="number"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Calculate</button>
            </form>

            {monthlyInterest !== null && (
                <div className="result-container">
                    <h3 className="result-title">Results:</h3>
                    <p>Monthly Interest: ₹{monthlyInterest}</p>
                    <p>This amount will be credited to your account every month for the investment period.</p>
                </div>
            )}
        </div>
    );
};

export default PostOfficeMISCalculator;
