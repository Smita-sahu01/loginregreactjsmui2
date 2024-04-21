import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { deepOrange, deepPurple } from "@mui/material/colors";
import { BsFillSendFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const messageContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    setLoading(true);
    setError(null);
    try {
    
      const response = await axios.post("http://127.0.0.1:8000/api/user/chatbot/", {
        user_input: input,
      });
  
      const newMessage = { from: "bot", message: response.data.response };
      setMessages([...messages, { from: "user", message: input }, newMessage]);
      setHistory([...history, input]);
      setInput("");
      console.log(response.data)
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-screen flex flex-row flex-wrap justify-center items-center ">
      <div
        name="History"
        className="w-1/4 h-screen  px-2 border border-black overflow-y-auto "
        style={{ scrollbarWidth: "thin", msOverflowStyle: "scrollbar" }}
        >
        <div className="w-full px-5 py-2 sticky  bg-orange-400 top-0 left-0 z-10 flex flex-row items-center justify-between">
           

            <div><h1>New Chat</h1></div>
             <div> <FaCircleUser /></div>

        </div>
        <div className="">
         {history.slice().reverse().map((message, index) => (
          <div key={index} className="bg-white p-2 rounded-lg">
            {message}
          </div>
         ))}
        </div>
      </div>
      <div
        name="chat-container"
        className="w-3/4 h-screen flex flex-col overflow-hidden pl-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="p-1 z-10 text-sm font-bold">
            <h1>CHAT BOT</h1>
        </div>
        <div
          name="message-container"
          ref={messageContainerRef}
          className="flex-grow overflow-y-auto p-4"
          style={{ scrollbarWidth: "thin", msOverflowStyle: "scrollbar" }}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                Name={`message ${message.from === "bot" ? "bot" : "user"} my-2`}
                className="flex flex-row justify-start gap-3 mb-2 mt-1"
              >
                <div>
                  <Avatar
                    className=""
                    sx={{
                      bgcolor:
                        message.from === "bot"
                          ? deepOrange[500]
                          : deepPurple[500],
                    }}
                  >
                    {message.from === "bot" ? (
                      <div className="text-sm">AI</div>
                    ) : (
                      <div className="text-sm">You</div>
                    )}
                  </Avatar>
                </div>
                <div className="text text-left mt-1">
                  <span>{message.message}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center text-2xl mt-[10rem] mr-20 ml-10">
              Welcome! Start a conversation.
              <div className="mt-10 grid grid-cols-2">
                    <div className="p-3 m-1 text-black text-left shadow-xl">
                        <h1 className="text-sm font-semibold">Write an email</h1>
                        <p className="text-sm font-thin">Express your love towards parent</p>
                    </div>

                    <div className="p-3 m-1 text-black text-left shadow-xl">
                        <h1 className="text-sm font-semibold">Help me Debug</h1>
                        <p className="text-sm font-thin">A linked list problem</p>
                    </div>  

                    <div className="p-3 m-1 text-black text-left shadow-xl">
                        <h1 className="text-sm font-semibold">Prepare a presentation</h1>
                        <p className="text-sm font-thin">For my final academic project</p>
                    </div> 

                    <div className="p-3 m-1 text-black text-left shadow-xl">
                        <h1 className="text-sm font-semibold">Plan a trip</h1>
                        <p className="text-sm font-thin">to experence a seuol like local</p>
                    </div> 
                </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        {loading && <div className="mr-20"> <Box sx={{ width: '100%' }}>
                    <LinearProgress /> </Box></div>}
        {error && <div>{error}</div>}
        <div className="flex flex-wrap w-full mb-10 mt-2 relative ">
          <input
           type="text"
            className="p-2 w-[40rem] rounded-lg border border-black focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="text-xl absolute ml-[38rem] mt-2 mr-3">
          <button onClick={sendMessage} >
               <BsFillSendFill />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;