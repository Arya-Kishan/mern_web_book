import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../Redux/Auth/AuthSlice";
import { MyContext } from "../../../Context/SocketContext";
import sentIcon from "../../../assets/sent.svg";
import MyImage from "../../../components/MyImage";
import dayjs from "dayjs";
import { decryptText, formatTime } from "../../../helper/customFunction";
import DeliveryStatusIcon from "../DeliveryStatusIcon";
import PopUp from "../../common/PopUp";
import imageIcon from "../../../assets/image.svg";
import videoIcon from "../../../assets/video.svg";
import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";

const SavedMessageCard = ({ e, messageBubblePress }) => {
  const [showTick, setShowTick] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const timerRef = useRef(null);
  const [isShowingMedia, setIsShowingMedia] = useState(false);
  const divRef = useRef("");
  const { globalSocket, onlineUsers } = useContext(MyContext);
  const mediaType = e.message.type ?? "text";
  const decryptMessage = decryptText(e.message.value ?? e.message);
  const boxRef = useRef(null);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      const messageData = {
        ...e,
        message: { ...e.message, value: decryptMessage },
      };
      messageBubblePress(messageData, "self");
    }, 800); // 800ms hold time
  };

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [showTick]);

  useEffect(() => {
    const container = divRef.current;
    const box = boxRef.current;

    const drag = Draggable.create(box, {
      type: "x",
      bounds: container,
      dragResistance: 0.15, // slows drag like friction
      edgeResistance: 0.8, // elastic feel near edges

      onDragEnd: function () {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)", // spring effect
        });
        const messageData = {
          ...e,
          message: { ...e.message, value: decryptMessage },
        };
        messageBubblePress(messageData, "self");
      },
    });

    return () => drag[0].kill();
  }, []);

  // console.log("each message : ", e);

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
        ref={boxRef}
        className={`min-w-[25%] max-w-[80%] h-fit ${e.sender._id == loggedInUser._id ? "bg-blue-950" : "bg-gradient-to-br from-[#000C40] via-[#001F54] to-[#00B4DB]"} flex flex-col p-2 rounded-xl ${e.sender._id == loggedInUser._id ? "rounded-br-none" : "rounded-bl-none"} gap-2 shadow-md-white overflow-hidden text-ellipsis`}
      >
        {/* <p className="text-[10px]">{e.sender.name}</p> */}

        {e.message.type != "text" ? (
          <button
            onClick={() => {
              setIsShowingMedia(true);
            }}
            className="flex justify-start items-center flex-row gap-2 bg-blue-900 rounded-md px-1"
          >
            <MyImage
              src={mediaType == "image" ? imageIcon : videoIcon}
              className={"w-[22px] h-[22px]"}
            />
            <span>View</span>
          </button>
        ) : (
          <p className="select-none">{decryptMessage}</p>
        )}

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

      {/* MEDIA */}
      <PopUp
        show={isShowingMedia}
        setShow={setIsShowingMedia}
        bg="bg-transparent"
        height="fit"
      >
        <div className="w-full h-fit flex flex-col gap-2 overflow-hidden">
          {mediaType == "image" ? (
            <MyImage
              src={decryptMessage}
              className={"w-full h-fit object-contain"}
            />
          ) : (
            <iframe
              width="100%"
              height="400"
              src={
                "https://www.kamababax.com/guy-fucks-gf-and-records-sex-mms/"
              }
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
          <div className="w-full flex gap-2 text-black bg-white items-center rounded-md">
            <p className="w-full p-2 text-[12px] text-ellipsis overflow-hidden text-nowrap">
              {decryptMessage}
            </p>
            <button
              onClick={() => {}}
              className="w-[100px] h-full px-4 py-2 bg-blue-600 text-white"
            >
              copy
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default SavedMessageCard;
