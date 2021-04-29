import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  SettingOutlined,
  LogoutOutlined,
  KeyOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

function Header() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => {
    return { ...state };
  });

  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    toast.success("Logout successful");
    history.push("/");
  };

  const updatePassword = () => {
    history.push("/user/password");
  };

  const displayRole = () => {
    if (user && user.role === "user") {
      return (
        <span>
          <b>User</b>
        </span>
      );
    } else if (user && user.role === "admin") {
      return (
        <span>
          <b>Admin</b>
        </span>
      );
    }
    return;
  };

  const handleRoleTabClick = () => {
    if (user.hotels && user.hotels.length > 0) {
      toast.success(`You have access to the hotels: ${user.hotels.join(", ")}`);
    }
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        position: "fixed",
        zIndex: 2,
        width: "100%",
        backgroundColor: "black",
      }}
      className="header"
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/" style={{ color: "white", fontWeight: "bold" }}>
          Qmin Admin Console
        </Link>
      </Item>

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
          style={{ color: "white" }}
        >
          <Item icon={<KeyOutlined />} onClick={updatePassword}>
            Update Password
          </Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span
        className="float-right role"
        style={{
          backgroundColor: "white",
          color: "black",
          width: "80px",
          textAlign: "center",
          borderRadius: "4px",
        }}
        title="Role"
        onClick={handleRoleTabClick}
      >
        {displayRole()}
      </span>
    </Menu>
  );
}

export default Header;
