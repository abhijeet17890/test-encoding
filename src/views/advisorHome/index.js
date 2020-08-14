import React from "react";

import ResultImg from "../../assets/account-overview.png";
import * as S from "../accountOverview/styles";

const AdvisorHome = () => {
  return (
    <S.PageContainer>
      <S.StyledResult
        status="success"
        icon={<S.Img src={ResultImg} alt={"result-screen"} />}
        subTitle="Your KYC is in progress. We will notify you once it has been approved. In the meantime,
                you can browse the market and create your watchlists"
      />
    </S.PageContainer>
  );
};

export default AdvisorHome;
