import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../style.css";
import {
  getAllCustomer,
  getConfig,
  getDetailsStaff,
} from "../../../../api/adminAPI";
import PopupGiftSuccessComponent from "../../../../components/Popup Gift/PopupGiftSuccess.component";
import { addGift, getUserID } from "../../../../api/staffAPI";
import CustomerSelectComponent from "../../../../components/Customer Select/CustomerSelect.component";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function GiftStaff(props) {
  const [customerStore, setCustomerStore] = useState([]);
  const [customer, setCustomer] = useState("");
  const [storeID, setStoreID] = useState();

  const [config, setConfig] = useState();
  const [auto, setAuto] = useState(false);
  const [use, setUse] = useState(false);
  const [code, setCode] = useState();
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    props.handleLoading(true);
    await getAllCustomer().then((res) => {
      setCustomerStore(res.data);
      props.handleLoading(false);
    });
    await getConfig().then((res) => {
      setConfig(res.data);
    });
    await getDetailsStaff(getUserID()).then((res) => {
      console.log(res);
      setStoreID(res.data.store._id);
    });
  }, [reload]);
  const handleChangeCustomer = (value) => {
    setCustomer(value);
  };
  useEffect(() => {
    if (customer !== "") {
      if (customer?.wallet?.remainPoint >= config?.giftConfig?.point) {
        setUse(true);
      } else {
        setUse(false);
      }
    } else {
      setUse(false);
    }
  }, [customer, reload]);

  const title = () => {
    if (use) {
      return (
        <span className="ml-3" style={{ color: "green" }}>
          Đủ điểm{" "}
        </span>
      );
    } else {
      return (
        <span className="ml-3" style={{ color: "red" }}>
          Chưa đủ điểm{" "}
        </span>
      );
    }
  };

  const hanldeChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const noti = () => {
    if (quantity != 0) {
      if (
        customer?.wallet?.remainPoint >=
        config?.giftConfig?.point * quantity
      ) {
        return <span style={{ color: "green" }}>Đủ điểm đổi quà</span>;
      } else {
        return <span style={{ color: "red" }}>Không đủ điểm để đổi quà</span>;
      }
    } else {
      return <></>;
    }
  };
  const handleUseGift = async () => {
    if (customer?.wallet?.remainPoint <= config?.giftConfig?.point * quantity) {
      alert("Số điểm vượt quá số điểm hiện có");
    } else {
      const data = {
        customerID: customer.customer._id,
        gift: {
          number: code,
          quantity: quantity,
          point: config?.giftConfig?.point * quantity,
          storeID: storeID,
          staffID: getUserID(),
        },
      };
      console.log(data);
      await addGift(data).then((res) => {
        setOpen(true);
      });
    }
  };

  const onClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <Grid className="main">
      <div className="header-title mt-3">
        <span>Đổi quà cho khách hàng: </span>
      </div>

      <hr />
      <div style={{ width: "100%", margin: "0 auto" }}>
        <CustomerSelectComponent
          customerStore={customerStore}
          handleChangeCustomer={handleChangeCustomer}
          auto={auto}
          reload={reload}
        />
        {customer != "" ? (
          <div className="mt-2" style={{ fontWeight: "500" }}>
            <span>Tổng điểm: {customer?.wallet.totalPoint} </span>
            <span className="ml-3">
              Điểm đổi quà: {customer?.wallet.remainPoint}{" "}
            </span>
            {title()}
          </div>
        ) : (
          <></>
        )}
        <hr />
        {use ? (
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
              <div className="mt-1">{noti()}</div>
            </div>
            <div className="details mt-4" style={{ height: "300px " }}>
              <div style={{ width: "100%", padding: "10px" }} className="pt-2">
                <span
                  style={{ fontSize: "20px", color: "white", fontWeight: 500 }}
                >
                  Chi tiết đổi quà
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
                        <span>{customer.customer.name}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <span>Điện thoại:</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>{customer.customer.phoneNumber}</span>
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
                        <span>Số điểm đổi:</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>{config?.giftConfig?.point * quantity}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            style={{
              width: "40%",
              margin: "0 auto",

              padding: "10px",
              backgroundColor: "green",
              color: "white",
            }}
            type="submit"
            className="mt-3 mb-5"
            onClick={handleUseGift}
          >
            Xác nhận
          </Button>
        </div>
      </div>
      <PopupGiftSuccessComponent open={open} onClose={onClose} />
    </Grid>
  );
}
