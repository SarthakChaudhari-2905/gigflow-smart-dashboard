const SearchFilter = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-5">
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-lg flex-1 bg-white outline-none"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-3 rounded-lg bg-white md:w-60 outline-none"
      >
        <option value="">All Status</option>

        <option value="New">New</option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Converted">
          Converted
        </option>

        <option value="Lost">Lost</option>
      </select>
    </div>
  );
};

export default SearchFilter;