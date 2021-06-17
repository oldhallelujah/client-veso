import { Redirect, Route, Switch } from "react-router-dom";
import slug from "../resources/slug";
import DashboardComponent from "../screens/Admin/components/Dashboard/Dashboard.component";
import StoreManager from "../screens/Admin/screens/Store/StoreManager";
import CreateStore from "../screens/Admin/screens/Create Store/CreateStore";
import DetailsStore from "../screens/Admin/screens/Details Store/DetailsStore";
function AdminRoutes(props) {
  //   <Route exact path={SLUGS.dashboard} component={DashboardComponent} />;
  const loading = props.handleLoading;
  return (
    <>
      <Switch>
        <Route
          exact
          path={slug.dashboard}
          render={() => (
            <DashboardComponent handleLoading={props.handleLoading} />
          )}
        />
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
          path={slug.detailsAuthor}
          render={(props) => (
            <DetailsStore
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
