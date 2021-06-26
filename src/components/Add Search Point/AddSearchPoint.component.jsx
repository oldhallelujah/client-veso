import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addSearchPoint } from "../../api/adminAPI";

export default function AddSearchPointComponent(props) {
  const [point, setPoint] = useState();
  const handleSubmit = async () => {
    if (point) {
      const data = {
        point: point,
      };
      await addSearchPoint(data)
        .then((res) => {
          props.handleReload();
        })
        .catch((error) => {
          alert("Điểm đã tồn tại");
        });
    } else {
      alert("Điểm không được để trống ");
    }
  };
  const handleChange = (event) => {
    setPoint(event.target.value);
  };
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="Thêm mới"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Thêm mới</DialogTitle>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Điểm tìm kiếm"
            variant="outlined"
            type="number"
            required
            onChange={handleChange}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", padding: "10px" }}
          type="submit"
          className="mt-3"
          onClick={handleSubmit}
        >
          Thêm điểm
        </Button>
      </div>
    </Dialog>
  );
}
