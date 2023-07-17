import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

declare global {
  interface Window {
    FakerApi?: any;
  }
}

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  const user = window.localStorage.getItem('auth');

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="bg-zinc-900 text-zinc-800 h-screen">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
