import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateSelectComponent from "../../screens/Admin/components/Date Select/DateSelect.component";
import MonthSelectComponent from "../../screens/Admin/components/Month Select/MonthSelect.component";
import { getSchedule } from "../../api/adminAPI";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ScheduleStaffComponent(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const [schedule, setSchedule] = useState({ listsDate: [], listsMonth: [] });
  const [month, setMonth] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    await getSchedule(props.data?.staff._id).then((res) => {
      setSchedule(res.data);
      if (res.data.listsMonth.length === 0) {
        setMonth(false);
      } else {
        setMonth(true);
      }
    });
  }, [props.data?.staff._id, reload]);

  console.log(month);
  const handleChange = (event) => {
    if (event.target.value == "false") {
      setMonth(false);
    } else {
      setMonth(true);
    }
  };

  const handleReload = () => {
    setReload(!reload);
    props.handleReload();
  };
  return (
    <div>
      <div className="header-title" style={{ textAlign: "center" }}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Lịch</InputLabel>
          <Select
            native
            value={month}
            onChange={handleChange}
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={false}>Theo ngày</option>
            <option value={true}>Theo tháng</option>
          </Select>
        </FormControl>
      </div>
      <div>
        {month ? (
          <MonthSelectComponent
            schedule={schedule}
            handleReload={handleReload}
          />
        ) : (
          <DateSelectComponent
            schedule={schedule}
            handleReload={handleReload}
          />
        )}
      </div>
    </div>
  );
}
