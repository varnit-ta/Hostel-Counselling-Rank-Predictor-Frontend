import PredictedRank from "./components/PredictedRank";
import BranchToppers from "./components/TopperList";
import RankPredictor from "./components/RankPredictor";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-gray-50 min-h-screen">
      <PredictedRank />
      <RankPredictor />
      <BranchToppers />
    </div>
  );
}
