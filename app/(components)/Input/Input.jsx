// "use client";

import React, { useState } from "react";
import "./Input.css";

export const Input = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  // Called whenever Submit button is clicked
  const handleSubmit = () => {
    // if no input, just return
    if (!input) {
      return;
      // else pass the input value & clear the input field
    } else {
      onSubmit(input);
      setInput("");
    }
  };
  return (
    <div className="container">
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};
