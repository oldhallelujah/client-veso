import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function PopupDealSuccessComponent(props) {
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Thêm khách hàng mới"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Bán vé thành công</DialogTitle>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
      >
        {props?.usePoint ? (
          <span style={{ color: "green" }}>Khách hàng đã đủ điểm đổi quà</span>
        ) : (
          <span style={{ color: "red" }}>Khách hàng chưa đủ điểm đổi quà</span>
        )}
      </div>
    </Dialog>
  );
}
