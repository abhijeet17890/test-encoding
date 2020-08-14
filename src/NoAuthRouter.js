import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation, withRouter,
} from "react-router-dom";

import ErrorProvider from "../src/contextProviders/errorProvider";
import { useNav } from "../src/contextProviders/navigationProvider";
// import { routes } from '../src/constants/routes'

import SignUp from "./views/userRegistration/signUp";
import EmailVerification from "./views/userRegistration/emailVerification";
import SignIn from "./views/userOnBoarding/signIn";
import SignInVerification from "./views/userOnBoarding/signInVerification";
import ForgotPassword from "./views/resetPassword/forgotPassword";
import NewPassword from "./views/resetPassword/newPassword";
import ResetPassVerification from "./views/resetPassword/resetPassVerification";
import PasswordResetSuccess from "./views/resetPassword/passwordResetSuccess";
import HeaderComponent from "./sharedComponents/Header";
import { useAuth } from "./contextProviders/authProvider";
import SampleComponent from "./views/SampleComponent";

const NoAuthRouter = function (props) {
  const history = useHistory();
  const location = useLocation();
  const { routes, neutralizeOnClickBack } = useNav();
  const { loggedInUser } = useAuth();
  const restrictBackBtnRoutes = [
    routes.noAuthRoutes.emailVerification,
    routes.noAuthRoutes.signInVerification,
    routes.noAuthRoutes.forgotPassword,
    routes.noAuthRoutes.resetPassVerification,
  ];
  useEffect(() => {
    // console.log("no auth router location->",location);
    // console.log("no auth router history->",history);

    // if (restrictBackBtnRoutes.includes(location.pathname)) {
      neutralizeOnClickBack(location, history, function () {});
    // }
    let savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      savedUser = JSON.parse(savedUser);
      if (savedUser && savedUser.token) {
        history.go(1); // TODO should be send to auth router home page according to user role
      }
    }
  }, [location.pathname]);
  return (
    <ErrorProvider>
      <HeaderComponent user={loggedInUser} />
      <Switch>
        <Route
          exact
          path={routes.root}
          render={() => <Redirect to={routes.noAuthRoutes.signIn} />}
        />{" "}
        {/* render={() => <Redirect to={routes.noAuthRoutes.signIn} />} */}
        {/*<Route
                            path={routes.root}
                            component={RouteParent}
                        />*/}
        <Route path={routes.noAuthRoutes.signIn} component={SignIn} />
        <Route path={routes.noAuthRoutes.signUp} component={SignUp} />
        <Route
          path={routes.noAuthRoutes.emailVerification}
          component={EmailVerification}
        />
        <Route
          path={routes.noAuthRoutes.signInVerification}
          component={SignInVerification}
        />
        <Route
          path={routes.noAuthRoutes.forgotPassword}
          component={ForgotPassword}
        />
        <Route path={routes.noAuthRoutes.newPassword} component={NewPassword} />
        <Route
          path={routes.noAuthRoutes.resetPassVerification}
          component={ResetPassVerification}
        />
        <Route
          path={routes.noAuthRoutes.passwordResetSuccess}
          component={PasswordResetSuccess}
        />
        <Route path={"/theme"} component={SampleComponent} /> //temporary
        <Route component={() => <Redirect to={routes.noAuthRoutes.signIn} />} />
      </Switch>
    </ErrorProvider>
  );
}
export default NoAuthRouter;
