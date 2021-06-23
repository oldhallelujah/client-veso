import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { getDetailsStaff } from "../../../../api/adminAPI";
import { getUserID } from "../../../../api/staffAPI";
import moment from "moment";
import Chip from "@material-ui/core/Chip";

import "../../../Admin/screens/Details Store/details.css";

export default function StoreStaff(props) {
  const search = queryString.parse(props.query);
  const storeID = search.id;
  const [details, setDetails] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    await getDetailsStaff(getUserID()).then((res) => {
      setDetails(res.data);
      props.handleLoading(false);
    });
  }, [reload]);
  console.log(details);
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
        </>
      );
    }
  };

  return (
    <Grid className="main">
      {details?.store ? (
        <div>
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
                <Grid item xs={8}>
                  {status(details?.store.activate)}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <span className="profile-item">Nhân viên:</span>
                </Grid>
                <Grid item xs={8}>
                  {details?.staff.fullName}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      ) : (
        <span style={{ color: "red" }}>
          Bạn chưa được giao nhiệm vụ ở đại lý nào
        </span>
      )}
    </Grid>
  );
}
