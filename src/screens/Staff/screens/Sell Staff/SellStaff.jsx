import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../style.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CustomerSelectComponent from "../../../../components/Customer Select/CustomerSelect.component";
import { getCustomerStaff } from "../../../../api/staffAPI";
import AddCustomerComponent from "../../../../components/Add Customer/AddCustomer.component";
export default function SellStaff(props) {
  const [customerStore, setCustomerStore] = useState([]);
  const [storeID, setStoreID] = useState();
  const [customer, setCustomer] = useState("");
  const [quantity, setQuantity] = useState();
  const [code, setCode] = useState();
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);

    await getCustomerStaff().then((res) => {
      setCustomerStore(res.data);
      setStoreID(res.storeID);
      props.handleLoading(false);
    });
  }, [reload]);

  const handleChangeCustomer = (value) => {
    setCustomer(value);
  };
  const hanldeChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleClickAdd = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleReload = () => {
    setOpen(false);

    setReload(!reload);
  };
  console.log(customer);
  return (
    <Grid className="main">
      <div className="header-title mt-3">
        <span>
          Bán vé khách hàng:{" "}
          <i
            className="fas fa-plus-circle ml-2"
            style={{ color: "green" }}
            onClick={handleClickAdd}
          >
            Thêm mới
          </i>
        </span>
      </div>

      <hr />
      <div style={{ width: "100%", margin: "0 auto" }}>
        <CustomerSelectComponent
          customerStore={customerStore}
          handleChangeCustomer={handleChangeCustomer}
        />
      </div>
      <hr />
      <div className="sell-item">
        <div className="item mt-4">
          <span>Mã số: </span>
          <div style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={hanldeChangeCode}
            />
          </div>
        </div>
        <div className="item mt-4">
          <span>Số lượng:</span>
          <div style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeQuantity}
            />
          </div>
        </div>
        {customer != "" ? (
          <div className="details mt-4">
            <div style={{ width: "100%", padding: "10px" }} className="pt-2">
              <span
                style={{ fontSize: "20px", color: "white", fontWeight: 500 }}
              >
                Chi tiết hóa đơn
              </span>
            </div>

            <div
              style={{
                color: "white",
                width: "100%",
                padding: "10px",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Khách hàng:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{customer.name}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Điện thoại:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{customer.phoneNumber}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Mã vé:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{code}</span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Số lượng:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{quantity}</span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Tổng tiền:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{quantity * 10000}</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <AddCustomerComponent
        open={open}
        onClose={onClose}
        storeID={storeID}
        handleReload={handleReload}
      />
    </Grid>
  );
}
