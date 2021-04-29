import React, { useState } from "react";
import UserNav from "../nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { addOffer } from "../../functions/offer";
import { Prompt } from "react-router-dom";
import { CreationPopupMessage } from "../utils/utils";

const { TextArea } = Input;

const initialState = {
  promotion_name: "",
  promotion_code: "",
  short_description: "",
  full_description: "",
  promotion_type: "DISCOUNT",
  is_valid_from: "",
  is_valid_till: "",
  usage_limit_for_single_card: "Infinite",
  terms_and_condition: "",
  sharing_status: "INSERT",
  offer_type: "",
  usage_limit_for_promo: "Infinite",
  usage_limit_for_single_user: "Infinite",
};

function OfferCreate({ history }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const handleChange = (e) => {
    setIsDirty(true);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.offer_type === "" || values.offer_type === "Please select") {
      window.alert("Please select a offer type");
      setLoading(false);
      return;
    }

    console.log(values);
    if (window.confirm(CreationPopupMessage(values))) {
      setLoading(true);
      addOffer(values, user.token)
        .then((res) => {
          setIsDirty(false);
          setLoading(false);
          toast.success(`${res.data.promotion_name} has been added`);
          history.push("/user/offers");
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
            <form onSubmit={handleSubmit}>
              {loading ? (
                <LoadingOutlined className="h1 text-danger" />
              ) : (
                <>
                  <h4>Add New Offer</h4>
                  <hr />
                </>
              )}
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>
                      Promotion Name{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="promotion_name"
                    className="form-control"
                    value={values.promotion_name}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    autoFocus
                  />
                </div>
                <div className="col">
                  <label>
                    <b>
                      Promotion Code{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="promotion_code"
                    className="form-control"
                    value={values.promotion_code}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>
                      Short Description{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="short_description"
                    className="form-control"
                    value={values.short_description}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col">
                  <label>
                    <b>
                      Full Description{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="full_description"
                    className="form-control"
                    value={values.full_description}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>
                      Is Valid From{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="date"
                    name="is_valid_from"
                    className="form-control"
                    value={values.is_valid_from}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col">
                  <label>
                    <b>
                      Is Valid Till{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="date"
                    name="is_valid_till"
                    className="form-control"
                    value={values.is_valid_till}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>
                      Offer Type{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <select
                    name="offer_type"
                    className="form-control"
                    onChange={handleChange}
                    required
                  >
                    <option>Please select</option>
                    <option value="BANK">BANK</option>
                    <option value="TSSS">TSSS</option>
                  </select>
                </div>
                <div className="col">
                  <label>
                    <b>
                      Sharing Status{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="sharing_status"
                    className="form-control"
                    value={values.sharing_status}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>
                      Usage Limit for Promo{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="usage_limit_for_promo"
                    className="form-control"
                    value={values.usage_limit_for_promo}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col">
                  <label>
                    <b>
                      Usage Limit for Single Card{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="usage_limit_for_single_card"
                    className="form-control"
                    value={values.usage_limit_for_single_card}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col">
                  <label>
                    <b>
                      Usage Limit for Single User{" "}
                      <h5
                        style={{
                          display: "inline-block",
                          color: "red",
                          marginBottom: "0px",
                        }}
                      >
                        *
                      </h5>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="usage_limit_for_single_user"
                    className="form-control"
                    value={values.usage_limit_for_single_user}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>Terms and Conditions</b> (Press enter to go to next line){" "}
                    <h5
                      style={{
                        display: "inline-block",
                        color: "red",
                        marginBottom: "0px",
                      }}
                    >
                      *
                    </h5>
                  </label>
                  <TextArea
                    name="terms_and_condition"
                    onChange={handleChange}
                    value={values.terms_and_condition}
                    autoSize
                    required
                    className="mt-2"
                  />
                </div>
              </div>
              <br />
              <button className="btn btn-outline-info" disabled={loading}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <Prompt when={isDirty} message={"Do you want to discard your changes?"} />
    </>
  );
}

export default OfferCreate;
