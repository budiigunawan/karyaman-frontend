import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Employee from './pages/Employee';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path='attendance'
            element={<PrivateRoute Component={Attendance} />}
          />
          <Route
            path='employee'
            element={<PrivateRoute Component={Employee} />}
          />
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Navigate to='attendance' replace />} />
          <Route path='*' element={<Navigate to='attendance' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
