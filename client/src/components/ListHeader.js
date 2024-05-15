import React from "react";
import Logo from "./Logo";
import Modal from "./Modal";

const ListHeader = ({ listName }) => {
  const signOut = () => {
    console.log("signout");
  };

  const addNew = () => {
    console.log("signout");
  };
  return (
    <div className="list-header">
      <div className="logo-name">
        <Logo />
        <h1> {listName}</h1>
      </div>
      <div className="button-container">
        <button className="create" onClick={() => addNew()}>
          ADD NEW
        </button>
        <button className="signout" onClick={() => signOut()}>
          SIGN OUT
        </button>
      </div>
      <Modal />
    </div>
  );
};

export default ListHeader;
