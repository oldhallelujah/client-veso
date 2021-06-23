import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function PopupGiftSuccessComponent(props) {
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Thêm khách hàng mới"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Thông báo đổi quà</DialogTitle>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
      >
        <span style={{ color: "green" }}>Khách hàng đã đổi quà thành công</span>
      </div>
    </Dialog>
  );
}
