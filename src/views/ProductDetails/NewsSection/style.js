import styled from "styled-components";
import { Button } from "antd";
import { Divider } from "antd";

export const NewsSection = styled.div`
//   width: 887px;
  margin: 0 auto;
  padding: 20px 0px;
`;

export const NewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NewsLeftContent = styled.div`
  width: 313px;
  margin-top: 10px;
`;

export const NewsRightContent = styled.div`
  width: 510px;
`;

export const NewsHeading = styled.p`
  font-size: ${(props)=>props.theme.fontConfig.menuHeadingFontSize};
  font-weight: ${(props)=>props.theme.fontConfig.fontWeight2};
  line-height: 2;
  text-align: left;
  color: ${(props)=>props.theme.colors.btnLgBackground};
  margin-bottom: 0px;
`;

export const NewsTime = styled.p`
  font-size: 12px;
  line-height: 2.58;
  text-align: left;
  color: ${(props)=>props.theme.colors.footerBackground};
`;

export const NewsInformation = styled.p`
  font-size: ${(props)=>props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.5;
  text-align: left;
  color: ${(props)=>props.theme.colors.footerBackground};
  margin-bottom: 0px;
`;

export const NewsInfoDiv = styled.div`
  &.viewless {
    height: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const NewsButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ReadMoreBtn = styled(Button)`
  padding: 0px;

  &.ant-btn > span{
      text-decoration:underline;
  }
  `;

export const StyledDivider = styled(Divider)`
  border-top: 1px solid #cccccc;
`;

export const Heading = styled.div`
  font-size: ${(props)=>props.theme.fontConfig.paraLineHeight};
  font-weight: ${(props)=>props.theme.fontConfig.fontWeight2};
  line-height: 1.3;
  text-align: left;
  color: #2d2d2d;
`;