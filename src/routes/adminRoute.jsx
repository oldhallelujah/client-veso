import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../resources/slug";
import DashboardComponent from "../screens/Admin/components/Dashboard/Dashboard.component";
import StoreManager from "../screens/Admin/screens/Store/StoreManager";
import CreateStore from "../screens/Admin/screens/Create Store/CreateStore";
import DetailsStore from "../screens/Admin/screens/Details Store/DetailsStore";
import CreateStaff from "../screens/Admin/screens/Create Staff/CreateStaff";
import StaffManager from "../screens/Admin/screens/Staff Manager/StaffManager";
import DetailsStaff from "../screens/Admin/screens/Staff Manager/DetailsStaff";
import CustomerManager from "../screens/Admin/screens/Customer Manager/CustomerManger";
import StatisticManager from "../screens/Admin/screens/Statistic Manager/StatisticManager";
import DetailsStatisticStore from "../screens/Admin/screens/Details Statistic Store/DetailsStatisticStore";
import DetailsStatisticCustomer from "../screens/Admin/screens/Details Statistic Customer/DetailsStatisticCustomer";
function AdminRoutes(props) {
  //   <Route exact path={SLUGS.dashboard} component={DashboardComponent} />;
  const loading = props.handleLoading;
  return (
    <>
      <Switch>
        {/* <Route
          exact
          path={slug.dashboard}
          render={() => (
            <DashboardComponent handleLoading={props.handleLoading} />
          )}
        /> */}
        <Route
          exact
          path={slug.storeManager}
          render={() => <StoreManager handleLoading={props.handleLoading} />}
        />
        <Route
          exact
          path={slug.createStore}
          render={() => <CreateStore handleLoading={props.handleLoading} />}
        />
        <Route
          exact
          path={slug.createStaff}
          render={() => <CreateStaff handleLoading={props.handleLoading} />}
        />
        <Route
          exact
          path={slug.staffManager}
          render={() => <StaffManager handleLoading={props.handleLoading} />}
        />
        <Route
          exact
          path={slug.detailsStaff}
          render={(props) => (
            <DetailsStaff
              handleLoading={loading}
              query={props.location.search}
            />
          )}
        />
        <Route
          exact
          path={slug.detailsStore}
          render={(props) => (
            <DetailsStore
              handleLoading={loading}
              query={props.location.search}
            />
          )}
        />
        <Route
          exact
          path={slug.customerManager}
          render={() => <CustomerManager handleLoading={props.handleLoading} />}
        />
        <Route
          exact
          path={slug.statistic}
          render={() => (
            <StatisticManager handleLoading={props.handleLoading} />
          )}
        />

        <Route
          exact
          path={slug.detailsStatistic}
          render={(props) => (
            <DetailsStatisticStore
              handleLoading={loading}
              query={props.location.search}
            />
          )}
        />
        <Route
          exact
          path={slug.detailsStatisticCustomer}
          render={(props) => (
            <DetailsStatisticCustomer
              handleLoading={loading}
              query={props.location.search}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default AdminRoutes;
