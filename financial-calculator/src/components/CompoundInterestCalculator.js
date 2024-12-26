import axios from "axios";
import React, { useState } from "react";
import "./CompoundInterestCalculator.css"; // Import CSS file

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [time, setTime] = useState("");
    const [compounds, setCompounds] = useState(1); // Default to annually
    const [results, setResults] = useState(null);

    const calculateCompoundInterest = async (e) => {
        e.preventDefault();

        const formData = {
            principal: principal,
            rate: rate,
            time: time,
            compounds: compounds,
        };

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/compound_interest/", {
                params: formData,
            });
            setResults(response.data.result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="compound-calculator">
            <h2>Compound Interest Calculator</h2>
            <form onSubmit={calculateCompoundInterest} className="calculator-form">
                <div className="form-group">
                    <label>Principal (₹):</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        required
                        placeholder="Enter principal amount"
                    />
                </div>
                <div className="form-group">
                    <label>Annual Rate of Interest (%):</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                        placeholder="Enter rate of interest"
                    />
                </div>
                <div className="form-group">
                    <label>Time (Years):</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        placeholder="Enter time period in years"
                    />
                </div>
                <div className="form-group">
                    <label>Compounding Frequency:</label>
                    <select
                        value={compounds}
                        onChange={(e) => setCompounds(e.target.value)}
                        className="frequency-dropdown"
                    >
                        <option value="1">Annually</option>
                        <option value="2">Semi-Annually</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                    </select>
                </div>
                <button type="submit" className="calculate-btn">Calculate</button>
            </form>

            {results && (
                <div className="results">
                    <h3>Results:</h3>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Amount (₹)</th>
                                <th>Interest Earned (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.year}>
                                    <td>{result.year}</td>
                                    <td>{result.amount}</td>
                                    <td>{result.interest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="summary">
                        <h4>Total Amount: ₹{results[results.length - 1].amount}</h4>
                        <h4>Compound Interest: ₹{results[results.length - 1].interest}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompoundInterestCalculator;
