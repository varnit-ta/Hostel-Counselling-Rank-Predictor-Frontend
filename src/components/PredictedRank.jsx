import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PredictedRank() {
  const location = useLocation();
  const [rank, setRank] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const regNo = location.state?.regNo;

  
  useEffect(() => {
    if (!regNo) return;

    const fetchRank = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://hostel-counselling-rank-predicto-production.up.railway.app/student/rank?reg_no=${encodeURIComponent(regNo)}`,
          {
            headers: {
              "X-API-Key": "secret",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setRank(result.rank);
        } else {
          const errText = await response.text();
          setError("Failed to fetch predicted rank: " + errText);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching predicted rank.");
      } finally {
        setLoading(false);
      }
    };

    fetchRank();
  }, [regNo]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Your Predicted Rank</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : rank !== null ? (
        <p className="text-2xl font-bold text-green-600">{rank}</p>
      ) : (
        <p>No registration number found.</p>
      )}
    </div>
  );
  
}
