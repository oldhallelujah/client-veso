import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { createStore } from "../../../../api/adminAPI";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";

export default function CreateStore(props) {
  props.handleLoading(false);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "storeName") {
      setStoreName(value);
    } else {
      setAddress(value);
    }
  };
  const handleSumbit = async (event) => {
    event.preventDefault();
    const data = {
      storeName: storeName,
      address: address,
    };
    props.handleLoading(true);
    await createStore(data).then((res) => {
      history.push(slug.storeManager);
    });
  };
  return (
    <Grid container spacing={1} className="mt-3 " style={{ padding: "15px" }}>
      <div className="title-header">
        <span>Thêm đại lý mới</span>
      </div>
      <div className="mt-3" style={{ width: "100%" }}>
        <form onSubmit={handleSumbit}>
          <Grid item xs={12}>
            <p>Tên chi nhánh: </p>
            <input
              type="text"
              class="form-control"
              name="storeName"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Địa chỉ: </p>
            <input
              type="text"
              class="form-control"
              name="address"
              onChange={handleChange}
              required
            />
          </Grid>
          <div style={{ width: "40%", margin: "0 auto" }} className="mt-4">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%", padding: "10px" }}
              type="submit"
            >
              Tạo chi nhánh
            </Button>
          </div>
        </form>
      </div>
    </Grid>
  );
}
