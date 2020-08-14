import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { scrollToTop } from "../../../../utils/dataManipulation";

import { routes } from "../../../../constants/routes";
import { Button } from "../../../../sharedComponents/button";

import ResultImg from "../../../../assets/thank-you.png";

import { StyledImg, StyledResult } from "./style";

const ClientHome = ({
  clientId,
  clientName,
  clientFirstName,
  clientLastName,
  clientMobileNumber,
}) => {
  const history = useHistory();

  useEffect(() => {
    scrollToTop();
  }, []);

  const redirectClientKycProcess = () => {
    history.push({
      pathname: routes.authRoutes.clientKyc + "/" + clientId,
      state: {
        clientFirstName,
        clientLastName,
        clientId,
        clientName,
        clientMobileNumber,
      },
    });
  };

  return (
    <StyledResult
      status="success"
      icon={<StyledImg src={ResultImg} alt={"result-screen"} />}
      subTitle={`The KYC of ${clientName} is yet to be submitted. You can complete the KYC on behalf of the customer and
      save it for their review and submission.`}
      extra={[
        <Button
          key="console"
          size="md-1"
          outlined={true}
          onClick={() => history.push(routes.authRoutes.clientList)}
        >
          Back
        </Button>,
        <Button
          key="buy"
          size="md-1"
          onClick={() => redirectClientKycProcess()}
        >
          Complete KYC
        </Button>,
      ]}
    />
  );
};

export default ClientHome;
