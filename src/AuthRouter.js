import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  withRouter,
  useHistory,
  useLocation
} from "react-router-dom";

import ErrorProvider from "../src/contextProviders/errorProvider";
import { useNav } from "./contextProviders/navigationProvider";
import ApiProvider from "../src/contextProviders/apiProvider";
import { useAuth } from "./contextProviders/authProvider";
import insideAuthApi from "./services/insideAuthApi";
import MyList from "./views/Watchlists/MyList/index";
import Watchlists from "./views/Watchlists/index";
import PersonalInformation from "./views/Profile/PersonalInformation/index";
import InvestmentProfile from "./views/Profile/InvestmentProfile/index";
import PlanSelectionScreen from "./views/Plan Selection/Select Plan Screen";
import PaymentScreen from "./views/Plan Selection/Payment Screen";
import PaymentSuccessfulScreen from "./views/Plan Selection/Payment Successful";
import Disclosures from "./views/kyc/customerKyc/disclosures";
import KycProcess from "./views/kyc/customerKyc";
import StockSearch from "./views/StockSearch";
import StockSearchContainer from "./views/StockSearch/Common/StockSearchContainer";
import ProductDetailPage from "./views/ProductDetails";
import AdvisorSelection from "./views/Advisor Selection/index";
import KycThankYou from "./views/kycThankYou";
import AccountOverview from "./views/accountOverview";
import HeaderComponent from "./sharedComponents/Header";
import AdviserDashboard from "./views/AdvisorDashboard";
import ListRM from "./views/RMManagement/ListRM";
import ViewRM from "./views/RMManagement/ViewRM";
import EditRM from "./views/RMManagement/EditRM";
import AddRM from "./views/RMManagement/AddRM";
import Invest from "./views/Invest/index";
import SelectFundsRegister from "./views/SelectFunds/Register";
import SelectFundsThankYou from "./views/SelectFunds/ThankYou";
import TransactionHistory from "./views/TransactionHistory/index";
import ClientList from "./views/ClientList/index";
import RecommendedPortfolios from "./views/recommendedPortfolios";
import AdvisorProfile from "./views/AdvisorProfile";
import AdvisorKyc from "./views/kyc/advisorKycProcess";
import AdvisorKycDisclosures from "./views/kyc/advisorKycProcess/disclosures";
import AdvisorKycDisclosureLink from "./views/kyc/advisorKycProcess/disclosures/disclosureLink";
import OrderConfirmation from "./views/Invest/OrderReview";
import OrderHistory from "./views/OrderHistory";
import ClientDetails from "./views/clientDetails";
import ClientKyc from "./views/kyc/clientKyc";
import AdvisorHome from "./views/advisorHome";
import AddMoney from "./views/AddMoney/index";
import PortfolioOverview from './views/PortfolioOverview/index';
// import AfterAuthRoot from "./views/AfterAuthRoot";
import RMProfile from "./views/RMProfile";
import WithdrawMoney from "./views/Withdrawal/Money";
import NewPassword from "./views/resetPassword/newPassword";
import RouteParent from "./views/RouteParent";
import AddBank from "./views/Withdrawal/AddBank";
import BankDetails from "./views/Withdrawal/BankDetails";

