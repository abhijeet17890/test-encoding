import styled from 'styled-components';
import { Result, Table } from 'antd';
import {Button} from '../../../../sharedComponents/button/index';

import 'antd/dist/antd.css';

export const StyledTable = styled(Table)`
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
   .ant-table-tbody > tr > td:last-child{
      text-align: end;
   }
   .ant-table-container table > tbody > tr:last-child td{
        background-color: #DFEFFA;  // not a original style
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