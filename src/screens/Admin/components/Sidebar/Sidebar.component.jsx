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
import "./sidebar.css";
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
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Đại lý" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={
              classes.nested + (param == "storeManager" ? " active" : "")
            }
            onClick={() => handleClickSlug("storeManager", slug.storeManager)}
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý" />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param == "createStore" ? " active" : "")
            }
            onClick={() => handleClickSlug("createStore", slug.createStore)}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Thêm đại lý" />
          </ListItem>
          <ListItem
            button
            className={classes.nested + (param == "statistic" ? " active" : "")}
            onClick={() => handleClickSlug("statistic", slug.statistic)}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Thống kê" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Nhân viên" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={
              classes.nested + (param == "staffManager" ? " active" : "")
            }
            onClick={() => handleClickSlug("staffManager", slug.staffManager)}
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý" />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param == "createStaff" ? " active" : "")
            }
            onClick={() => handleClickSlug("createStaff", slug.createStaff)}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Tạo tài khoản" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={() => handleClickSlug("customer", slug.customerManager)}
        className={param == "customer" ? "active" : " "}
      >
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Khách hàng" />
      </ListItem>
    </List>
    // </div>
  );
}
