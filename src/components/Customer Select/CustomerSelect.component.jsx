import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CustomerSelectComponent(props) {
  const [defaultValue, setDefaultValue] = useState();
  useEffect(() => {}, [props.reload]);
  const handleChange = (event, value) => {
    if (value) {
      props.handleChangeCustomer(value);
    } else {
      props.handleChangeCustomer("");
    }
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props?.customerStore}
      defaultValue={defaultValue}
      getOptionLabel={(option) =>
        option.customer.name + " - " + option.customer.phoneNumber
      }
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Chọn khách hàng"
          variant="outlined"
          defaultValue="haha"
        />
      )}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
  );
}
