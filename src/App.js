import "./App.css";
import { Route, Redirect, HashRouter } from "react-router-dom";
import { isLoggedIn, checkRole } from "./auth/auth";

import HomeAdmin from "./screens/Admin/screens/Home-Admin";
import HomeStaff from "./screens/Staff/screens/HomeStaff";
import HomeLogin from "./screens/Login/screens/HomeLogin";
import ChangePassword from "./screens/Change Password/screens/ChangePassword";
function App() {
  console.log(isLoggedIn());
  return (
    <HashRouter>
      <Route path="/auth/login" component={HomeLogin}></Route>
      <Route
        path="/admin"
        render={() =>
          isLoggedIn() && checkRole("admin") ? (
            <HomeAdmin />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      ></Route>

      <Route
        path="/staff"
        render={() =>
          isLoggedIn() && checkRole("staff") ? (
            <HomeStaff />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      ></Route>
      <Route
        path="/auth/change-password"
        render={() =>
          isLoggedIn() ? <ChangePassword /> : <Redirect to="/auth/login" />
        }
      ></Route>
    </HashRouter>
  );
}

export default App;
