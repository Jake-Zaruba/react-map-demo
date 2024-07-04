import React, { useState } from "react";
import "./claudeWidget.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export default function ClaudeWidget() {
  const [userText, setUserText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [widgetOpen, setWidgetOpen] = useState(true);
  const handleCloseChatWidget = () => {
    setWidgetOpen((prev) => !prev);
  };
  function handleSubmitChat(e) {
    e.preventDefault();
    setChatHistory((prev) => [...prev, userText]);
    setUserText("");
  }

  const displayUserChats = chatHistory.map((item) => {
    return <p className="sent-message">{item}</p>;
  });

  return (
    <div
      className={widgetOpen ? "widget-container" : "closed-widget-container"}
    >
      <HighlightOffOutlinedIcon
        style={{
          color: "#333",
          cursor: "pointer",
          position: "absolute",
          top: 5,
          right: 5,
        }}
        fontSize="large"
        onClick={handleCloseChatWidget}
      />
      <div
        style={
          widgetOpen
            ? {
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "3rem",
                transitionBehavior: "allow-discrete",
              }
            : { display: "none", transitionBehavior: "allow-discrete" }
        }
      >
        {displayUserChats}
      </div>
      <div
        style={
          widgetOpen
            ? {
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "0rem",
                transitionBehavior: "allow-discrete",
              }
            : { display: "none", transitionBehavior: "allow-discrete" }
        }
      >
        <textarea className="received-message">{chatHistory}</textarea>
        <textarea className="received-message">{chatHistory}</textarea>
      </div>
      <form onSubmit={handleSubmitChat}>
        <input
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          style={
            widgetOpen
              ? {
                  position: "absolute",
                  bottom: 10,
                  height: "3rem",
                  width: "90%",
                  border: "1px solid #c0c0c0",
                  borderRadius: "6px",
                  transitionBehavior: "allow-discrete",
                }
              : { display: "none", transitionBehavior: "allow-discrete" }
          }
        />
      </form>
    </div>
  );
}
