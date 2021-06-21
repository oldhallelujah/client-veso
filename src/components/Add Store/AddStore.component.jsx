import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { getAllStore } from "../../api/adminAPI";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function AddStoreComponent(props) {
  const [store, setStore] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    await getAllStore().then((res) => {
      console.log(res);
      setStore(res.data);
    });
  }, [reload]);

  //   const handleAddStaff = async (staffID) => {
  //     const data = {
  //       staffID: staffID,
  //       storeID: props.data?.store._id,
  //     };
  //     await addStaffStore(data).then((res) => {
  //       setReload(!reload);
  //       props.handleReload();
  //     });
  //   };

  const lists = store.map((e, index) => {
    let staff;
    if (e.staff == "") {
      staff = <span style={{ color: "red" }}>Chưa có nhân viên</span>;
    } else {
      staff = <span style={{ color: "green" }}>{e.staff.fullName}</span>;
    }
    return (
      <ListItem
        button
        style={{ textAlign: "center", backgroundColor: "#ccc" }}
        onClick={() => handleAddStaff(e.staff._id)}
        className="mt-2"
      >
        <ListItemText>
          {e.store.storeName} - <span>{staff}</span>{" "}
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
      <DialogTitle id="simple-dialog-title">Thêm đại lý </DialogTitle>
      <div style={{ paddingBottom: "30px", width: "300px" }}>
        <List>{lists}</List>
      </div>
    </Dialog>
  );
}
