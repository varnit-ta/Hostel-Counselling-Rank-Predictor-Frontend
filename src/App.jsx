import TopperList from "./TopperList";
import TopperUpdateForm from "./TopperUpdateForm";
import StudentRegisterForm from "./StudentRegisterForm";

function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <StudentRegisterForm />
      <TopperList />
      <TopperUpdateForm />
    </div>
  );
}

export default App;
