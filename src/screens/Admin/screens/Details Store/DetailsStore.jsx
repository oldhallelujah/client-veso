import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { getDetailsStore } from "../../../../api/adminAPI";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import ActiveStore from "../../../../components/Active Store/ActiveStore.component";
import AddStaffComponent from "../../../../components/Add Staff/AddStaff.component";
import Button from "@material-ui/core/Button";

import "./details.css";

export default function DetailsStore(props) {
  const search = queryString.parse(props.query);
  const storeID = search.id;
  const [details, setDetails] = useState();
  const [open, setOpen] = useState(false);
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    getDetailsStore(storeID).then((res) => {
      setDetails(res.data);
      props.handleLoading(false);
    });
  }, [reload]);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const status = (status) => {
    if (status) {
      return (
        <>
          <Chip
            variant="outlined"
            size="small"
            style={{ color: "green" }}
            label="Hoạt động"
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
          />
          <i className="fas fa-pen ml-2"></i>
        </>
      );
    }
  };
  const staff = (staff) => {
    if (staff === "") {
      return (
        <span style={{ color: "red" }}>
          Chưa có nhân viên <i className="fas fa-pen ml-2"></i>
        </span>
      );
    } else {
      return (
        <span style={{ color: "green" }}>
          {staff?.fullName} <i class="fas fa-pen"></i>
        </span>
      );
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleClickActive = () => {
    setOpen(true);
  };

  const handleReload = () => {
    setOpen(false);
    setOpenAddStaff(false);
    setReload(!reload);
  };

  const handleAddStaff = () => {
    setOpenAddStaff(true);
  };
  const onCloseAddStaff = () => {
    setOpenAddStaff(false);
  };
  return (
    <Grid className="main">
      <div className="name-header">
        <span>{details?.store.storeName}</span>
      </div>
      <div className="wrap-details">
        <div className="profile-title mt-3 ">
          <span>Thông tin đại lý: </span>
        </div>
        <div className="wrap-profile mt-3">
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Tên đại lý:</span>
            </Grid>
            <Grid item xs={8}>
              <span>{details?.store.storeName}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Địa chỉ:</span>
            </Grid>
            <Grid item xs={8}>
              <span>{details?.store.address}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Ngày tạo:</span>
            </Grid>
            <Grid item xs={8}>
              <span>{converDate(details?.store.createAt)}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Tình trạng:</span>
            </Grid>
            <Grid item xs={8} onClick={handleClickActive}>
              {status(details?.store.activate)}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <span className="profile-item">Nhân viên:</span>
            </Grid>
            <Grid item xs={8} onClick={handleAddStaff}>
              {staff(details?.profileStaff)}
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "60%",
              margin: "0 auto !important",
              padding: "5px",
            }}
            className="mt-3"
            type="submit"
          >
            Cập nhật
          </Button>
        </div>
      </div>

      <ActiveStore
        open={open}
        onClose={onClose}
        data={details}
        handleReload={handleReload}
      />
      <AddStaffComponent
        open={openAddStaff}
        onClose={onCloseAddStaff}
        data={details}
        handleReload={handleReload}
      />
    </Grid>
  );
}
