import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserNav from "../nav/UserNav";
import UserTableCard from "./UserTableCard";
import { getUsers, saveUser } from "../../functions/auth";
import { getHotels } from "../../functions/hotels";
import { useSelector } from "react-redux";
import { Select } from "antd";
import LocalSearch from "../forms/LocalSearch";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    role: "user",
    hotels: [],
  });

  const { user } = useSelector((state) => ({ ...state }));

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllHotels();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true);
    getUsers(user.token)
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchAllHotels = () => {
    setLoading(true);
    getHotels()
      .then((res) => {
        setLoading(false);
        setHotels(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleRoleChange = (value) => {
    setValues({ ...values, role: value });
  };

  const handleEmailChange = (e) => {
    //console.log(value);
    setValues({ ...values, email: e.target.value });
  };

  const handleHotelChange = (value) => {
    setValues({ ...values, hotels: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (values.email.trim() === "") {
      window.alert("Please fill up the email field");
      return;
    }
    if (window.confirm(`Save the user ${values.email}`)) {
      setLoading(true);
      saveUser(values, user.token)
        .then((res) => {
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err.response.data);
        });
    }
  };

  const searched = (keyword) => (u) => u.email.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <form onSubmit={handleSubmit}>
            <div
              className="row m-20 page add-user form-group"
              style={{ marginTop: "50px" }}
            >
              {loading ? (
                <h4
                  className="text-danger"
                  style={{ width: "100%", paddingLeft: "13px" }}
                >
                  <LoadingOutlined />
                </h4>
              ) : (
                <h4 style={{ width: "100%", paddingLeft: "13px" }}>Add User</h4>
              )}

              <br />
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  type="email"
                  required
                  autoComplete="off"
                  value={values.email}
                />
              </div>
              <div className="col-md-3 mb-2">
                <Select
                  className="form-control"
                  defaultValue="user"
                  onChange={handleRoleChange}
                >
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </div>
              <div className="col-md-4 mb-2">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Tag Hotels"
                  value={values.allergens}
                  onChange={(value) => handleHotelChange(value)}
                >
                  {hotels.length &&
                    hotels.map((h) => (
                      <Option value={h} key={h}>
                        {h}
                      </Option>
                    ))}
                </Select>
              </div>
            </div>

            <button
              className="btn btn-primary btn-raised"
              //onClick={handleSubmit}
              disabled={loading}
            >
              Save User
            </button>
          </form>
          <hr />
          <div className="row p-20 page" style={{ paddingLeft: "13px" }}>
            {loading ? (
              <h4 className="text-danger">
                <LoadingOutlined />
              </h4>
            ) : (
              <h4>Users</h4>
            )}
            <hr />
            {users.length !== 0 && (
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            )}
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col" className="text-center">
                    Email
                  </th>
                  <th scope="col" className="text-center">
                    Role
                  </th>
                  <th scope="col" className="text-center">
                    Hotels Tagged
                  </th>
                  <th scope="col" className="text-center">
                    Update
                  </th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>

              {users.filter(searched(keyword)).map((u) => (
                <UserTableCard
                  key={u.id}
                  u={u}
                  hotels={hotels}
                  reload={reload}
                  loading={loading}
                  setLoading={setLoading}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
