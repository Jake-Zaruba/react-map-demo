import React, { useState } from "react";
import "./claudeWidget.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export default function ClaudeWidget() {
  const [userText, setUserText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="widget-container">
      <HighlightOffOutlinedIcon
        style={{
          color: "#333",
          cursor: "pointer",
          position: "absolute",
          top: 5,
          right: 5,
        }}
        fontSize="large"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "3rem",
        }}
      >
        <textarea className="sent-message"></textarea>
        <textarea className="sent-message"></textarea>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <textarea className="received-message">{userText}</textarea>
        <textarea className="received-message"></textarea>
      </div>

      <input
        type="text"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        style={{
          position: "absolute",
          bottom: 10,
          height: "3rem",
          width: "90%",
          border: "1px solid #333",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}
