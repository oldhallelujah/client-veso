import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { getDetailsStore } from "../../../../api/adminAPI";
import moment from "moment";
import Chip from "@material-ui/core/Chip";

import "./details.css";

export default function DetailsStore(props) {
  const search = queryString.parse(props.query);
  const storeID = search.id;
  const [details, setDetails] = useState();
  useEffect(async () => {
    getDetailsStore(storeID).then((res) => {
      setDetails(res.data);
      props.handleLoading(false);
    });
  }, []);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const status = (status) => {
    if (status) {
      return (
        <Chip
          variant="outlined"
          size="small"
          style={{ color: "green" }}
          label="Hoạt động"
        />
      );
    } else {
      return (
        <Chip
          variant="outlined"
          size="small"
          style={{ color: "red" }}
          label="Dừng hoạt động"
        />
      );
    }
  };
  const staff = (staff) => {
    if (staff === "") {
      return <span style={{ color: "red" }}>Chưa có nhân viên</span>;
    } else {
      return <span>{staff?.fullName}</span>;
    }
  };

  return (
    <Grid className="main">
      <div className="name-header">
        <span>{details?.store.storeName}</span>
      </div>
      <div className="wrap-details">
        <div className="profile-title mt-3">
          <span>Thông tin cửa hàng</span>
        </div>
        <div className="wrap-profile mt-3">
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span className="profile-item">Tên đại lý:</span>
            </Grid>
            <Grid item xs={9}>
              <span>{details?.store.storeName}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span className="profile-item">Địa chỉ:</span>
            </Grid>
            <Grid item xs={9}>
              <span>{details?.store.address}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span className="profile-item">Ngày tạo:</span>
            </Grid>
            <Grid item xs={9}>
              <span>{converDate(details?.store.createAt)}</span>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span className="profile-item">Tình trạng:</span>
            </Grid>
            <Grid item xs={9}>
              {status(details?.store.activate)}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span className="profile-item">Nhân viên:</span>
            </Grid>
            <Grid item xs={9}>
              {staff(details?.profileStaff)}
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
