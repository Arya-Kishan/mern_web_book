import { Draggable } from "gsap/all";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import allDeleteIcon from "../../../assets/icons/chat/delete_message.svg";
import { MyContext } from "../../../Context/SocketContext";
import { getTimeAgo } from "../../../helper/customFunction";
import MyImage from "../../MyImage";
import DeletePopUp from "../../popups/DeletePopUp";
import DeleteChat from "../Chat/DeleteChat";

const ChatList = ({ e, conversationId }) => {
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const { onlineUsers, isSocketConnected } = useContext(MyContext);
  const options = [{ text: "All Messages Delete", icon: allDeleteIcon }];
  const [showDeletePop, setShowDeletePop] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const box = boxRef.current;

    const bounds = {
      minX: -60,
      maxX: 0,
    };

    const drag = Draggable.create(box, {
      type: "x",
      bounds: bounds,
      dragResistance: 0.15, // slows drag like friction
      edgeResistance: 0.8, // elastic feel near edges
      zIndexBoost: false, // prevent z-index changes
    });

    return () => drag[0].kill();
  }, []);

  console.log(e);

  return (
    <div
      className="w-full h-[60px] bg-[#ffffff16] rounded-xl relative overflow-hidden mb-2"
      ref={containerRef}
    >
      <div
        key={e._id}
        ref={boxRef}
        onClick={() => navigate(`/home/chat/${e._id}?name=${e.name}`)}
        className="w-full h-full flex justify-between items-center gap-2 bg-blue-800 rounded-xl p-2 cursor-pointer hover:bg-blue-900 z-10 absolute top-0 left-0"
      >
        <div className="flex items-center gap-2">
          <MyImage
            className={"w-[40px] h-[40px]"}
            src={`https://api.multiavatar.com/${e.name}.svg`}
          />
          <div>
            <p className="text-[20px]">{e.name}</p>
            <p className="text-[12px] h-full flex items-center opacity-[0.8]">
              {onlineUsers.includes(e._id) ? (
                <span className="text-customGreen">online</span>
              ) : (
                getTimeAgo(Number(e.online))
              )}
            </p>
          </div>
        </div>

        <DeleteChat chat={e} />
      </div>

      {/* ALL MESSAGE DELETE DRAG */}
      <div className="absolute top-0 right-0 w-fit h-full flex flex-row z-0">
        {options.map((option, i) => (
          <div
            key={i}
            onClick={() => setShowDeletePop(!showDeletePop)}
            className="w-[60px] h-full flex flex-col justify-center items-center gap-1"
          >
            <MyImage src={option.icon} className="w-[25px] h-[25px]" />
          </div>
        ))}
      </div>

      {showDeletePop && (
        <DeletePopUp
          setShow={setShowDeletePop}
          contentType="all_conversation_messages"
          id={conversationId}
        ></DeletePopUp>
      )}
    </div>
  );
};

export default ChatList;
