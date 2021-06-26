import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./store.css";
import { getAllStore } from "../../../../api/adminAPI";
import CardStoreComponent from "../../../../components/Card Store/CardStore.component";
import { useHistory } from "react-router-dom";
import slug from "../../../../resources/slug";
import StoreSelectComponent from "../../../../components/Store Select/StoreSelect.component";
export default function HomeAdmin(props) {
  const history = useHistory();
  const [store, setStore] = useState([]);
  const [storeSelect, setStoreSelect] = useState("");
  useEffect(async () => {
    props.handleLoading(true);
    await getAllStore().then((res) => {
      setStore(res.data);
      props.handleLoading(false);
    });
  }, []);

  const handleChangeStore = (value) => {
    setStoreSelect(value);
  };

  const handleClick = (id) => {
    history.push({ pathname: slug.detailsStore, search: `?id=${id}` });
  };
  const lists = store
    .filter((store) => {
      if (storeSelect === "") {
        return store;
      } else {
        return store.store._id === storeSelect.store._id;
      }
    })
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
    <Grid
      container
      spacing={1}
      className="main"
      style={{ marginTop: "20px", display: "block" }}
    >
      <div className="title-header">
        <span>Quản lý đại lý - Tổng số ({store.length})</span>
      </div>
      <div style={{ width: "100%" }} className="mt-3">
        <StoreSelectComponent
          store={store}
          handleChangeStore={handleChangeStore}
        />
      </div>
      <div className="mt-2" style={{ width: "100%" }}>
        {lists}
      </div>
    </Grid>
  );
}
