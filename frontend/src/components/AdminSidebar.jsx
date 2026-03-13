import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/albums">Albums</Link>
        <button
          onClick={handleLogout}
          className="text-left text-red-400 mt-4"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
