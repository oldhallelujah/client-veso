import React, { useState, useEffect } from "react";
import vi from "date-fns/locale/vi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function DatePickers(props) {
  const [startDate, setStartDate] = useState();
  const onChangeDate = (date) => {
    const time = moment(date).format("DD/MM/YYYY");
    setStartDate(time);
    props.handleChangeDate(time);
  };
  return (
    <div>
      <span>Chọn thời gian: </span>
      <DatePicker
        value={startDate}
        onChange={(date) => onChangeDate(date)}
        style={{ borderRadius: "6px", padding: "10px" }}
        locale={vi}
        className="ml-2"
      />
    </div>
  );
}
