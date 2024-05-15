import React, { useState } from "react";
import CLose from "./CLose";
const Modal = ({ mode, dismissModal }) => {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: "",
    title: "",
    progress: "",
    date: editMode ? "" : new Date(),
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setData((data) => {
      return { ...data, title: value };
    });
  };

  const handleRange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setData((data) => {
      return { ...data, progress: value };
    });
  };

  const handleSubmit = () => {
    console.log("submit data");
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task!</h3>
          <button onClick={() => dismissModal(() => false)}>
            <CLose />
          </button>
        </div>
        <form>
          <input
            required
            id="range"
            maxLength={35}
            placeholder="Please your tasks goes here"
            name="title"
            value={data.title}
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <label>Drag to select your current progress</label>
          <input
            required
            type="range"
            min={0}
            max={100}
            value={data.progress}
            onChange={(e) => handleRange(e)}
            name="progress"
          />
          <input
            className={mode}
            type="submit"
            onClick={() => handleSubmit()}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
