import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDetailsStaff } from "../../../../api/adminAPI";
import queryString from "query-string";

import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import TabStaffComponent from "../../components/Tabs/TabStaff.component";
import "./staff.css";
export default function DetailsStaff(props) {
  const search = queryString.parse(props.query);
  const staffID = search.id;
  const [staff, setStaff] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getDetailsStaff(staffID).then((res) => {
      setStaff(res.data);
      props.handleLoading(false);
    });
  }, [staffID, reload]);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const handleReload = () => {
    setReload(!reload);
  };
  return (
    <div>
      <div className="header-profile mt-3">
        <div className="profile-img">
          <span>{staff?.staff.fullName}</span>
        </div>
        <div className="profile-date mt-3">
          <EventAvailableIcon style={{ color: "white" }} />
          <span className="ml-2">{converDate(staff?.staff.createAt)}</span>
        </div>
      </div>
      <div className="tabs-staff">
        <TabStaffComponent data={staff} handleReload={handleReload} />
      </div>
    </div>
  );
}
