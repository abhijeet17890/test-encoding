import styled from "styled-components";
import { Tabs } from "antd";

export const NavWrapper = styled.div`
width: 887px;
margin: 0 auto;
padding: 20px;
`;

export const ProductDetailsTab = styled(Tabs)`
.ant-tabs-tab {
  font-size: ${(props)=>props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  text-align: left;
  color: ${(props)=>props.theme.colors.h2Color};
  border-bottom: 3px solid #bfbfbf;
}
.ant-tabs-nav::before {
  border-bottom: none;
}
.ant-tabs-tab.ant-tabs-tab-active {
  color: ${(props)=>props.theme.colors.h2Color};
  font-weight: ${(props)=>props.theme.fontConfig.fontWeight2};
  border-bottom: 3px solid   ${(props)=>props.theme.colors.tabUnderLine};
}

.ant-tabs-ink-bar {
  display: none;
}
`;