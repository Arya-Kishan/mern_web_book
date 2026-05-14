import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../Redux/Auth/AuthSlice";
import { useParams } from "react-router-dom";
import { MyContext } from "../../../Context/SocketContext";
import { toast } from "react-toastify";
import InputMessage from "../InputMessage";
import SavedMessageCard from "./SavedMessageCard";
import {
  useAddMessageMutation,
  useGetConversationQuery,
} from "../../../Redux/Chat/chatApi";
import FloatingItem from "../FloatingItem";
import { encryptText, getRandomNumber } from "../../../helper/customFunction";
import debounce from "lodash.debounce";
import MyImage from "../../MyImage";
import loader_typing from "../../../assets/icons/chat/loader_typing.svg";

const SaveMessage = () => {
  const [messages, setMessages] = useState([]);
  const [clearMessages, setClearMessages] = useState(false);
  const [items, setItems] = useState([]);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const params = useParams();
  const opponentUserId = params.userId;
  const searchParams = new URLSearchParams(location.search);
  const opponentName = searchParams.get("name");

  const { globalSocket, onlineUsers } = useContext(MyContext);
  const { data, isLoading } = useGetConversationQuery({
    sender: loggedInUser._id,
    receiver: opponentUserId,
  });
  const [addMessage] = useAddMessageMutation();

  const handleSend = (input, mediaType = "text") => {
    if (input.length < 1) {
      return toast("Write Message");
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: { _id: loggedInUser._id, name: loggedInUser.name },
        receiver: { _id: opponentUserId, name: opponentName },
        message: { type: mediaType, value: input },
      },
    ]);

    // SENDING MESSAGE
    globalSocket.emit("send-message", {
      sender: { _id: loggedInUser._id, name: loggedInUser.name },
      receiver: { _id: opponentUserId, name: opponentName },
      message: { type: mediaType, value: input },
    });

    addMessage({
      sender: loggedInUser._id,
      receiver: opponentUserId,
      message: {
        type: mediaType,
        value: input,
      },
    });

    // USED FOR CLEANING INPUT
    setClearMessages(!clearMessages);
  };

  const messageBubblePress = (item, from = "self") => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: item.message.value,
        leftPos: getRandomNumber({
          min: 20,
          max: window.innerWidth * 0.8,
        }),
      },
    ]);
    if (from === "socket") return;
    const isOwnMesssage = loggedInUser?._id === item.sender._id;
    globalSocket.emit("bubble-emit", {
      receiver: isOwnMesssage ? item.receiver : item.sender,
      sender: isOwnMesssage ? item.sender : item.receiver,
      message: item.message,
    });
  };

  const handleDebounceDeleteBubble = useMemo(
    () =>
      debounce((item) => {
        setItems((prev) => []);
      }, 5000),
    [],
  );

  useEffect(() => {
    globalSocket.on("bubble-listen", (data) => {
      messageBubblePress(data, "socket");
    });

    return () => {
      globalSocket?.off("bubble-listen");
    };
  }, []);

  useEffect(() => {
    // RECEIVING MESSAGE
    globalSocket.on(
      "receive-message",
      ({ sender, receiver, message, createdAt, deliveredAt }) => {
        setMessages((prev) => [
          ...prev,
          { sender, receiver, message, createdAt, deliveredAt },
        ]);
      },
    );

    globalSocket.on("message-status", (data) => {
      const { messageData } = data;
      setMessages((prev) => {
        const updatedMessageStatus = prev.map((item) => {
          if (item.message.value === messageData.message.value) {
            return messageData;
          }
          return item;
        });
        return updatedMessageStatus;
      });
    });

    globalSocket.on("typing", (data) => {
      const { messageData } = data;
      setIsOpponentTyping(data.isWriting);
    });

    return () => {
      globalSocket?.off("receive-message");
      globalSocket?.off("message-status");
      globalSocket?.off("typing");
    };
  }, []);

  useEffect(() => {
    setMessages(data?.messages ?? []);
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-fit sm:h-[calc(100dvh-65px)] md:h-[calc(100dvh-120px)] overflow-scroll flex flex-wrap justify-start items-start gap-1 pt-2">
        {/* CHAT SECTION */}
        <div className="w-full h-[calc(100dvh-127px)] md:h-[calc(100dvh-182px)] flex flex-col gap-2 overflow-scroll">
          {!isLoading ? (
            messages?.length > 0 ? (
              messages?.map((e, i) => (
                <SavedMessageCard
                  key={i}
                  e={e}
                  messageBubblePress={messageBubblePress}
                />
              ))
            ) : (
              <div className="w-full h-full text-[10px] flex justify-center items-center opacity-[0.2]">
                NO MESSAGES
              </div>
            )
          ) : (
            <div className="w-full h-full text-[10px] flex justify-center items-center opacity-[0.2]">
              Getting Messages...
            </div>
          )}
        </div>

        {isOpponentTyping && (
          <div>
            <MyImage className={"w-8 h-8"} src={loader_typing} />
          </div>
        )}

        {/* INPUT SECTION */}
        <InputMessage
          onSend={handleSend}
          clearMessages={clearMessages}
          opponent={{ opponentName, opponentUserId }}
        />

        {/* /BUBBLE FEATURE */}
        {items.map((item) => (
          <FloatingItem
            item={item}
            onFinish={() => {
              handleDebounceDeleteBubble(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SaveMessage;
