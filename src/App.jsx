import { Routes, Route } from "react-router-dom";
import StudentRegisterForm from "./StudentRegisterForm";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentRegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
