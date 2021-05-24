import React, { useState, useContext } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import noimage from "../../images/noimage.png";
import {
  updateFestiveBanner,
  removeFestiveBanner,
} from "../../functions/festivalbanner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerModalContext from "../../contexts/SpinnerModalContext";

function FestiveBanners({ b, loadAllBanners }) {
  const [values, setValues] = useState(b);
  const [modalBanner, setModalBanner] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { showSpinnerModal, hideSpinnerModal } = useContext(
    SpinnerModalContext
  );

  const { user } = useSelector((state) => ({ ...state }));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (m) => {
    setIsModalVisible(true);
    console.log("clicked");
    setModalBanner(m);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemove = (id, festival_name) => {
    if (user.role !== "admin") {
      window.alert("Sorry you have user role and cannot delete this banner");
      return;
    }
    if (
      window.confirm(
        `Do you want to delete ${b.festival_name} - ${b.restaurant_name} - ${b.hotel_code}`
      )
    ) {
      showSpinnerModal();
      removeFestiveBanner(id, festival_name, user.token)
        .then((res) => {
          hideSpinnerModal();
          toast.success("Banner deleted successfully");
          loadAllBanners();
        })
        .catch((err) => {
          hideSpinnerModal();
          toast.error("Something went wrong");
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(values);
    setDisabled(true);
    showSpinnerModal();
    updateFestiveBanner(values, user.token)
      .then((res) => {
        toast.success("Banner updated successfuly");
        setIsModalVisible(false);
        hideSpinnerModal();
        setDisabled(false);
        loadAllBanners();
      })
      .catch((err) => {
        setDisabled(false);
        hideSpinnerModal();
        toast.error("Something went wrong!");
      });
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        Modal
        title={`${modalBanner.festival_name}    -    ${modalBanner.restaurant_name}   -    ${modalBanner.hotel_code}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div className="row" style={{ display: "flex", alignItems: "center" }}>
          <div className="col-md-4">
            <img
              src={
                modalBanner.banner_url !== "" ? modalBanner.banner_url : noimage
              }
              alt="Banner"
              style={{ height: "100px", width: "auto" }}
            />
          </div>
          <div className="col-md-8">
            <form className="form-group" onSubmit={handleUpdate}>
              <label className="mt-3">
                <b>Festival Description </b>
              </label>
              <input
                type="text"
                name="festival_description"
                className="form-control"
                value={values.festival_description}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <label className="mt-3">
                <b>Start Date </b>
              </label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                value={values.start_date}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <label className="mt-3">
                <b>End Date </b>
              </label>
              <input
                type="date"
                name="end_date"
                className="form-control"
                value={values.end_date}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <label className="mt-3">
                <b>Banner URL </b>
              </label>
              <input
                type="text"
                name="banner_url"
                className="form-control"
                value={values.banner_url}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <br />
              <button
                className="btn btn-primary btn-raised btn-block"
                type="submit"
                disabled={disabled}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <div className="alert alert-success">
        <div
          onClick={() => showModal(b)}
          style={{
            display: "inline-block",
            width: "85%",
            height: "100%",
          }}
        >
          <b>{b.festival_id}</b> ({b.hotel_code} - {b.restaurant_name})
        </div>
        <span className="float-right">
          <DeleteOutlined
            className="text-danger btn btn-outline p-1 ml-2"
            onClick={() => handleRemove(b.id, b.festival_name)}
            title="Delete"
          />
        </span>
      </div>
    </>
  );
}

export default FestiveBanners;
