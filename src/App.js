import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

import history from "./history";

import styled from "styled-components";
import "./App.css";
import GlobalTheme from "./contextProviders/globalThemeProvider";
import Loader from "./sharedComponents/Loader";
import AuthProvider, { useAuth } from "./contextProviders/authProvider";
import NavigationProvider from "./contextProviders/navigationProvider";
import outsideAuthApi from "./services/outsideAuthApi";
import insideAuthApi from "./services/insideAuthApi";
import FooterComponent from "./sharedComponents/Footer";
import { Button } from "./sharedComponents/button";
import { Modal } from "./sharedComponents/Modal";
import { routes } from "./constants/routes";
import { defaultValues } from "./constants/defaultValues";

const AuthRouter = React.lazy(() => import("./AuthRouter"));
const NoAuthRouter = React.lazy(() => import("./NoAuthRouter"));

const MainWrapper = styled.div`
  margin: 82px 0 180px 0;
`;

function decideSessionRoutes(loggedInUser) {
  return loggedInUser && !loggedInUser.pendingAuth ? (
    <AuthRouter />
  ) : (
    <NoAuthRouter />
  );
}

export const AppWrapper = ({ customHistory }) => {
  const { loggedInUser, clearLoggedInUserInfo } = useAuth();
  const location = useLocation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [logoutLoader, setLogoutLoader] = useState(false);
  function infoModalHandleOK() {
    setLogoutLoader(true);
    let tokenHeaders = { Authorization: `JWT ${loggedInUser.token}` };

    insideAuthApi(tokenHeaders)
      .signOut()
      .then(() => {
        setLogoutLoader(false);
        setLogoutModalVisible(false);
        clearLoggedInUserInfo();
      })
      .catch(() => {
        setLogoutLoader(false);

        clearLoggedInUserInfo();
        setLogoutModalVisible(false);
      });
  }

  function handleOnActive(e) {
    // console.log('user is active', e)
    // console.log('time remaining', getRemainingTime())  //DO NOT REMOVE THE CODE
  }

  function handleOnIdle(e) {
    // console.log('user is idle', e)
    let savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      savedUser = JSON.parse(savedUser);
      if (savedUser && savedUser.token) {
        setLogoutModalVisible(true);
      }
    }
    // console.log('last active', getLastActiveTime()) //DO NOT REMOVE THE CODE
  }

  function handleOnAction(e) {
    // console.log('user did something',  e) //DO NOT REMOVE THE CODE
  }
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * defaultValues.appAutoLogOutTime,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  // useEffect(() => {
  //   let savedUser = localStorage.getItem("loggedInUser");
  //   if (savedUser) {
  //     savedUser = JSON.parse(savedUser);
  //     if (savedUser && savedUser.token) {
  //       history.push(routes.root);
  //     }
  //   }
  // }, [location.pathname]);
  return (
    <React.Suspense fallback={<Loader />}>
      <Modal
        name=""
        title="Session Time Out"
        visible={logoutModalVisible}
        closable={false}
        centered
        width={468}
        footer={[
          <Button
            size={"md-2"}
            key="Ok"
            loading={logoutLoader}
            onClick={() => infoModalHandleOK()}
          >
            OK
          </Button>,
        ]}
      >
        <div className="text-center"> Your session has timed out.</div>
        <div className="text-center">
          {" "}
          You will be redirected to the login screen
        </div>
      </Modal>
      {loggedInUser && !loggedInUser.pendingAuth ? (
        <React.Fragment>
          <MainWrapper>
            <AuthRouter />
          </MainWrapper>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MainWrapper>
            {" "}
            <NoAuthRouter />
          </MainWrapper>
        </React.Fragment>
      )}
      <FooterComponent />
    </React.Suspense>
  );
};

function App() {
  return (
    <NavigationProvider history={history} routes={routes}>
      <BrowserRouter history={history}>
        <AuthProvider
          routes={routes}
          outsideAuthApi={outsideAuthApi}
          insideAuthApi={insideAuthApi}
        >
          <GlobalTheme>
            <AppWrapper />
          </GlobalTheme>
        </AuthProvider>
      </BrowserRouter>
    </NavigationProvider>
  );
}
export default App;
