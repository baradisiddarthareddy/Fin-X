import axios from "axios";
import React, { useState } from "react";
import "./SukanyaSamriddhiCalculator.css"; // Import the CSS file

const SukanyaSamriddhiCalculator = () => {
    const [annualDeposit, setAnnualDeposit] = useState("");
    const [interestRate, setInterestRate] = useState(8.2); // 8.2% default
    const [yearsOfDeposit, setYearsOfDeposit] = useState(15); // 15 years default
    const [maturityAmount, setMaturityAmount] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);

    const calculateMaturityAmount = async (e) => {
        e.preventDefault();

        const formData = {
            annualDeposit: annualDeposit,
            interestRate: interestRate,
            yearsOfDeposit: yearsOfDeposit,
        };

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/ssy_maturity/", {
                params: formData,
            });
            setMaturityAmount(response.data.result.maturityAmount);
            setTotalInterest(response.data.result.totalInterest);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="ssy-container">
            <h2 className="ssy-title">Sukanya Samriddhi Yojana (SSY) Calculator</h2>
            <form className="ssy-form" onSubmit={calculateMaturityAmount}>
                <div className="form-group">
                    <label>Annual Deposit (₹):</label>
                    <input
                        type="number"
                        value={annualDeposit}
                        onChange={(e) => setAnnualDeposit(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Interest Rate (%):</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Years of Deposit (15 years):</label>
                    <input
                        type="number"
                        value={yearsOfDeposit}
                        onChange={(e) => setYearsOfDeposit(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Calculate</button>
            </form>

            {maturityAmount !== null && (
                <div className="result-container">
                    <h3 className="result-title">Results:</h3>
                    <p>Total Maturity Amount: ₹{maturityAmount}</p>
                    <p>Total Interest Earned: ₹{totalInterest}</p>
                </div>
            )}
        </div>
    );
};

export default SukanyaSamriddhiCalculator;
