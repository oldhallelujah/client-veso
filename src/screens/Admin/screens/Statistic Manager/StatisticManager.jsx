import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { statisticStore } from "../../../../api/adminAPI";
import Chip from "@material-ui/core/Chip";
import TableComponent from "../../../../components/Table/Table.component";
import StoreSelectComponent from "../../../../components/Store Select/StoreSelect.component";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";

export default function StatisticManager(props) {
  const history = useHistory();
  const [store, setStore] = useState([]);
  const [storeSelectID, setStoreSelectID] = useState("");
  useEffect(async () => {
    props.handleLoading(true);

    await statisticStore().then((res) => {
      setStore(res.data);
      props.handleLoading(false);
    });
  }, []);

  const handleClick = (storeID) => {
    history.push({ pathname: slug.detailsStatistic, search: `?id=${storeID}` });
  };

  const columns = [
    {
      field: "store",
      headerName: "Đại lý",
      width: 115,
      renderCell: (store) => {
        return (
          <span
            style={{ color: "blue" }}
            onClick={() => handleClick(store.row.store._id)}
          >
            {store.row.store.storeName}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (status) => {
        if (status.row.status) {
          return (
            <Chip
              variant="outlined"
              size="small"
              style={{ color: "green" }}
              label="Hoạt động"
            />
          );
        } else {
          return (
            <Chip
              variant="outlined"
              size="small"
              color="secondary"
              label="Ngưng hoạt động"
            />
          );
        }
      },
    },
    {
      field: "total",
      headerName: "Tổng số vé",
      width: 150,
    },
  ];
  console.log(store);

  const rows = store
    .filter((store) => {
      if (storeSelectID !== "") {
        return store.store._id === storeSelectID;
      } else {
        return store;
      }
    })
    .map((e, index) => {
      let total = 0;
      for (let item of e.deal) {
        total = total + item.quantity;
      }
      return {
        id: index + 1,
        store: e.store,
        status: e.store.activate,
        total: total,
      };
    });

  const handleChangeStore = (store) => {
    if (store) {
      setStoreSelectID(store.store._id);
    } else {
      setStoreSelectID("");
    }
  };
  return (
    <Grid className="main">
      <div className="title-header">
        <span>Thống kê đại lý:</span>
      </div>
      <div className="mt-3">
        <StoreSelectComponent
          store={store}
          handleChangeStore={handleChangeStore}
        />
      </div>
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
