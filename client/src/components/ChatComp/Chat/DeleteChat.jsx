import React, { useState } from "react";
import { useEditUserMutation } from "../../../Redux/User/UserApi";
import { selectLoggedInUser } from "../../../Redux/Auth/AuthSlice";
import { useSelector } from "react-redux";
import MyImage from "../../MyImage";
import deleteIcon from "../../../assets/delete.svg";
import Loader from "../../Loader";

const DeleteChat = ({ chat }) => {
  const [deletLoader, setDeleteLoader] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [editUser] = useEditUserMutation();

  const handleDelete = async (opponentUserId) => {
    setDeleteLoader(true);
    const data = await editUser({
      id: loggedInUser._id,
      delete_chat: opponentUserId,
    });

    setDeleteLoader(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {deletLoader ? (
        <Loader loaderSize={20} />
      ) : (
        <MyImage
          src={deleteIcon}
          className={"w-[20px] h-[20px]"}
          onClick={() => handleDelete(chat._id)}
        />
      )}
    </div>
  );
};

export default DeleteChat;
