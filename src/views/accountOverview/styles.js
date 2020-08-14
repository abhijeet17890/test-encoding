import styled from 'styled-components';
import { Result, Table } from 'antd';
import 'antd/dist/antd.css';
import Divider from '../../sharedComponents/Divider/index';
import {Button} from '../../sharedComponents/button/index';

export const container = styled.div`
   text-align: left;
   width:95%;
   max-width: 1280px;
   margin: ${window.innerWidth > 768 ? '0px' : '64px'} auto 30px auto; 
   font-size: ${window.innerWidth > 768 ? (props) => props.theme.fontConfig.bodyTextFontSize : '12px'};
   color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;

export const PageContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledResult = styled(Result)`
    .ant-result-subtitle{
        width: 44vw;
        font-size: ${(props) => props.theme.fontConfig.menuHeadingFontSize};
        text-align: center;
        color: #000000;
    }  
    .ant-result-icon{
        margin-bottom:10px;
    }

`;

export const StyledDivider = styled(Divider)`
   margin: 24px 0;
`;
export const StyledSmallDivider = styled(Divider)`
   margin: 0;
   margin-bottom: 24px;
`;
export const StockTable = styled(Table)`
   .ant-table-tbody > tr > td {
      border-bottom: solid 1px #c7c7c7;
      -webkit-transition: background 0.3s;
      transition: background 0.3s;
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
      color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
   }
   .ant-table-container table > thead > tr:first-child th{
      background-color: #3393D9;  // add color in global component
      font-size: ${(props) => props.theme.fontConfig.menuHeadingFontSize};
      line-height: 1.22;
      color: ${(props) => props.theme.colors.btnTextColor};
   }
   .ant-table-column-sorter-up,.ant-table-column-sorter-down{
      color: ${(props) => props.theme.colors.btnTextColor};
   }
   .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active {
      color: #5AC680;  // add color in global component
   }
   .ant-table-tbody > tr > td, .ant-table-thead > tr > th{
      text-align: right;
   }
   .ant-table-tbody > tr > td:first-child, .ant-table-thead > tr > th:first-child{
      text-align: left;
   }
   .ant-table-container table > tbody > tr:last-child td{
        background-color: #DFEFFA;  // not a original style
   }
   .ant-table-container table > tbody > tr:first-child td{
        background-color: ${(props) => props.theme.colors.btnTextColor};
   }
`;

export const StockButton = styled(Button)`
    padding: 0 15px !important;
    min-width: 95px;
    height: 37px;
    display: flex;
    align-items: center;
`;
export const Img = styled.img`
   width: 25vw;
   height: 20vw;
   objectFit: contain;
`;

export const StyledUp = styled.div`
   color: ${(props) => props.theme.colors.stockMarketUp};
`;
export const StyledDown = styled.div`
   color: ${(props) => props.theme.colors.stockMarketDown};
`;