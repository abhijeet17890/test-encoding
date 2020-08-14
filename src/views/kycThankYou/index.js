import React from "react";

import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";

import { Button } from "../../sharedComponents/button";

import ResultImg from "../../assets/thank-you.png";

import * as S from "./styles";

function KycThankYou(props) {
  const history = useHistory();

  const userType = props.match.params.val;

  let thankYouContent = {};
  if (userType === "customer") {
    thankYouContent = {
      title: `Your details and documents have been uploaded and sent for approval. This should take 1-3 business days.
        In the meantime, feel free to browse Globalise’s features and take the first step towards globalising your wealth.`,
      buttonText: `Explore Globalise`,
      route: () => history.push(routes.authRoutes.customerDashboard),
    };
  } else {
    thankYouContent = {
      title: `Your documents are being processed. We will notify you once you have been onboarded.`,
      buttonText: `Welcome`,
      route: () => history.push(routes.authRoutes.advisorHome),
    };
  }
  return (
    <S.PageContainer>
      <S.StyledResult
        title="Thank You"
        status="success"
        icon={<S.Img src={ResultImg} alt={"result-screen"} />}
        subTitle={thankYouContent.title}
        extra={
          <Button size="lg" onClick={thankYouContent.route}>
            {thankYouContent.buttonText}
          </Button>
        }
      />
    </S.PageContainer>
  );
}

export default KycThankYou;
