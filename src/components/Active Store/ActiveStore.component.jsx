import React, { useState, useEffect } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { updateActiveStore } from "../../api/adminAPI";
export default function ActiveStore(props) {
  const handeActiveStore = async (status) => {
    const data = {
      storeID: props.data?.store._id,
      status: status,
    };
    await updateActiveStore(data).then((res) => {
      props.handleReload();
    });
  };
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Cập nhật trạng thái"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Cập nhật trạng thái</DialogTitle>
      <div style={{ paddingLeft: "30px", paddingBottom: "30px" }}>
        <div>
          <FormControlLabel
            value="end"
            control={<Radio color="primary" />}
            label="Hoạt động"
            checked={props.data?.store.activate ? true : false}
            onChange={() => {
              handeActiveStore(true);
            }}
          />
        </div>
        <div>
          <FormControlLabel
            value="end"
            control={<Radio color="primary" />}
            label="Dừng hoạt động"
            checked={props.data?.store.activate ? false : true}
            onChange={() => {
              handeActiveStore(false);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
