import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../resources/slug";
import DashboardStaffComponent from "../screens/Staff/components/Dashboard/Dashboard-Staff.component";
import SellStaff from "../screens/Staff/screens/Sell Staff/SellStaff";

function StaffRoutes(props) {
  const loading = props.handleLoading;
  return (
    <>
      <Switch>
        <Route
          exact
          path={slug.dashboardStaff}
          render={() => (
            <DashboardStaffComponent handleLoading={props.handleLoading} />
          )}
        />
        <Route
          exact
          path={slug.sell}
          render={() => <SellStaff handleLoading={props.handleLoading} />}
        />
      </Switch>
    </>
  );
}

export default StaffRoutes;
