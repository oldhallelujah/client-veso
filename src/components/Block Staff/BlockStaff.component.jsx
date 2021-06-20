import React, { useState, useEffect } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { blockUser, unblockUser } from "../../api/adminAPI";
export default function BlockStaffComponent(props) {
  const handleBlockUser = async (status) => {
    const data = {
      userID: props.data?.staff._id,
    };

    if (!status) {
      await blockUser(data).then((res) => {
        props.handleReload();
      });
    } else {
      await unblockUser(data).then((res) => {
        props.handleReload();
      });
    }
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
            checked={props.data?.staff.block ? false : true}
            onChange={() => {
              handleBlockUser(true);
            }}
          />
        </div>
        <div>
          <FormControlLabel
            value="end"
            control={<Radio color="primary" />}
            label="Dừng hoạt động"
            checked={props.data?.staff.block ? true : false}
            onChange={() => {
              handleBlockUser(false);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
