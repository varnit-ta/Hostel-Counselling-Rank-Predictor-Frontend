import { useState } from "react";

export default function BranchToppers() {
  const [gradYear, setGradYear] = useState("");
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchToppers = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setToppers([]);

    try {
      const response = await fetch(
        `https://hostel-counselling-rank-predicto-production.up.railway.app/topper/all?grad_year=${gradYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "secret",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToppers(data);
      } else {
        const errText = await response.text();
        setError(errText || "Failed to fetch toppers");
      }
    } catch (err) {
      console.error("Error fetching toppers:", err);
      setError("Error occurred while fetching toppers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Branch Toppers</h2>
      <form onSubmit={fetchToppers} className="flex flex-col gap-3">
        <input
          type="number"
          placeholder="Batch (e.g., 2022, 2024)"
          className="input-style"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Fetch Toppers
        </button>
      </form>

      {loading && <p>Loading toppers...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && toppers.length > 0 && (
        <table className="mt-4 w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 border">Branch</th>
              <th className="py-2 border">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {toppers.map((topper, idx) => (
              <tr key={idx}>
                <td className="py-2 border">{topper.branch}</td>
                <td className="py-2 border">{topper.topper_cgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
