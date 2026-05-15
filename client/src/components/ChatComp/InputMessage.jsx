import React, { useContext, useEffect, useRef, useState } from "react";
import MyImage from "../MyImage";
import sendIcon from "../../assets/send.svg";
import { MyContext } from "../../Context/SocketContext";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../Redux/Auth/AuthSlice";
import addIcon from "../../assets/add.svg";
import gsap from "gsap";
import checkIcon from "../../assets/check.svg";
import cancelIcon from "../../assets/cancel.svg";
import { decryptText, encryptText } from "../../helper/customFunction";

const InputMessage = ({ onSend = () => {}, clearMessages, opponent }) => {
  const inputRef = useRef("");
  const typingTimeout = useRef(null);
  const isTyping = useRef(false);
  const { globalSocket, onlineUsers } = useContext(MyContext);
  const loggedInUser = useSelector(selectLoggedInUser);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const tweenRef = useRef(null);
  const iconRef = useRef(null);
  const mediaType = ["video", "image"];
  const [isShowingMediaOptions, setiSShowingMediaOptions] = useState(false);
  const [showsendIcon, setShowsendIcon] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState("text");

  const handleChange = (e) => {
    // Send "typing" only once
    if (e.target.value.length > 0) {
      setShowsendIcon(true);
    } else {
      setShowsendIcon(false);
    }
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
    const inputValue = encryptText(inputRef.current.value);
    onSend(inputValue, selectedMediaType);
    setShowsendIcon(false);
  };

  const handleMove = () => {
    // kill previous animation (important)
    if (tweenRef.current) tweenRef.current.kill();

    if (isShowingMediaOptions) {
      tweenRef.current = gsap.timeline();
      tweenRef.current
        .to(
          boxRef2.current,
          {
            bottom: "-100%",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "a",
        )
        .to(
          iconRef.current,
          {
            rotate: 0,
            duration: 0.5,
            ease: "elastic.out",
          },
          "a",
        )
        .to(boxRef1.current, {
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(boxRef1.current, {
          bottom: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        });
    } else {
      tweenRef.current = gsap.timeline();
      tweenRef.current
        .to(boxRef1.current, {
          bottom: "100%",
          duration: 0.1,
          ease: "power2.inOut",
        })
        .to(boxRef1.current, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(
          boxRef2.current,
          {
            bottom: "0%",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "a",
        )
        .to(
          iconRef.current,
          {
            rotate: 135,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "a",
        );
    }

    setSelectedMediaType(isShowingMediaOptions ? "text" : "image");
    setiSShowingMediaOptions(!isShowingMediaOptions);
  };

  useEffect(() => {
    inputRef.current.value = "";

    return () => {
      // cleanup when component unmounts
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [clearMessages]);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full h-fit max-h-fit flex flex-col relative">
      {/* main input send icons */}
      <div className="w-full h-fit flex flex-row justify-center items-center gap-2 z-20">
        <div className="w-full h-[50px] bg-transparent flex items-center justify-between border-2 rounded-[20px] p-2">
          <input
            ref={inputRef}
            onKeyUp={handleEnter}
            onChange={handleChange}
            type="text"
            className="w-full h-full text-[16px] bg-transparent"
            placeholder={`${isShowingMediaOptions ? "Paste Url..." : "Write a message..."}`}
          />
          {showsendIcon ? (
            <MyImage
              src={sendIcon}
              className={"w-[35px] h-[35px]"}
              onClick={handleSend}
              imageClass="-rotate-45 p-[2px]"
            />
          ) : (
            <div ref={iconRef}>
              <MyImage
                src={addIcon}
                className={"w-[35px] h-[35px]"}
                onClick={handleMove}
              />
            </div>
          )}
        </div>
      </div>

      {/* MEDIA TYPE ANIMATION */}
      <div
        className="absolute bottom-0 left-0 w-full h-[55px] opacity-0 overflow-hidden"
        ref={boxRef1}
      >
        <div
          ref={boxRef2}
          className="w-full h-full flex flex-row justify-center items-center gap-2 z-10 absolute -bottom-full left-0 pb-[5px]"
        >
          {mediaType.map((type, i) => (
            <div
              onClick={() => setSelectedMediaType(type)}
              key={i}
              className="w-full h-full bg-[#004e92] flex justify-between items-center rounded-[20px] p-2 gap-2"
            >
              <span className="capitalize text-[18px] font-[400] tracking-wider">
                {type}
              </span>
              <div>
                {selectedMediaType == type && (
                  <MyImage src={checkIcon} className={"w-[25px] h-[25px]"} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
