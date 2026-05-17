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
    <div className="w-full md:w-64 bg-black text-white p-5 md:min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        GigFlow
      </h1>

      <ul className="flex flex-row md:flex-col justify-around md:justify-start gap-6">
        <li className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <LayoutDashboard size={20} />
          <span className="hidden sm:block">
            Dashboard
          </span>
        </li>

        <li className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <Users size={20} />
          <span className="hidden sm:block">
            Leads
          </span>
        </li>

        <li
          onClick={handleLogout}
          className="flex items-center gap-2 md:gap-3 cursor-pointer text-red-400"
        >
          <LogOut size={20} />
          <span className="hidden sm:block">
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;