import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Progress from "./Progress";
import Modal from "./Modal";
// const dotenv = require("dotenv");
// dotenv.config();
const ListItems = ({ task, getAlldata }) => {
  const [mymodal, setMymodal] = useState(false);
  const { title, id } = task;
  const shwoMycurrentModal = () => {
    setMymodal(() => !mymodal);
  };
  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Data was deleted with success");
        getAlldata();
      }
    } catch (error) {
      console.log(`Error found : ${error}`);
    }
  };
  return (
    <li className="list-item">
      <div
        className="info-container"
        style={{ display: "flex", alignItems: "center" }}
      >
        <TickIcon />
        <p className="task-title">{title}</p>
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => shwoMycurrentModal()}>
          EDIT
        </button>
        <button className="delete" onClick={() => deleteTask()}>
          DELETE
        </button>
      </div>
      {mymodal && (
        <Modal
          mode={"edit"}
          dismissModal={setMymodal}
          getAllcurrentData={getAlldata}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItems;
