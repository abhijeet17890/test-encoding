import styled from "styled-components";
import { Row, Col } from "antd";

export const DashboardWrapper = styled.div`
  // width: 1079px;
  margin: 0px auto;
  // padding: 15px;
  // margin: 0% 15%;

  margin: 0% 15%;

  @media (max-width: 1490px) {
    margin-left: 101px;
    margin-right: 100px;
  }

  @media (max-width: 1280px) {
    margin-left: 101px;
    margin-right: 100px;
  }

  @media (max-width: 1024px) {
    margin: 0% 5%;
  }

  @media (max-width: 768px) {
    margin: 10% 5%;
  }
`;

export const HeadingText = styled.p`
  color: ${(props) => props.theme.colors.btnTextColor};
  padding: 10px;
  background-color: ${(props) => props.theme.colors.tabUnderLine};
`;

export const Content = styled.div`
  width: 102px;
  margin: 0px 5px 0px 5px;
  cursor: pointer;

  &:first-child {
    margin: 0px 5px 0px 0px;
  }
  &:last-child {
    margin: 0px 0px 0px 5px;
  }
`;
export const ContentImg = styled.div`
  width: 102px;
  object-fit: contain;
`;
export const ContentText = styled.div`
  height: 31px;
  background-color: ${(props) => props.theme.colors.btnMdBackground};
  border-radius: 0px 0px
    ${(props) => props.theme.generalConfig.inputBorderRadius}
    ${(props) => props.theme.generalConfig.inputBorderRadius};
  :hover {
    background: #40a9ff;
  }
`;

export const Text = styled.p`
  font-size: 12px;
  line-height: 1.08;
  text-align: center;
  color: ${(props) => props.theme.colors.btnTextColor};
  padding-top: 4px;
`;

export const EmptyContent = styled.div`
  width: 102px;
`;

export const StyleCol = styled(Col)`
  &.left-cont {
    width: 457px;
  }
  &.right-cont {
    width: 574px;
  }
`;

export const StyledRow = styled(Row)`
  margin-bottom: 23.5px;
`;
