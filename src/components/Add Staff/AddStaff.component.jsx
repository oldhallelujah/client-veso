import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { getStaff, addStaffStore } from "../../api/adminAPI";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function AddStaffComponent(props) {
  const [staff, setStaff] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    await getStaff().then((res) => {
      console.log(res);
      setStaff(res.data);
    });
  }, [reload]);

  const handleAddStaff = async (staffID) => {
    const data = {
      staffID: staffID,
      storeID: props.data?.store._id,
    };
    await addStaffStore(data).then((res) => {
      setReload(!reload);
      props.handleReload();
    });
  };

  const lists = staff.map((e, index) => {
    let store;
    if (e.store == "") {
      store = <span style={{ color: "red" }}>Chưa có đại lý</span>;
    } else {
      store = <span style={{ color: "green" }}>{e.store.storeName}</span>;
    }
    return (
      <ListItem
        button
        style={{ textAlign: "center", backgroundColor: "#ccc" }}
        onClick={() => handleAddStaff(e.staff._id)}
      >
        <ListItemText>
          {e.staff.fullName} - <span>{store}</span>{" "}
        </ListItemText>
      </ListItem>
    );
  });
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="Cập nhật trạng thái"
      open={props.open}
      style={{ textAlign: "center" }}
    >
      <DialogTitle id="simple-dialog-title">Thêm nhân viên đại lý</DialogTitle>
      <div style={{ paddingBottom: "30px", width: "300px" }}>
        <List>{lists}</List>
      </div>
    </Dialog>
  );
}
