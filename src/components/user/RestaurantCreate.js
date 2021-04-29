import React, { useState } from "react";
import UserNav from "../nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addRestaurant } from "../../functions/hotels";
import { Prompt } from "react-router-dom";
import RestaurantCreateForm from "../forms/RestaurantCreateForm";
import { CreationPopupMessage } from "../utils/utils";

const initialState = {
  name: "",
  description: "",
  average_price_for_2_people: "",
  category: "",
  theme: "",
  hotel_code: "",
  home_page_card_img_url: "",
  restaurant_details_img_url: "",
  lunch_slot_open: "",
  lunch_slot_close: "",
  dinner_slot_open: "",
  dinner_slot_close: "",
};

function RestaurantCreate({ history }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const hotels = user.hotels;

  const handleChange = (e) => {
    setIsDirty(true);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (values.hotel_code === "" || values.hotel_code === "Please select") {
      window.alert("Please select a hotel code");
      return;
    }
    if (values.category === "" || values.category === "Please select") {
      window.alert("Please select a category");
      return;
    }
    if (!values.lunch_slot_open.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/)) {
      window.alert(
        "Lunch slot open format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (!values.lunch_slot_close.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/)) {
      window.alert(
        "Lunch slot close format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (
      !values.dinner_slot_open.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/) &&
      !values.dinner_slot_open === ""
    ) {
      window.alert(
        "Dinner slot open format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (
      !values.dinner_slot_close.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/) &&
      !values.dinner_slot_close === ""
    ) {
      window.alert(
        "Dinner slot close format is incorrect. Please follow the format shown in the example"
      );
      return;
    }

    if (window.confirm(CreationPopupMessage(values))) {
      setLoading(true);
      addRestaurant(values, user.token)
        .then((res) => {
          setIsDirty(false);
          console.log(res);
          setLoading(false);
          toast.success(`"${res.data.name}" added!`);
          history.push("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error("Something went wrong");
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
            <RestaurantCreateForm
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              hotels={hotels}
              values={values}
            />
          </div>
        </div>
      </div>
      <Prompt when={isDirty} message={"Do you want to discard your changes?"} />
    </>
  );
}

export default RestaurantCreate;
