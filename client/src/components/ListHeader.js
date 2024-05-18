import React, { useState } from "react";
import Logo from "./Logo";
import Modal from "./Modal";
import { useCookies } from "react-cookie";
const ListHeader = ({ listName, getAlldata }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [mymodal, setShowModal] = useState(false);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
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
