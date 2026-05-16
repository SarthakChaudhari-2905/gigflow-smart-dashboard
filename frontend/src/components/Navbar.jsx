import useAuthStore from "../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white shadow p-5 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div>
        Welcome,{" "}
        <span className="font-semibold">
          {user?.name}
        </span>
      </div>
    </div>
  );
};

export default Navbar;