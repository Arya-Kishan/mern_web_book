import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../Redux/Auth/AuthSlice";
import { MyContext } from "../../../Context/SocketContext";
import sentIcon from "../../../assets/sent.svg";
import MyImage from "../../../components/MyImage";
import dayjs from "dayjs";
import { formatTime } from "../../../helper/customFunction";
import DeliveryStatusIcon from "../DeliveryStatusIcon";

const SavedMessageCard = ({ e, messageBubblePress }) => {
  const [showTick, setShowTick] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const timerRef = useRef(null);

  const divRef = useRef("");
  const { globalSocket, onlineUsers } = useContext(MyContext);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      messageBubblePress(e, "self");
    }, 800); // 800ms hold time
  };

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    globalSocket.on(
      "receiver-received-message",
      ({ sender, receiver, message }) => {
        if (message.value == e.message.value) {
          setShowTick(true);
        }
      },
    );
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [showTick]);

  return (
    <div
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      ref={divRef}
      className={`w-full flex ${e.sender._id == loggedInUser._id ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`min-w-[25%] max-w-[80%] h-fit ${e.sender._id == loggedInUser._id ? "bg-blue-950" : "bg-blue-600"} flex flex-col p-2 rounded-xl ${e.sender._id == loggedInUser._id ? "rounded-br-none" : "rounded-bl-none"} gap-2 shadow-md-white`}
      >
        {/* <p className="text-[10px]">{e.sender.name}</p> */}
        <p>{e.message?.value ?? e.message}</p>
        <div className="w-full h-[10px] flex justify-end text-[10px] items-center gap-1">
          {formatTime(e?.createdAt)}
          {e.sender._id == loggedInUser._id && (
            <DeliveryStatusIcon
              status={
                e.deliveredAt ? "delivered" : e.createdAt ? "sent" : "sending"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedMessageCard;
