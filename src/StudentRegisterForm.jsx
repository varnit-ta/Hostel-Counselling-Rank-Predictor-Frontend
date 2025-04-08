import { useState } from "react";
import "./StudentRegisterForm.css"

export default function StudentRegisterForm() {
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [predictedRank, setPredictedRank] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = {
      reg_no: regNo,
      name: name,
      cgpa: parseFloat(cgpa),
    };

    try {
      const response = await fetch('http://localhost:8080/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'secret',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Student registered successfully.");

        const predictResponse = await fetch(`http://localhost:8080/student/rank?reg_no=${encodeURIComponent(regNo)}`, {
          headers: {
            'X-API-Key': 'secret',
          },
        });

        if (predictResponse.ok) {
          const result = await predictResponse.json();
          setPredictedRank(result.rank);
        } else {
          const errorText = await predictResponse.text();
          setMessage("Student registered, but failed to fetch rank: " + errorText);
          setPredictedRank(null);
        }

        setRegNo("");
        setName("");
        setCgpa("");
      } else {
        const errorText = await response.text();
        setMessage("Failed to register student: " + errorText);
        setPredictedRank(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred while submitting.");
      setPredictedRank(null);
    }
  };

  return (
    <div className="student-register-form">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={regNo}
            placeholder="Registration Number (e.g., 22BCE0001)"
            onChange={(e) => setRegNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            value={name}
            placeholder="Name (e.g., Arun Kumar)"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="CGPA (e.g., 9.00)"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register Student</button>
      </form>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      {predictedRank !== null && (
        <div className="predicted-rank">
          <h3>Predicted Rank</h3>
          <p>{predictedRank}</p>
        </div>
      )}
    </div>
  );
}
