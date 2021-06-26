import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updatePasswordStaff } from "../../api/adminAPI";

export default function UpdatePasswordComponent(props) {
  const [password, setPassword] = useState("");
  console.log(props);
  const handleChangePass = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    if (password == "") {
      alert("Xin nhập mật khẩu");
    } else {
      const data = {
        staffID: props?.data?.staff._id,
        password: password,
      };
      await updatePasswordStaff(data).then((res) => {
        props.handleReload();
      });
    }
  };
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Cập nhật mật khẩu mới"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Cập nhật mật khẩu mới</DialogTitle>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            type="text"
            onChange={handleChangePass}
            required
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", padding: "10px" }}
          type="submit"
          className="mt-3"
          onClick={handleSubmit}
        >
          Cập nhật
        </Button>
      </div>
    </Dialog>
  );
}
