import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import hamIcon from "../../assets/add.svg";
import ChatList from "../../components/ChatComp/MyChats/ChatList";
import Error from "../../components/Error";
import SearchUser from "../../components/FeedComp/SearchUser";
import Loader from "../../components/Loader";
import MyImage from "../../components/MyImage";
import { MyContext } from "../../Context/SocketContext";
import { selectLoggedInUser } from "../../Redux/Auth/AuthSlice";
import { useGetUserChatListQuery } from "../../Redux/Chat/chatApi";
import {
  useEditUserMutation,
  useGetSingleUserQuery,
} from "../../Redux/User/UserApi";

const MyChats = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const [show, setShow] = useState(false);
  const { onlineUsers, isSocketConnected } = useContext(MyContext);

  const { data: user, isLoading } = useGetSingleUserQuery(loggedInUser._id);
  const [editUser] = useEditUserMutation();
  const { data: chatLists, isLoading: isChatListsLoading } =
    useGetUserChatListQuery(loggedInUser._id);

  const getConversationId = (userId) => {
    const conversationId = chatLists?.find((item) => {
      const participant = item.participants.find(
        (p) => p._id !== loggedInUser._id,
      );
      return participant?._id === userId;
    })?._id;
    console.log("con di", conversationId);
    return conversationId;
  };

  if (isSocketConnected == "errorInConnecting") {
    return <Error text="Service Not Available - Try Again" />;
  }

  return isSocketConnected == "connecting" ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        <p className="text-[30px]">Chat</p>
        <MyImage
          onClick={() => setShow(!show)}
          src={hamIcon}
          className="w-[30px] h-[30px]"
          alt="icon"
        />
      </div>

      <div className="w-full h-full flex flex-col gap-2 mobileBottomPadding">
        {!user ? (
          <Loader />
        ) : user.mychats.length < 1 ? (
          <div className="w-full h-full flex justify-center items-center">
            NO CHATS
          </div>
        ) : (
          user?.mychats?.map((e, i) => (
            <ChatList
              key={e._id}
              e={e}
              conversationId={getConversationId(e._id)}
            />
          ))
        )}
      </div>

      <SearchUser show={show} setShow={setShow} />
    </div>
  );
};

export default MyChats;
