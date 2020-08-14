import styled from "styled-components";
import { Row, Col } from "antd";

export const ProfileWrapper = styled.div`
  margin: 0% 15%;
  // margin:0px 196px;

  @media (max-width: 1280px) {
    margin-left: 196px;
    margin-right: 197px;
  }

  @media (max-width: 1024px) {
    margin: 0% 5%;
  }

  @media (max-width: 768px) {
    margin: 10% 5%;
  }
`;

export const ProfileContainer = styled.div`
  margin: 18.5px 14px 0px 14px;
`;

export const ColHeading = styled(Col)`
  &.first-heading {
    margin-top: 39px;
  }

  &.second-heading {
    margin-top: 33px;
  }

  &.third-heading {
    margin-top: 35px;
  }
`;

export const ColContent = styled(Col)`
  margin: 7.5px 0px;
`;

export const AdvisorCodeHeading = styled.p`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
  margin-bottom:18px;
`;
