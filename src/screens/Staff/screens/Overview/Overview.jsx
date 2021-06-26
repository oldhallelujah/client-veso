import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getDetailsStaff,
  detailsStatisticStore,
} from "../../../../api/adminAPI";
import { getUserID } from "../../../../api/staffAPI";
import moment from "moment";
import TableComponent from "../../../../components/Table/Table.component";
export default function Overview(props) {
  const [deal, setDeal] = useState([]);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY, LTS");
  };
  useEffect(async () => {
    let storeID;
    await getDetailsStaff(getUserID()).then((res) => {
      storeID = res.data.store._id;
    });
    await detailsStatisticStore(storeID).then((res) => {
      setDeal(res.data);
    });
  }, []);

  let rows = [
    {
      id: 0,
      customer: "",
      code: "",
      total: 0,
      amount: "",
      staff: "",
      time: "",
    },
  ];
  if (deal.length !== 0) {
    rows = deal.deal
      ?.filter((date) => {
        return (
          moment(date.deal.deal.created).format("DD/MM/YYYY") ===
          moment(Date.now()).format("DD/MM/YYYY")
        );
      })
      .map((e, index) => {
        return {
          id: index + 1,
          customer: e.customer.name,
          code: e.deal.deal.number,
          total: e.deal.deal.quantity,
          amount: e.deal.deal.amount,
          staff: e.staff.fullName,
          time: converDate(e.deal.deal.created),
        };
      });
  }
  const columns = [
    {
      field: "customer",
      headerName: "Khách hàng",
      width: 160,
    },
    {
      field: "code",
      headerName: "Mã vé",
      width: 160,
    },
    {
      field: "total",
      headerName: "Số lượng",
      width: 140,
    },
    {
      field: "amount",
      headerName: "Tổng tiền",
      width: 160,
    },
    {
      field: "staff",
      headerName: "Nhân viên",
      width: 160,
    },
    {
      field: "time",
      headerName: "Thời gian",
      width: 200,
    },
  ];

  const total = () => {
    let total = 0;
    for (let item of rows) {
      total = total + item.total;
    }
    return <span>Tổng vé bán được: {total}</span>;
  };
  return (
    <Grid className="main">
      <h4>Thống kê ngày hôm nay:</h4>
      <div className="mt-3">{total()}</div>
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
