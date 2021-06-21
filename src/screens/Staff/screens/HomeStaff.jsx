import React, { useState, useEffect } from "react";
import HeaderComponent from "../../../components/Header/Header.component";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AdminRoutes from "../../../routes/adminRoute.jsx";
import SideBarComponent from "../../Admin/components/Sidebar/Sidebar.component";
import LoadingComponent from "../../../components/Loading/Loading.component";
import { checkSchedule } from "../../../auth/auth";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}));

export default function HomeStaff(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const handleLoading = (status) => {
    setShowLoading(status);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(async () => {
    const check = await checkSchedule();
    if (!check) {
      alert("Bạn chưa có lịch trực cho ngày hôm nay");
    }
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div style={{ textAlign: "center", fontSize: "22px", padding: "15px" }}>
          <span style={{ fontWeight: "600" }}>Vé Số Nhật Tiến</span>
        </div>
      </div>
      <Divider />
      <SideBarComponent handleDrawerToggle={handleDrawerToggle} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: "100%" }}>
            <HeaderComponent />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        className={classes.content}
        style={{ width: "100%", backgroundColor: "white", height: "900px" }}
      >
        <div className={classes.toolbar} />
        <AdminRoutes handleLoading={handleLoading} data={props} />
        {showLoading ? <LoadingComponent /> : <></>}
      </main>
    </div>
  );
}
