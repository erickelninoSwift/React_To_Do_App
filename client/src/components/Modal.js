import React, { useState } from "react";
import CLose from "./CLose";
// const dotenv = require("dotenv");
// dotenv.config();

const Modal = ({ mode, dismissModal, task, getAllcurrentData }) => {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "jackpot@yahoo.com",
    title: task ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.data : new Date(),
  });
  console.log(data);
  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Worked");
        dismissModal(() => false);
        getAllcurrentData();
      }
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Data was edited");
        dismissModal(() => false);
        getAllcurrentData();
      }
    } catch (error) {
      console.log(`Error found : ${error}`);
    }
  };

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
      return { ...data, progress: Number(value) };
    });
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
            onClick={editMode ? (e) => editData(e) : (e) => postData(e)}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
