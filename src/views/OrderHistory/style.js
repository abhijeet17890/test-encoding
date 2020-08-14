import styled from "styled-components";
import { Table, Row, Col } from "antd";
import { DatePicker } from "antd";
import Form from "antd/lib/form/Form";

export const OrderWrapper = styled.div`
  margin: 0% 15%;

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

export const SubHeading = styled.p`
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
`;

export const StyledTable = styled(Table)`
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
    font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
    color: ${(props) => props.theme.colors.h2Color};
  }

  .ant-table-tbody > tr > td {
    cursor: pointer;
  }

  .ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    text-align: right;
    // color:red
 }
 .ant-table-tbody > tr > td:first-child, .ant-table-thead > tr > th:first-child{
    text-align: left;
    // color:green
 }

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

export const Styleddatepicker = styled(DatePicker)`
  border: solid 1px #d9d9d9;
  border-radius: 6px;
  min-height: 36px;
  width: 100%;
  .ant-picker-suffix {
    color: #2c93d9;
  }
  &.ant-picker:hover,
  &.ant-picker-focused {
    border-color: #000000;
  }

  .ant-picker-input > input{
    font-size:16px;
  }
`;

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  padding-left: 22px !important;
  justify-content: center;
  padding-right: 8px;
  margin-top: 6px;
`;

export const StyledRow = styled(Row)`
  margin-top: 19.5px;
  // margin:19.5px 15.5px 0px 18.5px ;

  &.heading {
    margin-top: 40.5px;
  }
`;

export const TableValue = styled.div`
  &.red {
    color: #fd0d1b;
  }

  &.green {
    color: #00b569;
  }
`;

export const ModalText = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  padding: 0px 47px;
  text-align: center;
  color: ${(props) => props.theme.colors.h2Color};
`;

export const StyledForm = styled(Form)`
  margin-left: 18.5px;
`;

export const StyledText = styled.p`
margin-bottom:0px;

:hover{
  text-decoration:underline;
}
`;