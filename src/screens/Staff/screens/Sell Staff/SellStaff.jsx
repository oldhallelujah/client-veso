import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../style.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CustomerSelectComponent from "../../../../components/Customer Select/CustomerSelect.component";
import {
  getAllCustomer,
  getConfig,
  getDetailsStaff,
} from "../../../../api/adminAPI";
import AddCustomerComponent from "../../../../components/Add Customer/AddCustomer.component";
import PopupDealSuccessComponent from "../../../../components/Popup Deal/PopupDealSuccess.component";
import { addDeal, getUserID } from "../../../../api/staffAPI";
export default function SellStaff(props) {
  const [customerStore, setCustomerStore] = useState([]);
  const [storeID, setStoreID] = useState();
  const [customer, setCustomer] = useState("");
  const [quantity, setQuantity] = useState();
  const [money, setMoney] = useState(0);
  const [code, setCode] = useState();
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [reload, setReload] = useState(false);
  const [auto, setAuto] = useState(false);
  const [config, setConfig] = useState();
  const [point, setPoint] = useState(0);
  const [usePoint, setUsePoint] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);

    await getAllCustomer().then((res) => {
      console.log(res.data);
      const list = res.data.sort((a, b) => {
        console.log(a);
        console.log(b);
        return new Date(b.customer.createAt) - new Date(a.customer.createAt);
      });
      setCustomerStore(list);
      console.log(res);
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

  useEffect(() => {
    const pointPlus =
      (money / config?.pointConfig.money) * config?.pointConfig.point;
    setPoint(pointPlus);
  }, [money]);

  const handleChangeCustomer = (value) => {
    setCustomer(value);
  };
  const hanldeChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
    setMoney(event.target.value * 10000);
  };
  const handleClickAdd = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleReload = () => {
    setOpen(false);
    setAuto(true);
    setReload(!reload);
  };

  const title = () => {
    if (customer !== "") {
      if (customer?.wallet?.remainPoint >= config?.giftConfig?.point) {
        return <span style={{ color: "green" }}>Đủ điểm để đổi quà</span>;
      } else {
        return <span style={{ color: "red" }}>Chưa đủ điểm đổi quà</span>;
      }
    } else {
      return <></>;
    }
  };
  const handleAddDeal = async () => {
    const data = {
      customerID: customer.customer._id,
      data: [
        {
          number: code,
          quantity: quantity,
          amount: money,
          storeID: storeID,
          staffID: getUserID(),
        },
      ],
    };
    await addDeal(data).then((res) => {
      console.log(res);
      if (customer?.wallet?.remainPoint + point >= config?.giftConfig?.point) {
        setUsePoint(true);
      }
      setOpenPopup(true);
    });
  };

  const onClosePopup = () => {
    setOpenPopup(false);
    window.location.reload();
  };
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
          auto={auto}
        />
      </div>
      <div className="mt-2">{title()}</div>
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
                      <span>Tổng tiền:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{money} đ</span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Điểm cộng</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{point} </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <hr />
            <div style={{ width: "100%", padding: "10px" }}>
              <span
                style={{ fontSize: "20px", color: "white", fontWeight: 500 }}
              >
                Điểm tích lũy hiện tại
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
                      <span>Tổng điểm:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{customer?.wallet.totalPoint}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <span>Điểm đổi quà:</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span>{customer?.wallet.remainPoint}</span>
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
          onClick={handleAddDeal}
        >
          Xác nhận
        </Button>
      </div>
      <AddCustomerComponent
        open={open}
        onClose={onClose}
        storeID={storeID}
        handleReload={handleReload}
      />
      <PopupDealSuccessComponent
        open={openPopup}
        onClose={onClosePopup}
        handleReload={handleReload}
        usePoint={usePoint}
      />
    </Grid>
  );
}
