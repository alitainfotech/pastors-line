import React, { useState } from "react";
import ModalPage from "../Modals/Modal.page";

const MainScreen = () => {
  const [modalId, setModalId] = useState(null);

  const onModalOpen = (id, title) => {
    setModalId(id);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <button
          className="btn btn-primary m-1"
          style={{ backgroundColor: "#46139f" }}
          data-toggle="modal"
          data-target="#modalA"
          onClick={() => onModalOpen("modalA", "Modal A")}
        >
          Button A
        </button>
        {modalId === "modalA" && <ModalPage id={"modalA"} title={"Modal A"} />}

        <button
          className="btn btn-primary m-1"
          style={{ backgroundColor: "#ff7f50" }}
          data-toggle="modal"
          data-target="#modalB"
          onClick={() => onModalOpen("modalB", "Modal B")}
        >
          Button B
        </button>
        {modalId === "modalB" && <ModalPage id={"modalB"} title={"Modal B"} />}
      </div>
    </div>
  );
};

export default MainScreen;
