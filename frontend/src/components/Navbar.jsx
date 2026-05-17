import useAuthStore from "../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white shadow p-4 md:p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="text-sm md:text-base text-center sm:text-right">
        Welcome,{" "}
        <span className="font-semibold">
          {user?.name}
        </span>
      </div>
    </div>
  );
};

export default Navbar;