import styled from "styled-components";
import { Button, Anchor } from "antd";
import "antd/dist/antd.css";

export const InformationWrapper = styled.div`
  // width: 887px;
  margin: 0 auto;
  padding: 20px 0px;
`;

export const Heading = styled.p`
  font-size: ${(props)=>props.theme.fontConfig.paraLineHeight};
  font-weight: ${(props)=>props.theme.fontConfig.fontWeight2};
  line-height: 1.3;
  color: #2d2d2d;
  margin-bottom: 10px;
`;

export const Content = styled.p`
  font-size: ${(props)=>props.theme.fontConfig.bodyTextFontSize};
  color: ${(props)=>props.theme.colors.footerBackground};

  &.viewless {
    height: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.link {
    text-decoration: underline;
  }
`;

export const ReadMoreBtn = styled(Button)`
  padding: 0px;
  margin-right: 25px;
  
  &.ant-btn > span{
    text-decoration:underline;
}
`;
export const ReadMoreBtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CostContent = styled.div`
width: 40%;
display: flex;
justify-content: space-between;
`;

export const StyledAnchor = styled(Anchor)`
.ant-anchor-wrapper {
  padding-left:0px;
}
.ant-anchor-link{
  padding:0px;
}
.ant-anchor-link-title{
  color:#1D1D1D;
}
.ant-anchor{
  font-size:16px;
}

.ant-anchor:hover {
  text-decoration: underline;
}
`;

export const Span = styled.span`
  &.disp_none{
    display:none;
  }
  &.disp_more{
    display:content;
  }
`;