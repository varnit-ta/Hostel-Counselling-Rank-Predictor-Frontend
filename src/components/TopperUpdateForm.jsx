import { useState } from "react";

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
      const response = await fetch('https://hostel-counselling-rank-predicto-production.up.railway.app/topper/update', {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Update Topper CGPA (if wrong or not available)
      </h2>

      {message && (
        <div className="mb-4 text-sm text-white bg-blue-500 rounded-md px-4 py-2">
          {message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Branch (e.g., BIT, BCE)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Batch (e.g., 2022, 2021)"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Topper's CGPA (e.g., 9.87)"
          value={topperCgpa}
          onChange={(e) => setTopperCgpa(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
