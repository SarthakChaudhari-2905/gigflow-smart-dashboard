import { useState } from "react";

import API from "../services/api";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

const AddLeadModal = ({ fetchLeads, fetchStats }) => {
  const token = useAuthStore((state) => state.token);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "New",
    notes: "",
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
      await API.post("/leads", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeads();

      fetchStats();

      setOpen(false);

      setFormData({
        name: "",
        email: "",
        company: "",
        status: "New",
        notes: "",
      });

toast.success("Lead added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-5 py-3 rounded-lg mb-5"
      >
        + Add Lead
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
           className="bg-white p-6 md:p-8 rounded-xl w-full max-w-md mx-4"
          >
            <h2 className="text-2xl font-bold mb-5">
              Add Lead
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
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
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-black text-white px-5 py-2 rounded"
              >
                Add
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

export default AddLeadModal;