const AuthRouter = function (props) {
  const { routes, neutralizeOnClickBack } = useNav();
  const location = useLocation();
  const history = useHistory();
  const restrictBackBtnRoutes = [
    routes.authRoutes.planSelection,
    routes.authRoutes.planPurchaseSuccess,
    routes.authRoutes.advisorSelection,
    routes.authRoutes.kycProcess,
    routes.authRoutes.advisorKyc,
    routes.authRoutes.kycThankYou
  ];
  const { loggedInUser } = useAuth();

  // const userType = // TEMP CODE DO NOT REMOVE
  //   loggedInUser && loggedInUser.groups
  //     ? loggedInUser.groups[0].name.toLowerCase().replace(/ /g, "_")
  //     : "";
  //
  // window.addEventListener("popstate", () => { // TEMP CODE DO NOT REMOVE THIS CODE
  //   history.go(1);
  // });

  // window.history.pushState(null, document.title, window.location.href); // TEMP CODE DO NOT REMOVE THIS CODE
  // window.addEventListener('popstate', function (event){
  //   window.history.pushState(null, document.title,  window.location.href);
  // });

  // const neutralizeOnClickBack = callback => { // TEMP CODE DO NOT REMOVE THIS CODE
  //
  //   console.log(location.state);
  //
  //   const stateCopy = { ...location.state };
  //   // window.history.pushState(location.state, "", window.location.href);
  //   // window.onpopstate = () => {
  //   //   window.history.pushState(location.state, "", window.location.href);
  //   //   callback();
  //   // };
  //
  //   // window.addEventListener("popstate", () => {
  //   //   history.go(1);
  //   // });
  //
  // };
  //
  //

  useEffect(() => {
    // debugger
    // if (restrictBackBtnRoutes.includes(location.pathname)) {
      neutralizeOnClickBack(location, history, function () {});
    // }
  }, [location.pathname]);
  return (
    <React.Suspense fallback={<Placeholder />}>
      <ErrorProvider>
        <ApiProvider insideAuthApi={insideAuthApi}>
          <HeaderComponent user={loggedInUser} />
          <Switch>
            {/* <Route
                            exact
                            path={routes.root}
                            render={() => {
                                if (userType === "customer") {
                                    return (
                                        <Redirect
                                            to={
                                                routes.authRoutes
                                                    .customerDashboard
                                            }
                                        />
                                    );
                                } else if (userType === "advisor") {
                                    return (
                                        <Redirect
                                            to={
                                                routes.authRoutes
                                                    .advisorDashboard
                                            }
                                        />
                                    );
                                    }else if(userType === 'relationship_manager'){
                                        return <Redirect
                                            to={routes.authRoutes.rmDashboard}
                                        />
                                    }
                                }}
                            />*/}
            <Route exact path={routes.root} component={RouteParent} />
            <Route
              path={routes.authRoutes.customerDashboard}
              component={AccountOverview}
            />
            <Route
              path={routes.authRoutes.advisorDashboard}
              component={AdviserDashboard}
            />
            <Route
              path={routes.authRoutes.rmDashboard}
              component={AdviserDashboard}
            />
            <Route
              path={routes.authRoutes.planSelection}
              component={PlanSelectionScreen}
            />
            <Route
              exact
              path={routes.authRoutes.planPurchase}
              render={() => <PaymentScreen />}
            />
            <Route
              exact
              path={routes.authRoutes.planPurchaseSuccess}
              render={() => <PaymentSuccessfulScreen />}
            />
            <Route
              path={routes.authRoutes.advisorSelection}
              component={AdvisorSelection}
            />
            <Route path={routes.authRoutes.kycProcess} component={KycProcess} />
            <Route
              path={routes.authRoutes.kycDisclosures}
              component={Disclosures}
            />
            <Route
              path={routes.authRoutes.kycThankYou + "/:val"}
              render={(props) => <KycThankYou {...props} />}
            />
            <Route
              path={routes.authRoutes.accountOverview}
              component={AccountOverview}
            />
            <Route
              path={routes.authRoutes.stockResults + "/:val"}
              render={(props) => <StockSearchContainer {...props} />}
            />
            <Route
              path={routes.authRoutes.stockSearch + "/:val"}
              render={(props) => <StockSearch {...props} />}
            />
            <Route
              path={routes.authRoutes.recommendedPortfolios}
              component={RecommendedPortfolios}
            />
            <Route
              path={routes.authRoutes.productDetails}
              component={ProductDetailPage}
            />
            <Route
              path={routes.authRoutes.personalInformation}
              component={PersonalInformation}
            />
            <Route
              path={routes.authRoutes.investmentProfile}
              component={InvestmentProfile}
            />
            <Route path={routes.authRoutes.watchlists} component={Watchlists} />
            <Route path={routes.authRoutes.myLists} component={MyList} />

            <Route path={routes.authRoutes.listRM} component={ListRM} />
            <Route path={routes.authRoutes.viewRM} component={ViewRM} />
            <Route path={routes.authRoutes.editRM} component={EditRM} />
            <Route path={routes.authRoutes.addRM} component={AddRM} />
            <Route
              path={routes.authRoutes.invest}
              render={(props) => <Invest {...props} />}
            />
            <Route
              path={routes.authRoutes.selectFundsRegister}
              component={SelectFundsRegister}
            />
            <Route
              path={routes.authRoutes.selectFundsThankYou}
              component={SelectFundsThankYou}
            />
            <Route
              path={routes.authRoutes.transactionHistory}
              component={TransactionHistory}
            />
            <Route path={routes.authRoutes.clientList} component={ClientList} />
            <Route
              path={routes.authRoutes.advisorProfile}
              component={AdvisorProfile}
            />
            <Route path={routes.authRoutes.advisorKyc} component={AdvisorKyc} />
            <Route
              path={routes.authRoutes.advisorKycDisclosures}
              component={AdvisorKycDisclosures}
            />
            <Route
              path={routes.authRoutes.advisorKycDisclosureLink}
              component={AdvisorKycDisclosureLink}
            />
            <Route
              path={routes.authRoutes.orderConfirmation}
              component={OrderConfirmation}
            />
            <Route
              path={routes.authRoutes.clientDetails + "/:id"}
              render={(props) => <ClientDetails {...props} />}
            />
            <Route
              path={routes.authRoutes.clientKyc + "/:id"}
              render={(props) => <ClientKyc {...props} />}
            />
            <Route
              path={routes.authRoutes.advisorHome}
              component={AdvisorHome}
            />
            <Route path={routes.authRoutes.addMoney} component={AddMoney} />
            <Route
              path={routes.authRoutes.withdrawMoney}
              component={WithdrawMoney}
            />
            <Route
              path={routes.authRoutes.orderHistory}
              component={OrderHistory}
            />
            <Route path={routes.authRoutes.rmProfile} component={RMProfile} />
            <Route
                path={routes.authRoutes.rmNewPassword}
                component={NewPassword}
            />
            <Route path={routes.authRoutes.portfolioOverview} component={PortfolioOverview}/>
            <Route path={routes.authRoutes.addBank} component={AddBank} />
            <Route path={routes.authRoutes.bankDetails} component={BankDetails} />
          </Switch>
          {/*</Router>*/}
        </ApiProvider>
      </ErrorProvider>
    </React.Suspense>
  );
};

export default AuthRouter;

function Placeholder() {
  // DO NOT USE THIS SECTION FOR NOW
  return (
    <div></div>
    // <>
    //     <LeftMenu />
    //     <Header />
    //     <Loader />
    // </>
  );
}
