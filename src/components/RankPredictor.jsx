import { useState } from "react";

export default function RankPredictor() {
  const [batch, setBatch] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [cgpa, setCgpa] = useState("");

  const [predictedRank, setPredictedRank] = useState(null);
  const [predictedNCGPA, setPredictedNCGPA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictedRank(null);
    setPredictedNCGPA(null);

    try {
      const response = await fetch(
        `https://hostel-counselling-rank-predicto-production.up.railway.app/student/predict?batch=${batch}&grad_year=${gradYear}&cgpa=${cgpa}`,
        {
          headers: {
            "X-API-Key": "secret", // remove if your API doesn't require it
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPredictedRank(data.predicted_rank);
        setPredictedNCGPA(data.predicted_ncgpa);
      } else {
        const err = await response.text();
        setError(err || "Prediction failed.");
      }
    } catch (err) {
      console.error("Prediction Error:", err);
      setError("An error occurred while fetching prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Rank Prediction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Branch (e.g., BIT, BCE)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
          className="input-style"
        />
        <input
          type="number"
          placeholder="Batch (e.g., 2022, 2021)"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          required
          className="input-style"
        />
        <input
          type="number"
          step="0.01"
          placeholder="CGPA (e.g., 9.00)"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          required
          className="input-style"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Predict Rank
        </button>
      </form>
      {loading && <p>Loading prediction...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && predictedRank !== null && (
        <div className="mt-4 text-left">
          <p>
            <strong>Predicted Rank:</strong> {predictedRank}
          </p>
          <p>
            <strong>Predicted Normalized CGPA:</strong> {predictedNCGPA}
          </p>
        </div>
      )}
    </div>
  );
}
