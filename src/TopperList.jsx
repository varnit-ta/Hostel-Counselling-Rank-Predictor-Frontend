import { useState } from "react";
import "./TopperList.css"; // Import the CSS file

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
      const response = await fetch(`https://hostel-counselling-rank-predicto-production.up.railway.app/topper/all?grad_year=${gradYear}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "secret",
        },
      });

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
    <div className="branch-toppers-container">
      <h1 className="title">Branch Toppers</h1>

      <form onSubmit={fetchToppers} className="form">
        <input
          type="number"
          placeholder="Enter Graduation Year (e.g., 2025)"
          className="input"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          required
        />
        <button
          type="submit"
          className="button"
        >
          Fetch Toppers
        </button>
      </form>

      <div className="result-container">
        {loading && (
          <p className="info-text">Loading toppers...</p>
        )}

        {error && (
          <p className="error-text">{error}</p>
        )}

        {!loading && !error && (
          <>
            {toppers.length === 0 ? (
              <p className="info-text">No toppers found for the entered graduation year.</p>
            ) : (
              <div className="table-container">
                <table className="topper-table">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>CGPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toppers.map((topper, idx) => (
                      <tr key={idx}>
                        <td>{topper.branch}</td>
                        <td>{topper.topper_cgpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
