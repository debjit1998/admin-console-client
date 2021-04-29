import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MailOutlined, LoadingOutlined } from "@ant-design/icons";
import { loginUser } from "../../functions/auth";

function Login({ history, checking }) {
  const roleBasedRedirect = (role) => {
    if (role === "admin") {
      history.push("/user");
    } else {
      history.push("/user");
    }
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      roleBasedRedirect(user.role);
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      loginUser(idTokenResult.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
              hotels: res.data.hotels,
            },
          });
          roleBasedRedirect(res.data.role);
        })
        .catch((err) => {
          console.log(err);
          toast.error("User not found!");
          setLoading(false);
        });
      //history.push("/");
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <Button
            onClick={handleSubmit}
            className="mb-3"
            type="danger"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || checking}
          >
            Login with Email/Password
          </Button>
        </form>
      </>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 login">
          <br />
          <br />
          <br />
          {loading || checking ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Link
            to="/forgot/password"
            className="float-right text-danger forgot-password"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
