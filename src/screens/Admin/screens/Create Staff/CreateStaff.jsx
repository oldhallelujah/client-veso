import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { createStaff } from "../../../../api/adminAPI";
import slug from "../../../../resources/slug";

export default function CreateStaff(props) {
  props.handleLoading(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };
  const handleSumbit = async (event) => {
    props.handleLoading(true);

    event.preventDefault();
    const data = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
    };
    await createStaff(data).then((res) => {
      props.handleLoading(false);
      history.push(slug.staffManager);
    });
  };
  return (
    <Grid container spacing={1} className="mt-3 main">
      <div className="title-header">
        <span>Thêm nhân viên mới</span>
      </div>
      <div className="mt-3" style={{ width: "100%" }}>
        <form onSubmit={handleSumbit}>
          <Grid item xs={12}>
            <p>Tên nhân viên: </p>
            <input
              type="text"
              class="form-control"
              name="fullName"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Số điện thoại: </p>
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Tên đăng nhập: </p>
            <input
              type="text"
              class="form-control"
              name="username"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Mật khẩu: </p>
            <input
              type="text"
              class="form-control"
              name="password"
              onChange={handleChange}
              required
            />
          </Grid>
          <div style={{ width: "40%", margin: "0 auto" }} className="mt-4">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%", padding: "10px" }}
              type="submit"
            >
              Tạo nhân viên
            </Button>
          </div>
        </form>
      </div>
    </Grid>
  );
}
