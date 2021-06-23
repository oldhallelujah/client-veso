import React, { useState, useEffect } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import Checkbox from "@material-ui/core/Checkbox";
export default function DateComponent(props) {
  console.log(props);
  const [lists, setLists] = useState();
  useEffect(() => {
    const date = new Date(Date.now());
    const month = date.getMonth();
    const year = date.getFullYear();
    function getDaysInMonthUTC(month, year) {
      var date = new Date(Date.UTC(year, month, 1));
      var days = [];
      while (date.getUTCMonth() === month) {
        days.push(new Date(date));
        date.setUTCDate(date.getUTCDate() + 1);
      }
      return days;
    }
    let arr = [];
    const lists = getDaysInMonthUTC(month, year);
    for (let item of lists) {
      arr.push(moment(item).format("DD/MM/YYYY"));
    }
    setLists(arr);
  }, []);

  const listsDate = lists?.map((e, index) => {
    let checked = false;
    let id;
    for (let item of props.schedule?.listsDate) {
      if (e === item.date) {
        checked = true;
        id = item._id;
      }
    }
    return (
      <Grid item xs={6}>
        <Grid container spacing={0}>
          <Grid item xs={9} style={{ padding: "10px" }}>
            <span>{e}</span>
          </Grid>
          <Grid item xs={3}>
            {checked ? (
              <Checkbox
                name="checkedB"
                style={{ color: "green" }}
                key={index}
                checked={checked}
              />
            ) : (
              <Checkbox
                name="checkedB"
                style={{ color: "green" }}
                key={index}
                checked={checked}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <div>
      <Grid container spacing={3}>
        {listsDate}
      </Grid>
    </div>
  );
}
