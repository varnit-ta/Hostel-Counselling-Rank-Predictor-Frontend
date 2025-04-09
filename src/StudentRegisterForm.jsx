import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegisterForm() {
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = {
      reg_no: regNo,
      name: name,
      cgpa: parseFloat(cgpa),
    };

    try {
      const response = await fetch('https://hostel-counselling-rank-predicto-production.up.railway.app/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'secret',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/dashboard", {
          state: { regNo },
        });
      } else {
        const errorText = await response.text();
        setMessage("Failed to register student: " + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred while submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Student Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={regNo}
              placeholder="Registration Number (e.g., 22BCE0001)"
              onChange={(e) => setRegNo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <input
              type="text"
              value={name}
              placeholder="Name (e.g., Arun Kumar)"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="CGPA (e.g., 9.00)"
              step="0.01"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Register Student
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
