import API from "../services/api";
import useAuthStore from "../store/authStore";
import EditLeadModal from "./EditLeadModal";
import { toast } from "react-toastify";

const LeadTable = ({
  leads,
  fetchLeads,
  fetchStats,
  loading,
}) => {
  const token = useAuthStore((state) => state.token);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeads();
      fetchStats();

      toast.success("Lead deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-purple-100 text-purple-700";

      case "Converted":
        return "bg-green-100 text-green-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>

        <p className="mt-4 text-gray-500">
          Loading leads...
        </p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-bold mb-2">
          No Leads Found
        </h2>

        <p className="text-gray-500">
          Try adding new leads or changing filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {lead.name}
                </td>

                <td className="p-4">
                  {lead.email}
                </td>

                <td className="p-4">
                  {lead.company}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <EditLeadModal
                      lead={lead}
                      fetchLeads={fetchLeads}
                      fetchStats={fetchStats}
                    />

                    <button
                      onClick={() =>
                        handleDelete(lead._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-xl shadow p-5"
          >
            <div className="mb-3">
              <h3 className="text-xl font-bold">
                {lead.name}
              </h3>

              <p className="text-gray-500 break-all">
                {lead.email}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">
                Company
              </p>

              <p className="font-medium">
                {lead.company}
              </p>
            </div>

            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <EditLeadModal
                lead={lead}
                fetchLeads={fetchLeads}
                fetchStats={fetchStats}
              />

              <button
                onClick={() =>
                  handleDelete(lead._id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeadTable;