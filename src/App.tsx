import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthGuard } from "./auth/authenticate";
import Logout from "./pages/logout/Logout";
import Profile from "./pages/profile/Profile";
import Index from "./pages/index/Index";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthGuard>
              <Logout />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
};

export default App;
