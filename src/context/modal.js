import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
      <ModalContext.Provider value={{
        isModalOpen,
        toggleModal
      }}
      >
        {props.children}
      </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };