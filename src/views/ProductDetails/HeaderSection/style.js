import styled from "styled-components";
import { Button } from "antd";
import "antd/dist/antd.css";

export const HeaderWrapper = styled.div`
  width: 887px;
  height: 158px;
  background-image: linear-gradient(67deg, #05274a 24%, #309fe9 91%);
  margin: 0 auto;
  //   padding: 10px 20px;
`;

export const HeaderContainer = styled.div`
  padding: 10px 20px;
`;

export const HeaderTopContent = styled.div`
  display: flex;
`;
export const HeaderBottomContent = styled.div`
  color: ${(props) => props.theme.colors.btnTextColor};
  display: flex;
  //   justify-content: space-between;

  &.bottomcont {
    justify-content: space-between;
  }
`;
export const HeaderLeftContent = styled.div`
  width: 70%;
`;

export const HeaderRightContent = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;

  .normal-btn {                             //common component
    width: 106px;
    height: 36px;
    color: ${(props)=>props.theme.colors.btnTextColor};
    background-color: transparent;
    padding: 0px 10px;
    border: solid 2px ${(props)=>props.theme.colors.btnTextColor};
    border-radius: ${(props)=>props.theme.generalConfig.btnSm2BorderRadius};
  }

  .styled-btn {                             //common component
    width: 102px;
    height: 36px;
    color: ${(props)=>props.theme.colors.btnTextColor};
    border-radius: ${(props)=>props.theme.generalConfig.btnSm2BorderRadius};
    background-color: ${(props)=>props.theme.colors.successColor};
  }
`;

export const Paragraph = styled.p`
  margin: 10px 0px;

  &.title {
    font-size: 20px;
  }

  &.right {
    width: 185px;
  }
`;

