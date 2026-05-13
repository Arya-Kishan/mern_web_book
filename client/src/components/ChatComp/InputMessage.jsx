import React, { useContext, useEffect, useRef, useState } from "react";
import MyImage from "../MyImage";
import sendIcon from "../../assets/send.svg";
import { MyContext } from "../../Context/SocketContext";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../Redux/Auth/AuthSlice";

const InputMessage = ({ onSend = () => {}, clearMessages, opponent }) => {
  const inputRef = useRef("");
  const typingTimeout = useRef(null);
  const isTyping = useRef(false);
  const { globalSocket, onlineUsers } = useContext(MyContext);
  const loggedInUser = useSelector(selectLoggedInUser);

  const handleChange = (e) => {
    // Send "typing" only once
    if (!isTyping.current) {
      isTyping.current = true;
      globalSocket.emit("typing", {
        sender: { _id: loggedInUser._id, name: loggedInUser.name },
        receiver: { _id: opponent.opponentUserId, name: opponent.opponentName },
        isWriting: true,
      });
    }

    // Reset timeout on every key press
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      globalSocket.emit("typing", {
        sender: { _id: loggedInUser._id, name: loggedInUser.name },
        receiver: { _id: opponent.opponentUserId, name: opponent.opponentName },
        isWriting: false,
      });
      isTyping.current = false; // reset typing state
    }, 1000);
  };

  const handleSend = () => {
    onSend(inputRef.current.value);
  };

  useEffect(() => {
    inputRef.current.value = "";
  }, [clearMessages]);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full h-[50px] bg-transparent flex items-center justify-between border-2 rounded-[20px] p-2">
      <input
        ref={inputRef}
        onKeyUp={handleEnter}
        onChange={handleChange}
        type="text"
        className="w-full h-full text-[16px] bg-transparent"
        placeholder="write your message ..."
      />
      <MyImage
        src={sendIcon}
        className={"w-[30px] h-[30px]"}
        onClick={handleSend}
        imageClass="-rotate-45 p-[2px]"
      />
    </div>
  );
};

export default InputMessage;
