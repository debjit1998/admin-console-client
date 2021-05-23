import React from "react";
import ReactDOM from "react-dom";
import { LoadingOutlined } from "@ant-design/icons";
import classes from "./SpinnerModal.module.css";

function SpinnerModal({ showSpinner }) {
  if (showSpinner) {
    return ReactDOM.createPortal(
      <div className={classes.modal_container}>
        <div className={classes.modal}>
          <LoadingOutlined />
        </div>
      </div>,
      document.querySelector("#spinner-modal")
    );
  }
  return null;
}

export default SpinnerModal;
