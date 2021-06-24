import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../../Login/screens/homelogin.css";
import loginImage from "../../../assets/image/login.png";
import LoadingComponent from "../../../components/Loading/Loading.component";
import { getUserID } from "../../../api/staffAPI";
import { updatePassword } from "../../../api/userAPI";

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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleClick = async () => {
    if (confirmPassword !== newPassword) {
      alert("Xác nhận mật khẩu không đúng");
    } else if (oldPassword === "") {
      alert("Mật khẩu không được để trống");
    } else {
      setShowLoading(true);
      const data = {
        ownerID: await getUserID(),
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      console.log(data);
      await updatePassword(data)
        .then((res) => {
          alert("Cập nhật thành công, xin vui lòng đăng nhập với mật khẩu mới");
          localStorage.clear();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                type="password"
                label="Mật khẩu củ"
                name="oldPassword"
                onChange={handleChangeInput}
                required
              />
              <TextField
                type="password"
                className="mt-4"
                label="Mật khẩu mới"
                name="newPassword"
                onChange={handleChangeInput}
                required
              />
              <TextField
                type="password"
                className="mt-4"
                label="xác nhận mật khẩu mới"
                name="confirmPassword"
                onChange={handleChangeInput}
                required
              />
            </form>
            <div style={{ marginTop: "60px" }}>
              <a className="btn-login" onClick={handleClick}>
                Đổi mật khẩu
              </a>
            </div>
          </div>
        </div>
      </div>
      {showLoading ? <LoadingComponent /> : <></>}
    </div>
  );
};

export default HomeLogin;
