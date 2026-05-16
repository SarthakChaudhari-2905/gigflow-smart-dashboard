import { LayoutDashboard, Users, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-10">
        GigFlow
      </h1>

      <ul className="space-y-6">
        <li className="flex items-center gap-3 cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <Users size={20} />
          Leads
        </li>

        <li
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer text-red-400"
        >
          <LogOut size={20} />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;