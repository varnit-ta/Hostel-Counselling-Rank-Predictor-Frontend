import { useState } from "react";
import "./TopperUpdateForm.css"; // link to CSS file

export default function TopperUpdateForm() {
  const [batch, setBatch] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [topperCgpa, setTopperCgpa] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      batch: batch,
      grad_year: parseInt(gradYear),
      topper_cgpa: parseFloat(topperCgpa),
    };

    try {
      const response = await fetch('http://localhost:8080/topper/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'secret',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Topper CGPA updated successfully!");
        setBatch("");
        setGradYear("");
        setTopperCgpa("");
      } else {
        const errorText = await response.text();
        setMessage("Failed to submit update: " + errorText);
      }
    } catch (error) {
      console.error('Error updating topper:', error);
      setMessage("An error occurred while submitting the update.");
    }
  };

  return (
    <div className="topper-update-container">
      <h2 className="topper-update-title">Update Topper CGPA (if wrong or not available)</h2>

      {message && <div className="topper-update-message">{message}</div>}

      <form className="topper-update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Batch (e.g., BIT)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Graduation Year (e.g., 2024)"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Topper's CGPA (e.g., 9.87)"
          value={topperCgpa}
          onChange={(e) => setTopperCgpa(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
