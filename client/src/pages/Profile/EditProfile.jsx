import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import emailIcon from "../../assets/icons/email.svg";
import personalIcon from "../../assets/personal.svg";
import LoaderButton from "../../components/Button/LoaderButton";
import MyImage from "../../components/MyImage";
import {
  selectLoggedInUser,
  setLoggedInUser,
} from "../../Redux/Auth/AuthSlice";
import { useEditUserMutation } from "../../Redux/User/UserApi";

const EditProfile = ({ showEditProfile, setShowEditProfile }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const [editLoader, setEditLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: loggedInUser.name,
      email: loggedInUser.email,
      userName: loggedInUser.userName,
      bio: loggedInUser.bio,
    },
  });
  const [editUser] = useEditUserMutation();

  const onSubmit = async (data) => {
    try {
      setEditLoader(true);
      let updatedUser = {
        bio: data.bio,
        userName: data.userName,
        profilePic: "",
        id: loggedInUser._id,
      };
      const { data: updatedData } = await editUser(updatedUser);
      if (updatedData.message == "Success") {
        dispatch(setLoggedInUser(updatedUser));
      }
      setEditLoader(false);
      setShowEditProfile(false);
    } catch (err) {
      setEditLoader(false);
      setShowEditProfile(false);
    }
  };

  if (!showEditProfile) {
    return null;
  }

  return (
    <div
      onClick={() => setShowEditProfile(false)}
      className="w-full h-full fixed top-0 left-0 bg-bgOpacity flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] min-h-1/2 bg-blue5 flex flex-col gap-8 justify-center items-center p-5 rounded-lg"
      >
        <p className="text-3xl font-bold">Edit User</p>

        <form
          className="w-[80%] flex flex-col gap-6 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* NAME */}
          <div className="w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2">
            <MyImage
              src={personalIcon}
              alt="icon"
              className={"w-[30px] h-[30px]"}
            />
            <input
              className="w-full p-2 rounded-lg text-customGreen font-semibold"
              {...register("name", { required: true })}
              placeholder="Name..."
              disabled={true}
            />
          </div>
          {errors.name && <p className="text-red-600">Name is required.</p>}

          {/* EMAIL */}
          <div className="w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2 text-customGreen font-semibold">
            <MyImage
              src={emailIcon}
              alt="icon"
              className={"w-[30px] h-[30px]"}
            />
            <input
              className="w-full p-2 rounded-lg"
              {...register("email", { required: true })}
              placeholder="Gmail..."
              disabled={true}
            />
          </div>
          {errors.email && <p className="text-red-600">Email is required.</p>}

          {/* USERNAME */}
          <div className="w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2 text-black">
            <MyImage
              src={personalIcon}
              alt="icon"
              className={"w-[30px] h-[30px]"}
            />
            <input
              className="w-full p-2 rounded-lg"
              {...register("userName", { required: true })}
              placeholder="Username..."
            />
          </div>
          {errors.username && (
            <p className="text-red-400">Username is required.</p>
          )}

          {/* BIO */}
          <div className="w-full bg-white rounded-lg px-2 flex items-center justify-start gap-2 text-black">
            <MyImage
              src={personalIcon}
              alt="icon"
              className={"w-[30px] h-[30px]"}
            />
            <input
              className="w-full p-2 rounded-lg"
              {...register("bio", { required: true })}
              placeholder="Bio..."
            />
          </div>
          {errors.bio && <p className="text-red-400">Bio is required.</p>}

          <div className="text-bgBackground font-semibold relative">
            <LoaderButton
              width={"100%"}
              text={"Update"}
              bgColor="bg-[#75F94C]"
              loading={editLoader}
              loaderColor={"#0A0A46"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
