import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import AddStoreComponent from "../Add Store/AddStore.component";

import Button from "@material-ui/core/Button";

export default function StoreStaffComponent(props) {
  const [open, setOpen] = useState(false);

  const handleClickModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReload = () => {
    setOpen(false);
    props.handleReload();
  };

  const store = () => {
    if (props.data?.store) {
      return (
        <div className="wrap-profile mt-3">
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Tên đại lý:</span>
            </Grid>
            <Grid item xs={8}>
              {props.data?.store.storeName}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Địa chỉ: </span>
            </Grid>
            <Grid item xs={8}>
              {props.data?.store.address}
            </Grid>
          </Grid>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%", padding: "10px" }}
              type="submit"
              className="mt-3"
              onClick={handleClickModal}
            >
              Thay đổi đại lý
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span style={{ color: "red" }}>Chưa có đại lý</span>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", padding: "10px" }}
            type="submit"
            className="mt-3"
            onClick={handleClickModal}
          >
            Thêm đại lý
          </Button>
        </div>
      );
    }
  };
  return (
    <div className="mt-2 mb-5">
      <div className="profile-title">
        <span>Thông tin đại lý:</span>
      </div>
      {store()}
      <AddStoreComponent
        data={props}
        open={open}
        onClose={handleClose}
        handleReload={handleReload}
      />
    </div>
  );
}
