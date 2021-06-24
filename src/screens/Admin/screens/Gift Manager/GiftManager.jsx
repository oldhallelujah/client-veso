import React, { useState, useEffect } from "react";
import TableComponent from "../../../../components/Table/Table.component";
import Grid from "@material-ui/core/Grid";
import { statisticGift, getAllCustomer } from "../../../../api/adminAPI";
import CustomerSelectComponent from "../../../../components/Customer Select/CustomerSelect.component";
import moment from "moment";

export default function GiftManager(props) {
  const [gift, setGift] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customerSelect, setCustomerSelect] = useState("");
  useEffect(async () => {
    props.handleLoading(true);
    await statisticGift().then((res) => {
      setGift(res.data);
      props.handleLoading(false);
    });
    await getAllCustomer().then((res) => {
      setCustomer(res.data);
      props.handleLoading(false);
    });
  }, []);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY, LTS");
  };

  const rows = gift
    .filter((gift) => {
      if (customerSelect != "") {
        return gift.customer._id === customerSelect.customer._id;
      } else {
        return gift;
      }
    })
    .map((e, index) => {
      return {
        id: index + 1,
        customer: e.customer.name,
        phoneNumber: e.customer.phoneNumber,
        code: e.gift.gift.number,
        quantity: e.gift.gift.quantity,
        point: e.gift.gift.point,
        store: e.store.storeName,
        staff: e.staff.fullName,
        time: converDate(e.gift.createAt),
      };
    });
  const columns = [
    {
      field: "customer",
      headerName: "Khách hàng",
      width: 160,
    },
    {
      field: "phoneNumber",
      headerName: "Điện thoại",
      width: 150,
    },

    {
      field: "code",
      headerName: "Mã vé",
      width: 145,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 135,
    },
    {
      field: "point",
      headerName: "Điểm",
      width: 120,
    },
    {
      field: "store",
      headerName: "Cửa hàng",
      width: 150,
    },
    {
      field: "staff",
      headerName: "Nhân viên",
      width: 150,
    },
    {
      field: "time",
      headerName: "Thời gian",
      width: 180,
    },
  ];

  const handleChangeCustomer = (value) => {
    setCustomerSelect(value);
  };
  return (
    <Grid className="main">
      <div className="title-header">
        <span>Thống kê đổi quà:</span>
      </div>
      <hr />
      <div className="mt-2">
        <CustomerSelectComponent
          customerStore={customer}
          handleChangeCustomer={handleChangeCustomer}
        />
      </div>
      <hr />
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
