import React, { useState, useEffect } from "react";
import TableComponent from "../../../../components/Table/Table.component";
import { getAllCustomer, getSearchPoint } from "../../../../api/adminAPI";
import Grid from "@material-ui/core/Grid";
import CustomerSelectComponent from "../../../../components/Customer Select/CustomerSelect.component";
import Chip from "@material-ui/core/Chip";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";

export default function CustomerManager(props) {
  const history = useHistory();
  const [customer, setCustomer] = useState([]);
  const [customerSelect, setCustomerSelect] = useState("");
  const [search, setSearch] = useState("");
  const [point, setPoint] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);
    await getAllCustomer().then((res) => {
      setCustomer(res.data);
    });
    await getSearchPoint().then((res) => {
      setPoint(res.data.listsPoint);
      props.handleLoading(false);
    });
  }, []);

  const handleClickDetails = (id) => {
    history.push({
      pathname: slug.detailsStatisticCustomer,
      search: `?id=${id}`,
    });
  };

  const rows = customer
    .filter((customer) => {
      if (customerSelect !== "" || search !== "") {
        if (customerSelect != "" && search == "") {
          return customer.customer._id === customerSelect;
        } else if (customerSelect == "" && search != "") {
          if (search === "all") {
            return customer;
          } else {
            return customer.wallet.totalPoint >= search;
          }
        } else {
          return customer.customer._id === customerSelect;
        }
      } else {
        return customer;
      }
    })
    .sort((a, b) => {
      return new Date(b.customer.createAt) - new Date(a.customer.createAt);
    })
    .map((e, index) => {
      return {
        id: index + 1,
        customer: e.customer,
        phoneNumber: e.customer.phoneNumber,
        totalPoint: e.wallet.totalPoint,
        remainPoint: e.wallet.remainPoint,
      };
    });
  const columns = [
    {
      field: "customer",
      headerName: "Khách hàng",
      width: 160,
      renderCell: (customer) => {
        return (
          <span
            style={{ color: "blue" }}
            onClick={() => handleClickDetails(customer.row.customer._id)}
          >
            {customer.row.customer.name}
          </span>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Điện thoại",
      width: 150,
    },

    {
      field: "totalPoint",
      headerName: "Tổng điểm",
      width: 145,
    },
    {
      field: "remainPoint",
      headerName: "Điểm đổi quà",
      width: 180,
    },
  ];

  const handleChangeCustomer = (value) => {
    if (value) {
      setCustomerSelect(value.customer._id);
    } else {
      setCustomerSelect("");
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };

  const lists = point
    .sort((a, b) => {
      return a.point - b.point;
    })
    .map((e, index) => {
      return (
        <Chip
          variant="outlined"
          size="small"
          style={{ color: "green" }}
          label={"> " + e.point + " điểm"}
          className={"ml-2 mt-2 " + (search === e.point ? "active" : "")}
          onClick={() => {
            handleSearch(e.point);
          }}
          key={index}
        />
      );
    });

  return (
    <Grid className="main">
      <div className="title-header">
        <span>Thống kê Khách hàng:</span>
      </div>
      <hr />
      <div className="mt-3">
        <CustomerSelectComponent
          customerStore={customer}
          handleChangeCustomer={handleChangeCustomer}
        />
      </div>
      <div className="mt-2">
        <Chip
          variant="outlined"
          size="small"
          style={{ color: "green" }}
          label="Tất cả"
          onClick={() => {
            handleSearch("all");
          }}
          className={" mt-2 " + (search === "all" || "" ? "active" : "")}
        />
        {lists}
      </div>
      <hr />
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
