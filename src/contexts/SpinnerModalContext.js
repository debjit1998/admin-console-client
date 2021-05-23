import { createContext, useState } from "react";

const SpinnerModalContext = createContext();

export const SpinnerModalProvider = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  function showSpinnerModal() {
    setShowSpinner(true);
  }
  function hideSpinnerModal() {
    setShowSpinner(false);
  }

  const value = {
    showSpinner,
    showSpinnerModal,
    hideSpinnerModal,
  };
  return (
    <SpinnerModalContext.Provider value={value}>
      {children}
    </SpinnerModalContext.Provider>
  );
};

export default SpinnerModalContext;
