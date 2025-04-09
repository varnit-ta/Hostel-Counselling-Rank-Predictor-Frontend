import TopperList from "./TopperList";
import TopperUpdateForm from "./TopperUpdateForm";
import StudentRegisterForm from "./StudentRegisterForm";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard"; // you'll create this next

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentRegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
