import React, { useState, useEffect } from "react";
import { getProfile } from "../../api/userAPI";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { useHistory } from "react-router-dom";
import slug from "../../resources/slug";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./header.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function HeaderAdminComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = useState({
    address: "",

    fullName: "",
    phoneNumber: "",
    email: "",
    role: "",
  });
  useEffect(async () => {
    await getProfile().then((res) => {
      setUserData(res.data);
    });
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handlChangePassword = () => {
    history.push(slug.changePassword);
    setAnchorEl(null);
  };
  const handleClickHide = () => {
    props.handleClickHide();
  };
  return (
    <div className="wrap-header">
      <div style={{ width: "100%" }}>
        <List dense className={classes.root}>
          <ListItem button onClick={handleClick}>
            <ListItemText primary={userData.fullName} />
          </ListItem>
        </List>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handlChangePassword}>Đổi mật khẩu</MenuItem>
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
