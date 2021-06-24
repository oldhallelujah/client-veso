import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./store.css";
import { getAllStore } from "../../../../api/adminAPI";
import CardStoreComponent from "../../../../components/Card Store/CardStore.component";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";
export default function HomeAdmin(props) {
  const history = useHistory();
  const [store, setStore] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);
    await getAllStore().then((res) => {
      setStore(res.data);
      props.handleLoading(false);
    });
  }, []);

  const handleClick = (id) => {
    history.push({ pathname: slug.detailsStore, search: `?id=${id}` });
  };
  const lists = store
    .sort((a, b) => {
      return new Date(b.store.createAt) - new Date(a.store.createAt);
    })
    .map((e, index) => {
      return (
        <Grid
          item
          xs={12}
          key={index}
          className="mt-3"
          onClick={() => handleClick(e.store._id)}
        >
          <CardStoreComponent data={e} />
        </Grid>
      );
    });
  return (
    <Grid container spacing={1} className="main" style={{ marginTop: "20px" }}>
      <div className="title-header">
        <span>Quản lý đại lý - Tổng số ({store.length})</span>
      </div>
      <div className="mt-4" style={{ width: "100%" }}>
        {lists}
      </div>
    </Grid>
  );
}
