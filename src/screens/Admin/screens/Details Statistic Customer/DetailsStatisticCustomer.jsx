import React, { useState, useEffect } from "react";
import moment from "moment";
import queryString from "query-string";
import { detailsStatisticCustomer } from "../../../../api/adminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import DatePickers from "../../../../components/Date Picker/DatePicker.component";

export default function DetailsStatiscCustomer(props) {
  const search = queryString.parse(props.query);
  const customerID = search.id;
  const [customer, setCustomer] = useState();
  const [dateSelect, setDateSelect] = useState();

  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY, LTS");
  };

  useEffect(async () => {
    props.handleLoading(true);
    await detailsStatisticCustomer(customerID).then((res) => {
      setCustomer(res.data);
      props.handleLoading(false);
    });
  }, [customerID]);

  let rows = [
    {
      id: 0,
      store: "",
      code: "",
      total: 0,
      amount: "",
      staff: "",
      time: "",
    },
  ];
  if (customer) {
    rows = customer.deal
      ?.filter((deal) => {
        if (dateSelect) {
          return moment(deal.deal.created).format("DD/MM/YYYY") === dateSelect;
        } else {
          return deal;
        }
      })
      .sort((a, b) => {
        return new Date(b.deal.created) - new Date(a.deal.created);
      })
      .map((e, index) => {
        return {
          id: index + 1,
          store: e.store.storeName,
          code: e.deal.number,
          total: e.deal.quantity,
          amount: e.deal.amount,
          staff: e.staff.fullName,
          time: converDate(e.deal.created),
        };
      });
  }

  const columns = [
    {
      field: "store",
      headerName: "Cửa hàng",
      width: 160,
    },
    {
      field: "staff",
      headerName: "Nhân viên",
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
      field: "time",
      headerName: "Thời gian",
      width: 200,
    },
  ];

  const handleChangeDate = (date) => {
    setDateSelect(date);
  };
  const total = () => {
    let total = 0;
    for (let item of rows) {
      total = total + item.total;
    }
    return <span>Tổng vé mua: {total}</span>;
  };
  return (
    <Grid className="main">
      <div className="title-header">
        <span>
          Khách hàng: ({" "}
          <span style={{ color: "green" }}>{customer?.customer?.name}</span> )
        </span>
      </div>
      <div className="mt-2 ml-2">
        <span>SDT: {customer?.customer?.phoneNumber}</span>
      </div>
      <div className="mt-2 ml-2 ">
        <span>Tổng điểm: {customer?.wallet?.totalPoint}</span>
        <span className="ml-3">
          Điểm đổi quà: {customer?.wallet?.remainPoint}
        </span>
      </div>
      <hr />
      <div className="mt-3 ml-2">
        <DatePickers handleChangeDate={handleChangeDate} />
      </div>
      <div className="mt-3 ml-2">{total()}</div>
      <hr />
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
