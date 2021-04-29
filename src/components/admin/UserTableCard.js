import React, { useState } from "react";
import { Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteUser, updateUser } from "../../functions/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { Option } = Select;

function UserTableCard({ u, hotels, reload, loading, setLoading }) {
  const [values, setValues] = useState(u);
  const { user } = useSelector((state) => ({ ...state }));

  const handleHotelChange = (value) => {
    setValues({ ...values, hotels: value });
  };

  const handleRoleChange = (value) => {
    setValues({ ...values, role: value });
  };

  const handleUserUpdate = () => {
    if (window.confirm(`Update "${values.email}?"`)) {
      setLoading(true);
      updateUser(values, user.token)
        .then((res) => {
          setLoading(false);
          reload();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Update failed");
        });
    } else {
      return;
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm(`Delete ${u.email}?`)) {
      setLoading(true);
      deleteUser(id, user.token)
        .then((res) => {
          setLoading(false);
          window.alert("User deleted successfully!");
          reload();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong!");
        });
    }
  };

  return (
    <tbody>
      <tr>
        <td className="text-center">{u.email}</td>
        <td className="text-center">
          <Select defaultValue={values.role} onChange={handleRoleChange}>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </td>
        <td>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={values.hotels}
            onChange={(value) => handleHotelChange(value)}
          >
            {hotels.length &&
              hotels.map((h) => (
                <Option value={h} key={h}>
                  {h}
                </Option>
              ))}
          </Select>
        </td>
        <td className="text-center">
          <button
            className="btn btn-primary btn-raised"
            onClick={handleUserUpdate}
            disabled={loading}
          >
            Update
          </button>
        </td>
        <td className="text-center delete-user">
          <DeleteOutlined
            className="btn btn-raised btn-danger"
            onClick={() => handleDeleteUser(u.id)}
            disabled={loading}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default UserTableCard;
