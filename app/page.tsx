import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <Navbar />
      <LandingPage />
    </ProtectedRoute>
  );
}