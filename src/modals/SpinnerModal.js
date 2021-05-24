import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { LoadingOutlined } from "@ant-design/icons";
import classes from "./SpinnerModal.module.css";
import SpinnerModalContext from "../contexts/SpinnerModalContext";

function SpinnerModal() {
  const { showSpinner } = useContext(SpinnerModalContext);

  if (showSpinner) {
    return ReactDOM.createPortal(
      <div className={classes.modal_container}>
        <div className={classes.modal}>
          <LoadingOutlined
            className="text-danger"
            style={{ fontSize: "5rem" }}
          />
        </div>
      </div>,
      document.querySelector("#spinner-modal")
    );
  }
  return null;
}

export default SpinnerModal;
