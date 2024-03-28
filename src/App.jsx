import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='employee' element={<Employee />} />
            <Route path='attendace' element={<Attendance />} />
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Navigate to='dashboard' replace />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
