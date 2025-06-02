import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "chat/" + targetUserId, {
      withCredentials: true,
    });
    const chatMessages = chat.data.messages.map((msg) => {
      const { firstname, lastname } = msg.senderId;
      return {
        firstname,
        lastname,
        message: msg.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    const socket = createSocketConection(userId);
    if (!userId) {
      return;
    }
    socket.emit("joinChat", {
      firstname: user.firstname,
      userId,
      targetUserId,
    });
    socket.on("receiveMessage", ({ firstname, lastname, message }) => {
      console.log(user.firstname + ":", message);
      setMessages((messages) => [
        ...messages,
        { firstname, lastname, message },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConection(userId);
    socket.emit("sendMessage", {
      firstname: user.firstname,
      lastname: user.lastname,
      userId,
      targetUserId,
      message,
    });
  };

  console.log("targetUserId", targetUserId);
  return (
    <>
      <div className="overflow-scroll h-screen">
        {messages &&
          messages.map((msg) => (
            <div
              className={
                "chat " +
                (user.firstname === msg.firstname ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstname + " " + msg.lastname}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{msg.message}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}

        {/* <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">Hello man</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div> */}
      </div>
      <div className="flex gap-2 overflow-y-auto w-full p-4 bottom-0">
        <input
          className="bg-white rounded-full w-full p-10 font-black text-black"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
              setMessage("");
            }
          }}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;
