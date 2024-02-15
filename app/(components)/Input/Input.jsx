// "use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
      <Button className="button" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
};
