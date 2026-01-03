import React, { useState } from "react";
import MyImage from "../MyImage";
import avatar01 from "../../assets/avatar01.svg";
import feedIcon from "../../assets/feed.svg";
import taskIcon from "../../assets/icons/taskIcon.svg";
import logoutIcon from "../../assets/logout.svg";
import doubtIcon from "../../assets/icons/doubtIcon.svg";
import mcqIcon from "../../assets/icons/mcqIcon.svg";
import bellIcon from "../../assets/icons/bell.svg";
import gameIcon from "../../assets/game.svg";
import messageIcon from "../../assets/message.svg";
import noteIcon from "../../assets/icons/noteIcon.svg";
import qnaIcon from "../../assets/icons/qnaIcon.svg";
import cancel from "../../assets/cancel.svg";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../../Redux/Auth/AuthSlice";
import useBackButton from "../../hooks/useBackButton";
import useAuth from "../../hooks/useAuth";

const BottomNavbar = () => {
  const profileOptions = [
    { name: "bell", pic: bellIcon, showOption: false, options: "" },
    { name: `profile`, pic: avatar01, showOption: false, options: "" },
    { name: "logout", pic: logoutIcon, showOption: false, options: "" },
  ];

  const featuredOptions = [
    { name: "tasks", pic: taskIcon, showOption: false, options: "" },
    { name: "notes", pic: noteIcon, showOption: false, options: "" },
    { name: "interview", pic: qnaIcon, showOption: false, options: "" },
    { name: "mcq", pic: mcqIcon, showOption: false, options: "" },
    { name: "doubt", pic: doubtIcon, showOption: false, options: "" },
  ];

  const bottomOptions = [
    { name: "games", pic: gameIcon, showOption: false, options: "" },
    { name: "mychats", pic: messageIcon, showOption: false, options: "" },
    { name: "feed", pic: feedIcon, showOption: false, options: "" },
    {
      name: "feature",
      pic: qnaIcon,
      showOption: true,
      options: featuredOptions,
    },
    {
      name: `avatar`,
      pic: avatar01,
      showOption: true,
      options: profileOptions,
    },
  ];
  const notAllowedRoutes = ["mychats", "doubt", "games", "chat"];

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(bottomOptions);
  const [selectedBottomOption, setSelectedBottomOption] = useState("feature");
  const loggedInUser = useSelector(selectLoggedInUser);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useBackButton(() => {
    setShowOptions(false);
    setSelectedBottomOption("");
  });

  const handleNavigate = (route, showOption, options) => {
    if (route == "logout") {
      handleLogout();
    }

    if (route == "profile") {
      setShowOptions(false);
      return navigate(`/home/profile/${loggedInUser._id}`);
    }

    setSelectedBottomOption(route);
    if (showOption) {
      setShowOptions(showOption);
      setOptions(options);
      return;
    }

    if (notAllowedRoutes.includes(route) && loggedInUser.name == "Guest") {
      toast.info("Please Login");
      setShowOptions(false);
    } else {
      navigate(`/home/${route}`);
      setShowOptions(false);
    }
  };

  const notToShowBottom = notAllowedRoutes.some((route) =>
    location.pathname.includes(route)
  );

  if (notToShowBottom) {
    return null;
  }

  return (
    <div className="flex md:hidden w-full h-fit bg-blue1 z-50 fixed bottom-0 left-0">
      {/* BLACK SHADOW CONES WITH LEFT BAR SLIDER */}
      <div className="w-full min-h-[70px] h-fit overflow-x-scroll flex flex-row justify-evenly items-center capitalize text-center">
        {bottomOptions.map((word, i) => (
          <div
            onClick={() =>
              handleNavigate(word.name, word.showOption, word.options)
            }
            key={i}
            className={`flex items-center justify-center p-4 ${
              selectedBottomOption === word.name ? "bg-blue3" : "bg-transparent"
            }`}
          >
            <MyImage className="w-[35px] h-[35px]" src={word.pic} alt="" />
          </div>
        ))}
      </div>

      {showOptions && (
        <div
          onClick={() => setShowOptions(false)}
          className="w-full h-[calc(100vh-70px)] fixed top-0 left-0 bg-[#00000080] flex justify-end items-end z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-fit flex flex-col justify-center items-center gap-4"
          >
            <MyImage
              onClick={() => setShowOptions(false)}
              className="w-[40px] h-[40px]"
              src={cancel}
              alt=""
            />

            <div className="w-full h-fit flex flex-col gap-2 bg-blue2">
              {options.map((word, i) => (
                <div
                  onClick={() =>
                    handleNavigate(word.name, word.showOption, word.options)
                  }
                  key={i}
                  className={`w-full flex gap-4 items-center justify-start px-5 p-2 cursor-pointer`}
                >
                  <MyImage
                    className="w-[25px] h-[25px]"
                    src={word.pic}
                    alt=""
                  />
                  <p className="tracking-wider text-[22px] sm:text-[18px] capitalize">
                    {word.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavbar;
