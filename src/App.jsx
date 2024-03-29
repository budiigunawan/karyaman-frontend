import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='employee' element={<Employee />} />
        <Route path='attendance' element={<Attendance />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Navigate to='dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
