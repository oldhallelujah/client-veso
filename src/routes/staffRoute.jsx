import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../resources/slug";
import DashboardStaffComponent from "../screens/Staff/components/Dashboard/Dashboard-Staff.component";
import SellStaff from "../screens/Staff/screens/Sell Staff/SellStaff";
import StoreStaff from "../screens/Staff/screens/Store Staff/StoreStaff";
import ScheduleStaff from "../screens/Staff/screens/Schedule Staff/ScheduleStaff";
import GiftStaff from "../screens/Staff/screens/Gift Staff/GiftStaff";

function StaffRoutes(props) {
  const loading = props.handleLoading;
  return (
    <>
      {props.store ? (
        <Switch>
          <Route
            exact
            path={slug.sell}
            render={() => <SellStaff handleLoading={props.handleLoading} />}
          />
          <Route
            exact
            path={slug.storeStaff}
            render={() => <StoreStaff handleLoading={props.handleLoading} />}
          />
          <Route
            exact
            path={slug.gift}
            render={() => <GiftStaff handleLoading={props.handleLoading} />}
          />
          <Route
            exact
            path={slug.schedule}
            render={() => <ScheduleStaff handleLoading={props.handleLoading} />}
          />
        </Switch>
      ) : (
        <div style={{ padding: "20px" }}>
          <span style={{ color: "red", fontSize: "17px" }}>
            Cửa hàng bạn không hoạt động
          </span>
        </div>
      )}
    </>
  );
}

export default StaffRoutes;
