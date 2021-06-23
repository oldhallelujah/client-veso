import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./homelogin.css";
import { login } from "./login";
import loginImage from "../../../assets/image/login.png";
import LoadingComponent from "../../../components/Loading/Loading.component";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "34ch",
    },
  },
}));
const HomeLogin = () => {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };
  const handleClickLogin = async () => {
    setShowLoading(true);
    const data = {
      username: username,
      password: password,
    };
    await login(data).then((res) => {
      if (res === "staff") {
        history.push("/staff");
      } else if (res === "admin") {
        history.push("/admin");
      }
      setShowLoading(false);
    });
  };

  return (
    <div className="limiter">
      <div className="container-login">
        <div className="wrap">
          <div className="title-login">
            <img src={loginImage} alt="" width="60%" />
          </div>

          <div className="form-login mt-4">
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                type="text"
                label="Tài khoản"
                name="username"
                onChange={handleChangeInput}
                required
              />
              <TextField
                type="password"
                className="mt-4"
                label="Mật khẩu"
                name="password"
                onChange={handleChangeInput}
                required
              />
            </form>
          </div>

          <div style={{ marginTop: "60px" }} onClick={handleClickLogin}>
            <a className="btn-login">Đăng nhập</a>
          </div>
        </div>
      </div>
      {showLoading ? <LoadingComponent /> : <></>}
    </div>
  );
};

export default HomeLogin;
