import React, { useState, useEffect } from "react";
import UserNav from "../nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { getOffer, updateOffer } from "../../functions/offer";
import { Prompt } from "react-router-dom";
import { UpdationPopupMessage } from "../utils/utils";

const { TextArea } = Input;

const initialState = {
  promotion_name: "",
  promotion_code: "",
  short_description: "",
  full_description: "",
  promotion_type: "",
  is_valid_from: "",
  is_valid_till: "",
  usage_limit_for_single_card: "",
  terms_and_condition: "",
  sharing_status: "",
  offer_type: "",
  usage_limit_for_promo: "",
  usage_limit_for_single_user: "",
};

function OfferUpdate({ match, history }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getOffer(match.params.id, user.token)
      .then((res) => {
        setLoading(false);
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  }, [match.params.id, user.token]);

  const handleChange = (e) => {
    setInputChange(true);
    setIsDirty(true);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      window.confirm(UpdationPopupMessage(values, Object.keys(initialState)))
    ) {
      setLoading(true);
      updateOffer(values.id, values, user.token)
        .then((res) => {
          setIsDirty(false);
          setLoading(false);
          toast.success(`${res.data.promotion_name} has been updated`);
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
                <h4>Edit Offer</h4>
              )}
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>Promotion Name</b>
                  </label>
                  <input
                    type="text"
                    name="promotion_name"
                    className="form-control"
                    value={values.promotion_name}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    disabled
                  />
                </div>
                <div className="col">
                  <label>
                    <b>Promotion Code</b>
                  </label>
                  <input
                    type="text"
                    name="promotion_code"
                    className="form-control"
                    value={values.promotion_code}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label>
                    <b>Short Description</b>
                  </label>
                  <input
                    type="text"
                    name="short_description"
                    className="form-control"
                    value={values.short_description}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    autoFocus
                  />
                </div>
                <div className="col">
                  <label>
                    <b>Full Description</b>
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
                    <b>Is Valid From</b>
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
                    <b>Is Valid Till</b>
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
                    <b>Offer Type</b>
                  </label>
                  <select
                    name="offer_type"
                    className="form-control"
                    onChange={handleChange}
                    value={values.offer_type}
                    required
                  >
                    <option value="TIC">TIC</option>
                    <option value="BANK">BANK</option>
                    <option value="TSSS">TSSS</option>
                  </select>
                </div>
                <div className="col">
                  <label>
                    <b>Sharing Status</b>
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
                    <b>Usage Limit for Promo</b>
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
                    <b>Usage Limit for Single Card</b>
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
                    <b>Usage Limit for Single User</b>
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
                    <b>Terms and Conditions</b> (Press enter to go to next line)
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
              <button
                className="btn btn-outline-info"
                disabled={!inputChange || loading}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferUpdate;
