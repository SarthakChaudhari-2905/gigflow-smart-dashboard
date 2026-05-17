import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import LeadTable from "../components/LeadTable";
import AddLeadModal from "../components/AddLeadModal";
import API from "../services/api";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const token = useAuthStore((state) => state.token);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/leads?search=${search}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/leads/stats/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [search, status]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 overflow-x-hidden">
        <Navbar />

        <div className="p-4 md:p-8">
          <StatsCards stats={stats} />

          <SearchFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />

          <div className="mb-6">
            <AddLeadModal
              fetchLeads={fetchLeads}
              fetchStats={fetchStats}
            />
          </div>

          <LeadTable
            leads={leads}
            fetchLeads={fetchLeads}
            fetchStats={fetchStats}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;