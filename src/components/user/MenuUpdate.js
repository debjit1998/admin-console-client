import React, { useEffect, useState, useContext } from "react";
import UserNav from "../nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import MenuUpdateForm from "../forms/MenuUpdateForm";
import { updateMenuItem, getMenuItem } from "../../functions/menu";
import { Prompt } from "react-router-dom";
import { UpdationPopupMessage } from "../utils/utils";
import SpinnerModalContext from "../../contexts/SpinnerModalContext";

const initialState = {
  hotel_code: "",
  restaurant_id: "",
  title: "",
  available: "",
  description: "",
  item_ref_id: "",
  price: "",
  dish_type: "",
  dish_type_sequence: "",
  category: "",
  allergens: [],
  condiments: "",
  spice_level: "",
  portion: "",
  max_order_qty: "",
  jain_dish: "",
  halal_dish: "",
  signature_dish: "",
  container_type: "",
  veg_or_non_veg: "",
  prep_time_min: "",
  pdp_image_url: "",
};

function MenuUpdate({ history, match }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { showSpinnerModal, hideSpinnerModal } = useContext(
    SpinnerModalContext
  );

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getMenuItem(match.params.id, user.token)
      .then((res) => {
        setLoading(false);
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error("Something went wrong");
        }
      });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setInputChange(true);
    setIsDirty(true);
  };

  const handleAllergenChange = (value) => {
    setValues({ ...values, allergens: value });
    setInputChange(true);
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.hotel_code === "" || values.hotel_code === "Please select") {
      window.alert("Please select a hotel code");
      return;
    }
    if (
      values.restaurant_id === "" ||
      values.restaurant_id === "Please select"
    ) {
      window.alert("Please select a restaurant");
      return;
    }
    if (values.jain_dish === "" || values.jain_dish === "Please select") {
      window.alert("Please select a jain_dish flag");
      return;
    }
    if (values.halal_dish === "" || values.halal_dish === "Please select") {
      window.alert("Please select a halal_dish flag");
      return;
    }
    if (
      values.signature_dish === "" ||
      values.signature_dish === "Please select"
    ) {
      window.alert("Please select a signature flag");
      return;
    }
    if (
      values.veg_or_non_veg === "" ||
      values.veg_or_non_veg === "Please select"
    ) {
      window.alert("Please select veg or non veg");
      return;
    }
    if (
      values.container_type === "" ||
      values.container_type === "Please select"
    ) {
      window.alert("Please select a conatiner type");
      return;
    }

    if (
      (values.jain_dish === "true" || values.jain_dish === true) &&
      values.veg_or_non_veg === "Non Veg"
    ) {
      window.alert("Jain dish cannot be true for Non Veg menu items");
      return;
    }
    if (
      (values.halal_dish === "true" || values.halal_dish === true) &&
      values.veg_or_non_veg === "Veg"
    ) {
      window.alert("Halal dish cannot be true for Veg menu items");
      return;
    }
    if (
      values.jain_dish.toString() === values.halal_dish.toString() &&
      values.jain_dish.toString() === "true"
    ) {
      window.alert("Menu item cannot be both Jain dish and Halal dish");
      return;
    }
    console.log(values);

    if (
      window.confirm(UpdationPopupMessage(values, Object.keys(initialState)))
    ) {
      showSpinnerModal();
      updateMenuItem(match.params.id, values, user.token)
        .then((res) => {
          setIsDirty(false);
          setLoading(false);
          hideSpinnerModal();
          console.log(res.data);
          toast.success(`${res.data.title} successfully updated`);
          history.push("/user/menu");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          hideSpinnerModal();
          if (err.response.status === 400) {
            toast.error(err.response.data);
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10" style={{ marginTop: "50px" }}>
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <>
                <h4>Edit Menu Item</h4>
                <hr />
              </>
            )}
            <MenuUpdateForm
              handleChange={handleChange}
              handleAllergenChange={handleAllergenChange}
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
              inputChange={inputChange}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuUpdate;
