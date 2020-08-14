import styled from 'styled-components';
import { Select } from '../../sharedComponents/Select/index';
import { Button } from '../../sharedComponents/button';
import { Table } from 'antd';
import 'antd/dist/antd.css';

export const Container = styled.div`
    padding-top:20px;
    height: max-content;
    background-image: linear-gradient(67deg, #05274a 24%, #309fe9 91%);
    margin-bottom: 46px;
`;

export const PageContainer = styled.div`
    text-align: left;
    width:95%;
    margin: ${window.innerWidth > 768 ? '20px' : '64px'} auto 30px auto; 
    font-size: ${window.innerWidth > 768 ? (props) => props.theme.fontConfig.bodyTextFontSize : '12px'};
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;
export const StyledSelect = styled(Select)`
    color: #ffff;
    .ant-select-selector.ant-select-selector.ant-select-selector, .ant-select-selector.ant-select-selector.ant-select-selector:hover {
        border-color: #ffff;
        background-color: Transparent;
    }
    .ant-select-arrow {
        color:#ffff;
    }
`;
export const Text = styled.div`
    object-fit: contain;
    font-size: ${props=>props.small? '14px': '18px'};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #ffffff;
`;
export const SubTitle = styled.span`
    font-size:14px;
    text-align:right;
  
`;

export const StyledTable = styled(Table)`
.ant-table-tbody > tr > td, .ant-table-thead > tr > th{
    text-align: right;
 }
 .ant-table-tbody > tr > td:first-child, .ant-table-thead > tr > th:first-child{
    text-align: left;
 }
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

export const StyledButton = styled(Button)`
    padding: 0 15px !important;
    min-width: 95px;
    height: 37px;
    display: flex;
    align-items: center;
`;

export const TableValue = styled.div`
  &.red {
    color: #fd0d1b;
  }

  &.green {
    color: #00b569;
  }
`;