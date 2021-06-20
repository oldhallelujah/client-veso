import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfileStaffComponent from "../../../../components/Profile/Profile-Staff.component";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function TabStaff(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Thông tin" />
          <Tab label="Cửa hàng" />
          <Tab label="Lịch trực" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="tabs-content">
        {/* <ProfileComponent data={props.data} handleReload={props.handleReload} /> */}
        <ProfileStaffComponent
          data={props.data}
          handleReload={props.handleReload}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <CategoryAuthor data={props.data} handleReload={props.handleReload} /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <TableNewsAuthorComponent
          data={props.data}
          handleReload={props.handleReload}
        /> */}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </div>
  );
}
