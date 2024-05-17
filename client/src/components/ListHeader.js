import React, { useState } from "react";
import Logo from "./Logo";
import Modal from "./Modal";

const ListHeader = ({ listName, getAlldata }) => {
  const [mymodal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("signout");
  };

  const showModal = () => {
    setShowModal(!mymodal);
  };
  return (
    <div className="list-header">
      <div className="logo-name">
        <Logo />
        <h1> {listName}</h1>
      </div>
      <div className="button-container">
        <button className="create" onClick={() => showModal()}>
          ADD NEW
        </button>
        <button className="signout" onClick={() => signOut()}>
          SIGN OUT
        </button>
      </div>
      {mymodal && (
        <Modal
          mode={"create"}
          getAllcurrentData={getAlldata}
          dismissModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ListHeader;
