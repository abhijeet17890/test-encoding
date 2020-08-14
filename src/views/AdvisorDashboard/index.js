import React, { useState } from "react";
import {
  DashboardWrapper,
  HeadingText,
  Content,
  ContentImg,
  ContentText,
  Text,
  EmptyContent,
  StyleCol,
  StyledRow,
} from "./style";
import { routes } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { PageHeading } from "../../sharedComponents/Heading";
import Divider from "../../sharedComponents/Divider";
import { useAuth } from "../../contextProviders/authProvider";
import { Row, Col } from "antd";

const AdviserDashboard = () => {
  const history = useHistory();
  const { loggedInUser } = useAuth();
  console.log("loggedInuser", loggedInUser);
  const transitionInfo =
    loggedInUser && loggedInUser[`advisor_transition_info`]
      ? loggedInUser[`advisor_transition_info`]
      : "";

  const [menu, handleMenu] = useState([
    {
      heading: "Clients",
      className: "left-cont",
      headingStatus: true,
      subMenus: [
        {
          name: "Client List",
          icon: require("../../assets/client-list.png"),
          path: routes.authRoutes.clientList,
        },
        {
          name: "Portfolio Returns",
          icon: require("../../assets/portfolio-returns.png"),
          path: "",
        },
        {
          name: "Transactions",
          icon: require("../../assets/transactions.png"),
          path: "",
        },
        {
          name: "Authorisations",
          icon: require("../../assets/authorisation.jpg"),
          path: "",
        },
      ],
    },
    {
      heading: "Research",
      className: "right-cont",
      headingStatus: false,
      subMenus: [
        {
          name: "Shares",
          icon: require("../../assets/shares-etfs.png"),
          path: routes.authRoutes.stockSearch + "/shares",
        },
        {
          name: "ETFs",
          icon: require("../../assets/funds.png"),
          path: routes.authRoutes.stockSearch + "/etf",
        },
        {
          name: "Select Funds",
          icon: require("../../assets/select-funds.png"),
          path: "",
        },
        {
          name: "Recommended Portfolios",
          icon: require("../../assets/recomended-protfolio.png"),
          path: "",
        },
        {
          name: "Watchlists",
          icon: require("../../assets/watchlists.png"),
          path: routes.authRoutes.watchlists,
        },
      ],
    },
    {
      heading: "Reports",
      className: "left-cont",
      headingStatus: true,
      subMenus: [
        {
          name: "AuM Reports",
          icon: require("../../assets/aum-reports.png"),
          path: "",
        },
        {
          name: "Money Flows",
          icon: require("../../assets/money-flow.jpg"),
          path: "",
        },
        {
          name: "Business Reports",
          icon: require("../../assets/business-report.png"),
          path: "",
        },
        {
          name: "Fees",
          icon: require("../../assets/fees.png"),
          path: "",
        },
      ],
    },
    {
      heading: "Admin",
      className: "",
      headingStatus: false,
      subMenus: [
        {
          subMenus_status: false,
          name: "My Account",
          icon: require("../../assets/my-account.png"),
          path: loggedInUser.userType !== "relationship_manager" ?routes.authRoutes.advisorProfile:routes.authRoutes.rmProfile,
        },
        {
          subMenus_status: true,
          name: "Email",
          icon: require("../../assets/email.png"),
          path: "",
        },
        {
          subMenus_status: true,
          name: "Client Groups",
          icon: require("../../assets/client-groups.png"),
          path: "",
        },
        ... loggedInUser.userType !== "relationship_manager"  ? [{
          subMenus_status: true,
          name: "RM Admin",
          icon: require("../../assets/rm-admin.png"),
          path: routes.authRoutes.listRM,
        }] : [],
        {
          name: "",
          icon: "",
          path: "",
        },
      ],
    },
  ]);

  const handleClick = (data) => {
    history.push(data);
  };
  return (
    <DashboardWrapper>
      <PageHeading>Dashboard</PageHeading>
      <StyledRow>
        <Divider />
      </StyledRow>
      {/* {span : 10}:{span:13}} sm={{span:24}} */}
      <Row gutter={[50, 50]}>
        {menu.map((e, index) =>
          transitionInfo &&
          transitionInfo["kyc_status"] === "PENDING" &&
          e.headingStatus ? null : (
            <StyleCol
              lg={e.className === "left-cont" ? "left-cont" : "right-cont"}
              key={index}
            >
              <Row>
                <Col span={24}>
                  <HeadingText>{e.heading}</HeadingText>
                </Col>
              </Row>
              <Row gutter={[5, 5]}>
                {e.subMenus.map((data, indx) =>
                  data.name === "" ||
                  (transitionInfo &&
                    transitionInfo["kyc_status"] === "PENDING" &&
                    data.subMenus_status) ? (
                    <EmptyContent></EmptyContent>
                  ) : (
                    <Col key={indx} onClick={() => handleClick(data.path)}>
                      <Content>
                        <ContentImg>
                          <img className="img-size" src={data.icon} alt="" />
                        </ContentImg>
                        <ContentText>
                          <Text>{data.name}</Text>
                        </ContentText>
                      </Content>
                    </Col>
                  )
                )}
              </Row>
            </StyleCol>
          )
        )}
      </Row>
    </DashboardWrapper>
  );
};

export default AdviserDashboard;
