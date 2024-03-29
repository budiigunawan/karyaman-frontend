import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='attendance' element={<Attendance />} />
        <Route path='employee' element={<Employee />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Navigate to='attendance' replace />} />
        <Route path='*' element={<Navigate to='attendance' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
