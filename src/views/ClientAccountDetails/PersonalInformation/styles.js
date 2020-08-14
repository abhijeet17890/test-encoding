import styled from 'styled-components';

import { Typography, List, Row } from "antd";

export const StyledDetails = styled.div`
    font-size: ${props=>props.theme.fontConfig.bodyTextFontSize};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
    text-transform: capitalize;
`;
 export const PageHeading = styled.div`
 font-weight: 600;
 font-size: 22px;
 color: ${(props) => props.theme.colors.h1Color};
 margin: 17.5px 0;
 `;



export const Headline = styled(Typography)`
  font-size: ${(props) => props.theme.fontConfig.h1FontSize};
  font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
  font-stretch: normal;
  font-style: normal;
  line-height: 0.79;
  letter-spacing: normal;
  color: #011c3c;
  margin-top: ${(props) => props.theme.elementDistances.h1DisTop};
  margin-bottom: ${(props) => props.theme.elementDistances.h1DisBottom};
`;
export const Title = styled(Typography)`
  font-size: ${(props) => props.theme.fontConfig.h2FontSize};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-top: ${(props) => props.theme.elementDistances.H1DividerBottomDis};
  margin-bottom: 11px;
`;

export const CustomList = styled(List)`
  &.ant-list-split .ant-list-item {
    border-bottom: none;
  }
  span,
  a {
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  a {
    text-decoration: underline;
  }
  .ant-checkbox-wrapper {
    display: block;
    margin-top: 11px;
    margin-left: 15px;
  }
`;

export const StyledRow = styled(Row)`
  margin-top: ${(props) => props.theme.elementDistances.inputVDisFormSubmitBtn};
`;
