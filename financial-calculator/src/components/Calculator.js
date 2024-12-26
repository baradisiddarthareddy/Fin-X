import React, { useState } from 'react';
import axios from 'axios';

const Calculator = ({ type, endpoint, inputs }) => {
    const [formData, setFormData] = useState({});
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}/`, { params: formData });
            setResult(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>{type} Calculator</h2>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <div key={input.name}>
                        <label>{input.label}:</label>
                        <input type="number" name={input.name} onChange={handleChange} required />
                    </div>
                ))}
                <button type="submit">Calculate</button>
            </form>
            {result && <div>Result: {JSON.stringify(result)}</div>}
        </div>
    );
};

export default Calculator;
