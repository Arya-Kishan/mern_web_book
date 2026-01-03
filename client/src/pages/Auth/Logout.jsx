import logoutIcon from "../../assets/logout.svg";
import MyImage from "../../components/MyImage";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const { handleLogout } = useAuth();

  return (
    <div
      onClick={handleLogout}
      className="w-full flex gap-2 justify-center items-center cursor-pointer"
    >
      <MyImage className={"w-[30px] h-[30px]"} src={logoutIcon} alt="" />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
