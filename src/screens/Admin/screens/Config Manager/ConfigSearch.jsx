import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddSearchPointComponent from "../../../../components/Add Search Point/AddSearchPoint.component";
import UpdateSearchPointComponent from "../../../../components/Update Search Point/UpdateSearchPoint.component";
import { getSearchPoint } from "../../../../api/adminAPI";
import Chip from "@material-ui/core/Chip";

export default function ConfigSearch(props) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [point, setPoint] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getSearchPoint().then((res) => {
      setPoint(res.data.listsPoint);
      props.handleLoading(false);
    });
  }, [reload]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReload = () => {
    setOpen(false);
    setOpenUpdate(false);
    setReload(!reload);
  };
  const handleClickUpdate = (data) => {
    setDataUpdate(data);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setDataUpdate();
    setOpenUpdate(false);
  };
  const lists = point
    .sort((a, b) => {
      return a.point - b.point;
    })
    .map((e, index) => {
      return (
        <span key={index} className="ml-3 ">
          <Chip
            variant="outlined"
            size="large"
            style={{ color: "green" }}
            label={"> " + e.point + " điểm"}
            onClick={() => handleClickUpdate(e)}
            className="mt-2"
          />
        </span>
      );
    });

  return (
    <Grid container spacing={1} className="mt-3" style={{ padding: "15px" }}>
      <div className="title-header">
        <span>Cấu hình tìm theo điểm:</span>
      </div>
      <div className="mt-3" style={{ width: "100%" }}>
        {lists}
      </div>

      <div className="mt-3" style={{ width: "100%", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "30%", padding: "10px" }}
          type="submit"
          className="mt-3"
          onClick={handleClick}
        >
          Thêm mới
        </Button>
      </div>
      <AddSearchPointComponent
        open={open}
        handleClose={handleClose}
        handleReload={handleReload}
      />
      <UpdateSearchPointComponent
        open={openUpdate}
        data={dataUpdate}
        handleClose={handleCloseUpdate}
        handleReload={handleReload}
      />
    </Grid>
  );
}
