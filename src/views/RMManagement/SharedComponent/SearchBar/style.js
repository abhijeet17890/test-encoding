import styled from "styled-components";
import { AutoComplete } from "antd";

export const StyledAutoComplete = styled(AutoComplete)`
  &.ant-select {
    width: 100%;
  }
`;

export const SearchDropdown = styled.div`
  display: flex;
  align-items: center;
  textdecoration: none;
`;
export const SearchText = styled.span`
text-decoration:underline;
`;

export const SearcPrefix = styled.span`
margin:0px 20px
;`;
