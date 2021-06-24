import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { getSchedule } from "../../../../api/adminAPI";
import { getUserID } from "../../../../api/staffAPI";
import DateComponent from "../../components/Schedule/Date.component";
import MonthComponent from "../../components/Schedule/Month.component";
export default function ScheduleStaff(props) {
  const [schedule, setSchedule] = useState({ listsDate: [], listsMonth: [] });

  const [month, setMonth] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getSchedule(getUserID()).then((res) => {
      console.log(res.data);
      setSchedule(res.data);
      if (res.data.listsMonth.length === 0) {
        setMonth(false);
      } else {
        setMonth(true);
      }
      props.handleLoading(false);
    });
  }, []);
  console.log(month);
  return (
    <Grid className="main">
      <h4>Lịch trực của bạn:</h4>
      <div className="mt-3">
        {month ? (
          <MonthComponent schedule={schedule} />
        ) : (
          <DateComponent schedule={schedule} />
        )}
      </div>
    </Grid>
  );
}
