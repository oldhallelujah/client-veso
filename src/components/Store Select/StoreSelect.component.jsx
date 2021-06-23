import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function StoreSelectComponent(props) {
  const [defaultValue, setDefaultValue] = useState();
  const handleChange = (event, value) => {
    console.log(value);
    props.handleChangeStore(value);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props?.store}
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.store.storeName}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tìm đại lý"
          variant="outlined"
          defaultValue="haha"
        />
      )}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
  );
}
