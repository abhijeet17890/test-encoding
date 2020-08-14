import styled, { createGlobalStyle } from "styled-components";
import { Typography, AutoComplete, Table } from "antd";
import "antd/dist/antd.css";
import Divider from "../../sharedComponents/Divider/index";
import { Button } from "antd";

const { Title } = Typography;

export const Stock = styled.div`
  .ant-select-single .ant-select-selector .ant-select-selection-search-input {
    width: 100%;
    height: 36px;
    border-radius: 6px;
  }

  //   .ant-input-clear-icon:last-child {
  //     // padding:10px;
  //     width: 15px;
  //     height: 15px;
  //   }

  .anticon svg {
    height: 14px;
    display: inline-block;
    width: 15px;
  }

  text-align: left;
  max-width: 1080px;
  margin: 30px auto;
  font-size: ${window.innerWidth > 768 ? "16px" : "12px"};
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  margin-top: ${window.innerWidth > 768 ? "0px" : "64px"};
  img {
    max-width: 100%;
  }
  a {
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }

  .text-center {
    text-align: center;
  }
`;

export const StockTitle = styled(Title)`
  &.ant-typography {
    font-size: ${window.innerWidth > 768 ? "28px" : "14px"};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
`;

export const StockTable = styled(Table)`
  // .ant-table-tbody > tr > td {
  //    border-bottom: solid 1px #c7c7c7;
  //    -webkit-transition: background 0.3s;
  //    transition: background 0.3s;
  //    font-size: 14px;
  //    font-weight: normal;
  //    font-stretch: normal;
  //    font-style: normal;
  //    line-height: 1.38;
  //    letter-spacing: normal;
  //    text-align: left;
  //    color: #1d1d1d;
  // }
  // .ant-table-container table > thead > tr:first-child th{
  //    background-color: #3393D9;
  //    font-size: 16px;
  //    font-weight: normal;
  //    font-stretch: normal;
  //    font-style: normal;
  //    line-height: 1.22;
  //    letter-spacing: normal;
  //    color: #ffffff;
  // }
  // .ant-table-column-sorter-up,.ant-table-column-sorter-down{
  //    color: white;
  // }
  // .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active {
  //    color: #5AC680;
  // }

  .ant-table-thead > tr > th {
    background: ${(props) => props.theme.colors.tabUnderLine};
    font-size: ${(props) => props.theme.fontConfig.menuHeadingFontSize};
    color: ${(props) => props.theme.colors.btnTextColor};
  }
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${(props) => props.theme.colors.tabUnderLine};
  }

  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: ${(props) => props.theme.colors.stockMarketUp};
  }

  td.ant-table-column-sort {
    background: none;
  }

  .ant-table table {
    font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
    color: ${(props) => props.theme.colors.h2Color};
  }

  @media (max-width: 768px) {
    .ant-table-content {
      overflow: scroll;
    }
    .ant-table-thead > tr > th {
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    }
  }

  @media (max-width: 480px) {
    .ant-table-content {
      overflow: scroll;
    }
    .ant-table-thead > tr > th {
      font-size: ${(props) => props.theme.fontConfig.formErrFontSize};
    }
  }
`;

export const StockSearch = styled(AutoComplete)`
  // .ant-input-group .ant-input {
  //   height: 36px;
  //   border: 0.3px solid ${(props) => props.theme.colors.normalInputBorder};
  //   border-radius: 6px;
  //   background-color: #ffffff;
  // }
  // .ant-input-group .ant-input,
  // .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  //   border-top: ${window.innerWidth > 768 ? "" : "0px"} !important;
  //   border-left: ${window.innerWidth > 768 ? "" : "0px"} !important;
  //   border-right: ${window.innerWidth > 768 ? "" : "0px"} !important;
  //   box-shadow: ${window.innerWidth > 768 ? "" : "none !important"};
  //   outline: ${window.innerWidth > 768 ? "" : "none"};
  // }
  // .ant-input-search-button {
  //   border-radius: ${window.innerWidth > 768 ? "" : "8px !important"};
  // }
  // .ant-input-search-enter-button
  //   input
  //   + .ant-input-group-addon
  //   .ant-input-search-button {
  //   display: none;
  // }

  // &.ant-select {
  //   width: 100%;
  // }

  &.ant-select {
    width:100%;
  }
  .ant-input-affix-wrapper:hover{
    border-color: black;
  }
  .ant-input-affix-wrapper:focus{
    border-color: #1890ff;
  }
  .ant-input-affix-wrapper-focused{
    border-color: #1890ff;
  }
`;

export const StyledButton = styled(Button)`
  height: 36px;
  width: 100%;
  padding: 0px;
  border-radius: 6px;
`;

export const StyledDivider = styled(Divider)`
  margin: 24px 0;
`;
export const StyledSmallDivider = styled(Divider)`
  margin-bottom: 24px;
`;
export const StyledGapDivider = styled(Divider)`
  border-top: 0px;
  margin: 13px 0;
`;

export const StockLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  a {
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  span:nth-child(1) {
    min-width: 40px;
  }
  span:nth-child(2) {
    margin: 0 20px;
  }
  span:nth-child(3) {
    text-decoration: underline;
  }
`;

export const StyledLink = styled(Button)`
  &.ant-btn-link {
    color: black;
  }

  &.ant-btn > span {
    text-decoration: underline;
  }
`;

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

export const StyledText = styled.p`
  margin-bottom: 0px;
`;
