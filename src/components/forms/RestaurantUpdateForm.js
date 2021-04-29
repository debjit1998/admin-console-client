import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

function RestaurantUpdateForm({
  loading,
  handleSubmit,
  handleChange,
  values,
  inputChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <LoadingOutlined className="h1 text-danger" />
      ) : (
        <>
          <h4>Edit Restaurant</h4>
          <hr />
        </>
      )}
      <div className="row">
        <div className="col">
          <label>
            <b>
              Name{" "}
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
            name="name"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            required
            autoFocus
          />
        </div>
        <div className="col">
          <label>
            <b>
              Description{" "}
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
            name="description"
            className="form-control"
            value={values.description}
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
              Available{" "}
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
            name="available"
            className="form-control"
            onChange={handleChange}
            required
            value={values.available}
          >
            <option value={true}>YES</option>
            <option value={false}>NO</option>
          </select>
        </div>
        <div className="col">
          <label>
            <b>
              Average Price For 2 People{" "}
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
            name="average_price_for_2_people"
            className="form-control"
            value={values.average_price_for_2_people}
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
              Category{" "}
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
            name="category"
            className="form-control"
            onChange={handleChange}
            required
            value={values.category}
          >
            <option value="signature">signature</option>
            <option value="qmin_comfort">qmin_comfort</option>
            <option value="la_pat">la_pat</option>
          </select>
        </div>
        <div className="col">
          <label>
            <b>Theme</b>
          </label>
          <input
            type="text"
            name="theme"
            className="form-control"
            value={values.theme}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label>
            <b>Primary Image URL</b>
          </label>
          <input
            type="text"
            name="home_page_card_img_url"
            className="form-control"
            value={values.home_page_card_img_url}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col">
          <label>
            <b>Secondary Image URL</b>
          </label>
          <input
            type="text"
            name="restaurant_details_img_url"
            className="form-control"
            value={values.restaurant_details_img_url}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label>
            <b>Lunch slot open time</b> (For eg:- 12:00 PM){" "}
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
          <input
            type="text"
            name="lunch_slot_open"
            className="form-control"
            value={values.lunch_slot_open}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="col">
          <label>
            <b>Lunch slot close time </b> (For eg:- 03:00 PM){" "}
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
          <input
            type="text"
            name="lunch_slot_close"
            className="form-control"
            value={values.lunch_slot_close}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label>
            <b>Dinner slot open time</b> (For eg:- 07:00 PM)
          </label>
          <input
            type="text"
            name="dinner_slot_open"
            className="form-control"
            value={values.dinner_slot_open}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col">
          <label>
            <b>Dinner slot close time</b> (For eg:- 11:00 PM)
          </label>
          <input
            type="text"
            name="dinner_slot_close"
            className="form-control"
            value={values.dinner_slot_close}
            onChange={handleChange}
            autoComplete="off"
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
  );
}

export default RestaurantUpdateForm;
