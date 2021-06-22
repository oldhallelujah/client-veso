import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import "./sidebar.css";
import slug from "../../../../resources/slug";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function SideBarComponent(props) {
  const history = useHistory();
  const classes = useStyles();

  const [param, setParam] = React.useState("overview");
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  const handleClickSlug = (param, url) => {
    props.handleDrawerToggle();
    setParam(param);
    history.push(url);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  return (
    // <div>
    //   <div className="header-logo">
    //     <img src={logo} alt="" width="100%" />
    //   </div>
    <List>
      <ListItem
        button
        onClick={() => handleClickSlug("overview", slug.dashboard)}
        className={param == "overview" ? "active" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Tổng quát" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("sell", slug.sell)}
        className={param == "sell" ? "sell" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Bán vé" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("store", slug.storeStaff)}
        className={param == "store" ? "store" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Đại lý" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("customer", slug.customer)}
        className={param == "customer" ? "customer" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Khách hàng" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlug("customer", slug.StaffSchedule)}
        className={param == "schedule" ? "customer" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Lịch trực" />
      </ListItem>
    </List>
    // </div>
  );
}
