import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Progress from "./Progress";
import Modal from "./Modal";
const ListItems = ({ task }) => {
  const [mymodal, setMymodal] = useState(false);
  const { data, progress, title, user_email } = task;
  const showModal = () => {
    setMymodal(!mymodal);
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
        <button className="edit" onClick={() => showModal()}>
          EDIT
        </button>
        <button className="delete">DELETE</button>
      </div>
      {mymodal && <Modal mode={"edit"} dismissModal={setMymodal} task={task} />}
    </li>
  );
};

export default ListItems;
