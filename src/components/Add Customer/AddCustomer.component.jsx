import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addCustomer } from "../../api/staffAPI";

export default function AddCustomerComponent(props) {
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const handeChangeName = (event) => {
    setName(event.target.value);
  };
  const handeChangePhone = (event) => {
    setPhoneNumber(event.target.value);
  };
  const onSubmit = async () => {
    const data = {
      phoneNumber: phoneNumber,
      name: name,
      storeID: props?.storeID,
    };
    console.log(data);
    await addCustomer(data).then((res) => {
      props.handleReload();
    });
  };
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Thêm khách hàng mới"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Thêm khách hàng mới</DialogTitle>
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
            label="Tên"
            variant="outlined"
            onChange={handeChangeName}
          />
        </div>
        <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Điện thoại"
            variant="outlined"
            onChange={handeChangePhone}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", padding: "10px" }}
          type="submit"
          className="mt-3"
          onClick={onSubmit}
        >
          Thêm mới
        </Button>
      </div>
    </Dialog>
  );
}
