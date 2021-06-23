import React, { useState, useEffect } from "react";
import moment from "moment";
import queryString from "query-string";
import { detailsStatisticStore } from "../../../../api/adminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";

export default function DetailsStaff(props) {
  const search = queryString.parse(props.query);
  const storeID = search.id;
  const [store, setStore] = useState([]);
  useEffect(async () => {
    await detailsStatisticStore(storeID).then((res) => {
      setStore(res.data);
      props.handleLoading(false);
    });
  }, []);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY, LTS");
  };

  console.log(store);

  const rows = store.deal.map((e, index) => {
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
  return (
    <Grid className="main">
      <div className="title-header">
        <span>Thống kê đại lý: ( {store.store.storeName} )</span>
      </div>
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
