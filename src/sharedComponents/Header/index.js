import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Button } from "antd";

import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import { useAuth } from "../../contextProviders/authProvider";
import {
    StyledHeader,
    Logo,
    StyledMenu,
    StyledCol,
    StyledSpan,
    StyledContent,
    StyledLayout,
    StyledFooter,
    StyledSubMenu,
    StyledMenuItem,
    InvestUnderline,
    PortfolioUnderline,
    TransferMoneyUnderline,
    MyAccountUnderline,
    StyledSubMenuItem,
    DashboardUnderline,
    ClientsUnderline,
    ResearchUnderline,
    ReportsUnderline,
    AdminUnderline,
    TitleSpan,
} from "./styles";
import FooterComponent from "../Footer";
import { routes } from "../../constants/routes";
import Notification from "../Notification";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const RightSection = ({
    user,
    userType,

    connectWithApi,
    clearLoggedInUserInfo,
    appHistory,
}) => {
    const [current, setCurrent] = useState();
    const [currentMenu, setCurrentMenu] = useState();
    const handleClick = (e) => {
        console.log(e);
        setCurrent(e.key);
        setCurrentMenu(e.keyPath[1]);
    };
    const handleMenuClick = (e) => {
        setCurrent();
        setCurrentMenu(e.key);
    };
    useEffect(() => {
        setCurrent();
    }, []);
    function signOut() {
        connectWithApi()
            .signOut()
            .then(() => {
                clearLoggedInUserInfo(appHistory);
            })
            .catch(() => {
                clearLoggedInUserInfo(appHistory);
            });
    }

    if (!user || (user && user.pendingAuth)) {
        return <React.Fragment>{""}</React.Fragment>;
    }

    if (user && !user.pendingAuth) {
        // let kycSubmitted = true; //uncomment this only for development purpose/ need to be commented again before final push
        if (
            (user.customer_transition_info &&
                !user.customer_transition_info.kyc_submitted) ||
            (user.advisor_transition_info &&
                !user.advisor_transition_info.kyc_submitted)
        ) {
            return (
                <React.Fragment>
                    <StyledMenu
                        mode="horizontal"
                        //defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item key="Dashboard">
                            {/*temp local storage clear to mock logout*/}
                            <span onClick={signOut}>Sign Out</span>
                        </Menu.Item>
                    </StyledMenu>
                </React.Fragment>
            );
        } else {
            //MORE OPTIMIZATION NEEDED HERE LOCs should be reduced
            return (
                <React.Fragment>
                    <StyledMenu
                        mode="horizontal"
                        selectedKeys={[current]}
                        onClick={handleClick}>
                        <StyledMenuItem
                            className={
                                current === "Dashboard" ? "selectedMenu" : ""
                            }
                            key="Dashboard">
                            <Link
                                to={
                                    userType === "customer"
                                        ? routes.authRoutes.customerDashboard
                                        : userType === "advisor"
                                        ? routes.authRoutes.advisorDashboard
                                        : userType === "relationship_manager"
                                        ? routes.authRoutes.rmDashboard
                                        : "#"
                                }>
                                Dashboard
                            </Link>
                            <DashboardUnderline />
                        </StyledMenuItem>

                        {/* Clients Menu for advisor login */}
                        {(user.userType === "advisor" ||
                            userType === "relationship_manager") && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "Clients"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="Clients"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link to="#">Clients</Link>
                                        </span>
                                        <ClientsUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Client list">
                                    <Link to={routes.authRoutes.clientList}>
                                        Client list
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Portfolio Returns">
                                    <Link to="#">Portfolio Returns</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Transactions">
                                    <Link to="#">Transactions</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Authorisations ">
                                    <Link to={routes.authRoutes.watchlists}>
                                        Authorisations
                                    </Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                        <StyledSubMenu
                            popupClassName="headerMenu"
                            className={
                                currentMenu === "Invest" ? "selectedMenu" : ""
                            }
                            selected={currentMenu === "Invest"}
                            key="Invest"
                            onTitleClick={handleMenuClick}
                            title={
                                <TitleSpan>
                                    <span>Invest</span>
                                    <InvestUnderline />
                                </TitleSpan>
                            }>
                            <StyledMenuItem key="Shares">
                                <Link
                                    to={
                                        routes.authRoutes.stockSearch +
                                        "/shares"
                                    }>
                                    Shares
                                </Link>
                            </StyledMenuItem>
                            <StyledMenuItem key="ETFs">
                                <Link
                                    to={routes.authRoutes.stockSearch + "/etf"}>
                                    ETFs
                                </Link>
                            </StyledMenuItem>

                            <StyledMenuItem key="Select Funds">
                                <Link
                                    to={routes.authRoutes.selectFundsRegister}>
                                    Select Funds
                                </Link>
                            </StyledMenuItem>
                            <StyledMenuItem key="Recommended Portfolios ">
                                <Link
                                    to={
                                        routes.authRoutes.recommendedPortfolios
                                    }>
                                    Recommended Portfolios{" "}
                                </Link>
                            </StyledMenuItem>
                            {user.advisor_transition_info && (
                                <StyledMenuItem key="Watchlists ">
                                    <Link to={routes.authRoutes.watchlists}>
                                        Watchlists
                                    </Link>
                                </StyledMenuItem>
                            )}
                        </StyledSubMenu>
                        {user.customer_transition_info && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "Portfolio"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="Portfolio"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link to="#">Portfolio</Link>
                                        </span>
                                        <PortfolioUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Portfolio Overview">
                                    <Link to={routes.authRoutes.portfolioOverview}>Portfolio Overview</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Portfolio Analytics">
                                    <Link to="#">Portfolio Analytics</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Order History">
                                    <Link to={routes.authRoutes.orderHistory}>
                                        Order History
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem key="Watchlists ">
                                    <Link to={routes.authRoutes.watchlists}>
                                        Watchlists
                                    </Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                        {(user.userType === "advisor" ||
                            user.userType === "relationship_manager") && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "Reports"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="Reports"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link to="#">Reports</Link>
                                        </span>
                                        <ReportsUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="AuM Reports">
                                    <Link to="#">Aum Reports</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Money Flows">
                                    <Link
                                        to={
                                            routes.authRoutes
                                                .overseasBankAccount
                                        }>
                                        Money Flows
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Business Reports">
                                    <Link to="#">Business Reports</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Fees">
                                    <Link
                                        to={
                                            routes.authRoutes.transactionHistory
                                        }>
                                        Fees
                                    </Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                        {user.userType === "customer" && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "TransferMoney"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="TransferMoney"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link to="#">Transfer Money</Link>
                                        </span>
                                        <TransferMoneyUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Add Money">
                                    <Link to={routes.authRoutes.addMoney}>
                                        Add Money
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Withdraw Money">
                                    <Link to={routes.authRoutes.withdrawMoney}>
                                        Withdraw Money
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status === "PENDING"
                                    }
                                    key="Transaction History">
                                    <Link
                                        to={
                                            routes.authRoutes.transactionHistory
                                        }>
                                        Transaction History
                                    </Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                        {user.userType === "customer" && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "MyAccount"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="MyAccount"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link
                                                to={
                                                    userType === "customer"
                                                        ? routes.authRoutes
                                                              .personalInformation
                                                        : userType === "advisor"
                                                        ? routes.authRoutes
                                                              .advisorProfile
                                                        : "#"
                                                }>
                                                My Account
                                            </Link>
                                        </span>
                                        <MyAccountUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem key="Personal Info">
                                    <Link
                                        to={
                                            userType === "customer"
                                                ? routes.authRoutes
                                                      .personalInformation
                                                : userType === "advisor"
                                                ? routes.authRoutes
                                                      .advisorProfile
                                                : "#"
                                        }>
                                        Information
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem key="Investment Profile">
                                    <Link
                                        to={
                                            routes.authRoutes.investmentProfile
                                        }>
                                        Profile
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status == "PENDING"
                                    }
                                    key="Account">
                                    <Link to="#">My Account</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status == "PENDING"
                                    }
                                    key="Reports">
                                    <Link to="#">Reports</Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.customer_transition_info
                                            ?.kyc_status == "PENDING"
                                    }
                                    key="Bank Account Details">
                                    <Link to="#">Bank</Link>
                                </StyledMenuItem>
                                <StyledMenuItem key="Logout" onClick={signOut}>
                                    <Link to="#">Log Out</Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                        {(user.userType === "advisor" ||
                            user.userType === "relationship_manager") && (
                            <StyledSubMenu
                                popupClassName="headerMenu"
                                className={
                                    currentMenu === "Admin"
                                        ? "selectedMenu"
                                        : ""
                                }
                                currentmenu={currentMenu}
                                key="Admin"
                                onTitleClick={handleMenuClick}
                                title={
                                    <TitleSpan>
                                        <span>
                                            <Link
                                                to={
                                                    userType === "customer"
                                                        ? routes.authRoutes
                                                              .personalInformation
                                                        : userType === "advisor"
                                                        ? routes.authRoutes
                                                              .advisorProfile
                                                        : userType ===
                                                          "relationship_manager"
                                                        ? routes.authRoutes
                                                              .rmProfile
                                                        : "#"
                                                }>
                                                Admin
                                            </Link>
                                        </span>
                                        <AdminUnderline />
                                    </TitleSpan>
                                }>
                                <StyledMenuItem key="My Account">
                                    <Link
                                        to={
                                            userType === "customer"
                                                ? routes.authRoutes
                                                      .personalInformation
                                                : userType === "advisor"
                                                ? routes.authRoutes
                                                      .advisorProfile
                                                : userType ===
                                                  "relationship_manager"
                                                ? routes.authRoutes.rmProfile
                                                : "#"
                                        }>
                                        My Account
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Email">
                                    <Link
                                        to={
                                            routes.authRoutes.investmentProfile
                                        }>
                                        Email
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem
                                    kycPending={
                                        user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                        "PENDING"
                                    }
                                    key="Client Groups">
                                    <Link to="#">Client Groups</Link>
                                </StyledMenuItem>
                                {userType !== "relationship_manager" && (
                                    <StyledMenuItem
                                        kycPending={
                                            user.advisor_transition_info?.kyc_status.toUpperCase() ===
                                            "PENDING"
                                        }
                                        key="RM Admin">
                                        <Link to={routes.authRoutes.listRM}>
                                            RM Admin
                                        </Link>
                                    </StyledMenuItem>
                                )}
                                <StyledMenuItem key="Logout" onClick={signOut}>
                                    <Link to="#">Log Out</Link>
                                </StyledMenuItem>
                            </StyledSubMenu>
                        )}
                    </StyledMenu>
                </React.Fragment>
            );
        }
    }
};

const HeaderComponent = (props) => {
    const history = useHistory();
    const { connectWithApi } = useInsideAuthApi();
    const { loggedInUser, clearLoggedInUserInfo } = useAuth();
    const user = loggedInUser; // props.user //loggedInUser
    const userType =
        user && user.groups
            ? user.groups[0].name.toLowerCase().replace(/ /g, "_")
            : "";

    return (
        <StyledLayout className="layout">
            <StyledHeader>
                <Row justify="space-between">
                    <Col>
                        <Logo>{/* <img src={mainLogo} /> */}</Logo>
                    </Col>

                    <StyledCol>
                        <RightSection
                            user={props.user}
                            userType={userType}
                            connectWithApi={connectWithApi}
                            clearLoggedInUserInfo={clearLoggedInUserInfo}
                            appHistory={history}
                        />
                    </StyledCol>
                </Row>
            </StyledHeader>
        </StyledLayout>
    );
};

export default HeaderComponent;
