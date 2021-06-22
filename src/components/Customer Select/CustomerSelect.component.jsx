import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CustomerSelectComponent(props) {
  console.log(props);
  const handleChange = (event, value) => {
    props.handleChangeCustomer(value);
  };
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props?.customerStore}
      getOptionLabel={(option) => option.name + " - " + option.phoneNumber}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Chọn khách hàng" variant="outlined" />
      )}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
  );
}
