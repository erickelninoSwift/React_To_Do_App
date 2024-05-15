import React from "react";
import TickIcon from "./TickIcon";
import Progress from "./Progress";
const ListItems = ({ task }) => {
  const { data, progress, title, user_email } = task;
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
        <button className="edit">EDIT</button>
        <button className="delete">DELETE</button>
      </div>
      {/* <Progress /> */}
    </li>
  );
};

export default ListItems;
