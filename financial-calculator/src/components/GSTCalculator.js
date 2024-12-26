import axios from "axios";
import React, { useState } from "react";
import "./GSTCalculator.css"; // Importing the CSS file

const GSTCalculator = () => {
    const [price, setPrice] = useState("");
    const [gstRate, setGstRate] = useState("");
    const [calculationType, setCalculationType] = useState("exclusive");
    const [results, setResults] = useState(null);

    const calculateGST = async (e) => {
        e.preventDefault();

        const formData = {
            price: price,
            gstRate: gstRate,
            calculationType: calculationType,
        };

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/gst_calculator/", {
                params: formData,
            });
            setResults(response.data.result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="gst-calculator-container">
            <h2 className="gst-calculator-title">GST Calculator</h2>
            <form className="gst-calculator-form" onSubmit={calculateGST}>
                <div className="form-group">
                    <label>{calculationType === "exclusive" ? "Original Price (₹):" : "Price with GST (₹):"}</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>GST Rate (%):</label>
                    <input
                        type="number"
                        value={gstRate}
                        onChange={(e) => setGstRate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Calculation Type:</label>
                    <select
                        value={calculationType}
                        onChange={(e) => setCalculationType(e.target.value)}
                        className="form-select"
                    >
                        <option value="exclusive">Exclusive GST</option>
                        <option value="inclusive">Inclusive GST</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Calculate</button>
            </form>

            {results && (
                <div className="result-container">
                    <h3 className="result-title">Results:</h3>
                    <p>GST Amount: ₹{results.gstAmount}</p>
                    <p>{calculationType === "exclusive" ? "Final Price (with GST):" : "Original Price (excluding GST):"} ₹{results.finalPrice}</p>
                </div>
            )}
        </div>
    );
};

export default GSTCalculator;
