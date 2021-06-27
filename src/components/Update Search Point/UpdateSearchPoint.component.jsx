import React, { useState, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateSearchPoint, deleteSearchPoint } from "../../api/adminAPI";

export default function UpdateSearchPointComponent(props) {
  console.log(props);
  const [point, setPoint] = useState();
  useEffect(() => {
    if (props.data?.point) {
      setPoint(props.data?.point);
    }
  }, [props.data?.point]);
  const handleSubmit = async () => {
    if (point) {
      const data = {
        pointID: props.data?._id,
        point: point,
      };
      await updateSearchPoint(data).then((res) => {
        props.handleReload();
      });
    } else {
      alert("Điểm không được để trống");
    }
  };
  const handleSubmitDelete = async () => {
    const data = {
      pointID: props.data?._id,
    };
    await deleteSearchPoint(data).then((res) => {
      props.handleReload();
    });
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
      <DialogTitle id="simple-dialog-title">Cập nhật</DialogTitle>
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
            defaultValue={props?.data?.point}
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
          Cập nhật
        </Button>
        <Button
          variant="contained"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "red",
            color: "white",
          }}
          type="submit"
          className="mt-3"
          onClick={handleSubmitDelete}
        >
          Xóa
        </Button>
      </div>
    </Dialog>
  );
}
