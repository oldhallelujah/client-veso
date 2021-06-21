import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import BlockStaffComponent from "../Block Staff/BlockStaff.component";
const converDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
export default function ProfileStaffComponent(props) {
  console.log(props);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReload = () => {
    setOpen(false);
    props.handleReload();
  };

  const status = (status) => {
    if (!status) {
      return (
        <>
          <Chip
            variant="outlined"
            size="small"
            style={{ color: "green" }}
            label="Hoạt động"
            onClick={handleClickOpen}
          />
          <i className="fas fa-pen ml-2"></i>
        </>
      );
    } else {
      return (
        <>
          <Chip
            variant="outlined"
            size="small"
            style={{ color: "red" }}
            label="Dừng hoạt động"
            onClick={handleClickOpen}
          />
          <i className="fas fa-pen ml-2"></i>
        </>
      );
    }
  };

  return (
    <div className="mt-2 mb-5">
      <div className="profile-title">
        <span>Thông tin nhân viên</span>
      </div>
      <div className="wrap-profile mt-3">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <span className="profile-item">Họ Tên:</span>
          </Grid>
          <Grid item xs={8}>
            {props.data?.staff.fullName}
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <span className="profile-item">Điện thoại:</span>
          </Grid>
          <Grid item xs={8}>
            {props.data?.staff.phoneNumber}
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <span className="profile-item">Ngày tạo:</span>
          </Grid>
          <Grid item xs={8}>
            {converDate(props.data?.staff.createAt)}
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <span className="profile-item">Trạng thái:</span>
          </Grid>
          <Grid item xs={8}>
            {status(props.data?.staff.block)}
          </Grid>
        </Grid>
        <div className="mt-3" style={{ float: "right" }}></div>
      </div>
      <BlockStaffComponent
        data={props.data}
        open={open}
        onClose={handleClose}
        handleReload={handleReload}
      />
    </div>
  );
}
