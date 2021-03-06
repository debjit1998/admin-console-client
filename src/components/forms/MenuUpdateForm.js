import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function MenuUpdateForm({
  handleChange,
  handleAllergenChange,
  values,
  handleSubmit,
  inputChange,
  loading,
}) {
  const allergens = [
    "Milk",
    "Eggs",
    "Fish",
    "Treenuts",
    "Peanuts",
    "Gluten",
    "Mustard",
    "Celery",
    "Sesame Seed",
    "Soya Bean",
    "Crustacean",
    "Molluscs",
    "Lupin",
    "Sulphur Dioxide",
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>
              <b>
                Title{" "}
              </b>
              <h5
                  style={{
                    display: "inline-block",
                    color: "red",
                    marginBottom: "0px",
                  }}
                >
                  *
                </h5>
              (E.G: <b>B</b>utter <b>C</b>hicken)
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={values.title}
              onChange={handleChange}
              autoComplete="off"
              required
              autoFocus
            />
          </div>
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
              value={values.available}
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value={0}>NO</option>
              <option value={1}>YES</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Item Ref ID{" "}
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
              type="number"
              name="item_ref_id"
              className="form-control"
              value={values.item_ref_id}
              onChange={handleChange}
              autoComplete="off"
              required
              disabled
            />
          </div>
          <div className="col">
            <label>
              <b>
                Price{" "}
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
              type="number"
              name="price"
              className="form-control"
              value={values.price}
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
              <b>
                Dish Type{" "}
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
              name="dish_type"
              className="form-control"
              value={values.dish_type}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="col">
            <label>
              <b>
                Dish Type Sequence{" "}
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
              type="number"
              name="dish_type_sequence"
              className="form-control"
              value={values.dish_type_sequence}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
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
            <input
              type="text"
              name="category"
              className="form-control"
              value={values.category}
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
                Maximum Order Quantity{" "}
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
              type="number"
              name="max_order_qty"
              className="form-control"
              value={values.max_order_qty}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="col">
            <label>
              <b>
                Spice Level{" "}
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
              name="spice_level"
              value={values.spice_level}
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Portion{" "}
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
              name="portion"
              value={values.portion}
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label>
              <b>
                Jain Dish{" "}
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
              name="jain_dish"
              value={values.jain_dish}
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Halal Dish{" "}
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
              name="halal_dish"
              value={values.halal_dish}
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Signature Dish{" "}
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
              name="signature_dish"
              className="form-control"
              onChange={handleChange}
              required
              value={values.signature_dish}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label>
              <b>
                Veg or Non Veg{" "}
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
              name="veg_or_non_veg"
              className="form-control"
              onChange={handleChange}
              required
              value={values.veg_or_non_veg}
            >
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Container Type{" "}
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
              name="container_type"
              className="form-control"
              onChange={handleChange}
              required
              value={values.container_type}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <label>
              <b>
                Prep Time Min{" "}
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
              name="prep_time_min"
              className="form-control"
              value={values.prep_time_min}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label>
              <b>Allergens</b>
            </label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={values.allergens}
              onChange={(value) => handleAllergenChange(value)}
              className="mt-2"
            >
              {allergens.length &&
                allergens.map((a) => (
                  <Option value={a} key={a}>
                    {a}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="col">
            <label>
              <b>Condiments</b>
            </label>
            <input
              type="text"
              name="condiments"
              className="form-control"
              value={values.condiments}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="row mt-4">
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
              </b>{" "}
              (Press enter to go to next line)
            </label>
            <TextArea
              name="description"
              onChange={handleChange}
              value={values.description}
              autoSize
              required
              className="mt-2"
            />
          </div>
          <div className="col-md-6">
            <label style={{ marginTop: "10px" }}>
              <b>Festival ID </b> (Select based on the hotel and restaurant){" "}
            </label>
            <input
              type="text"
              value={values.festival_ids && values.festival_ids[0]}
              disabled
              className="form-control mt-2"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label>
              <b>Menu Image URL</b>
            </label>
            <input
              type="text"
              name="pdp_image_url"
              onChange={handleChange}
              className="form-control"
              autoComplete="off"
              value={values.pdp_image_url}
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
    </>
  );
}

export default MenuUpdateForm;
