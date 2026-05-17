import { useState } from "react";

import API from "../services/api";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

const EditLeadModal = ({
  lead,
  fetchLeads,
  fetchStats,
}) => {
  const token = useAuthStore((state) => state.token);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    status: lead.status,
    notes: lead.notes || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/leads/${lead._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();

      fetchStats();

      setOpen(false);

   toast.success("Lead updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 rounded-xl w-full max-w-md mx-4"
          >
            <h2 className="text-2xl font-bold mb-5">
              Edit Lead
            </h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            >
              <option>New</option>

              <option>Contacted</option>

              <option>In Progress</option>

              <option>Converted</option>

              <option>Lost</option>
            </select>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-black text-white px-5 py-2 rounded"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditLeadModal;