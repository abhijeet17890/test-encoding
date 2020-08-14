import styled, {createGlobalStyle} from 'styled-components';
import { Typography, AutoComplete, Table, Tabs} from "antd";
import {Select} from '../../sharedComponents/Select/index';
import {Button} from '../../sharedComponents/button/index';
import Divider from '../../sharedComponents/Divider/index';
import 'antd/dist/antd.css'
const { Title } = Typography;

export const Stock = styled.div`
   text-align: left;
   width:95%;
   max-width: 1080px;
   margin: ${window.innerWidth > 768 ? '0px' : '64px'} auto 30px auto; 
   font-size: ${window.innerWidth > 768 ? (props) => props.theme.fontConfig.bodyTextFontSize : '12px'};
   color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
   img{
      max-width: 100%;
   }
   a:not(.ant-btn){
      color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
   }

   .text-center{
      text-align: center;
   }
`;

export const CenterTable = styled.div`
   text-align: center;
`;

export const StockTab = styled(Tabs)`
   padding-top: 0px;
   &.ant-tabs-top > .ant-tabs-nav::before{
      border-bottom: ${(props) => props.theme.colors.btnTextColor};
   }
   .ant-tabs-tab.ant-tabs-tab{
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
   }
   &.ant-tabs-tab-active{
      color: ${(props) => props.theme.colors.bodyPrimaryTextColor};;
   }
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
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
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
`;


export const StockSelect = styled(Select)`
   width: 98%;
   &.ant-select-show-search.ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
      height: 40px;
   }
   &.ant-select-single .ant-select-selector .ant-select-selection-placeholder{
      line-height: 38px;
   }
`;

export const StockSearch = styled(AutoComplete)`
   width: 98%;
   .ant-input-group .ant-input{
      height: 40px; // need to add global style
      margin-top: -2px;
      border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
      border: 1px solid ${(props) => props.theme.colors.normalInputBorder};

   }
   .ant-input-search-button{
      border-radius: ${window.innerWidth > 768 ? '' : (props) => props.theme.generalConfig.inputBorderRadius+' !important'};
   }
   .ant-input-search-enter-button input + .ant-input-group-addon .ant-input-search-button {
      display: none;
   }
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

export const StyledButton = styled(Button)`
   height: 40px;  // need to add global style
   width: 40px;
`;

export const StyledUp = styled.div`
   color: ${(props) => props.theme.colors.stockMarketUp};
`;
export const StyledDown = styled.div`
   color: ${(props) => props.theme.colors.stockMarketDown};
`;

export const Gain = styled.div`
   display: block;
   width: ${window.innerWidth > 768 ? '13px' : '10px'};
   height: ${window.innerWidth > 768 ? '13px' : '10px'};
   border-top: 2px solid ${(props) => props.theme.colors.stockMarketUp};
   border-left: 2px solid ${(props) => props.theme.colors.stockMarketUp};
   margin: 0 auto;
   transform: rotate(45deg);
   &::after{
      content: "";
      display: block;
      width: 2px;
      height: ${window.innerWidth > 768 ? '23px' : '15px'};
      background-color: ${(props) => props.theme.colors.stockMarketUp};
      transform: ${window.innerWidth > 768 ? 'rotate(-45deg) translate(8px, 2px)' : 'rotate(-45deg) translate(5px, 2px)'};
      left: 0;
      top: 0;
    }
`;


export const Lose = styled.div`
   display: block;
   width: ${window.innerWidth > 768 ? '13px' : '10px'};
   height: ${window.innerWidth > 768 ? '13px' : '10px'};
   border-top: 2px solid ${(props) => props.theme.colors.stockMarketDown};  
   border-left: 2px solid ${(props) => props.theme.colors.stockMarketDown}; 
   margin: 0 auto;
   transform: rotate(-135deg);
   margin-top: 9px;
   &::after{
      content: "";
      display: block;
      width: 2px;
      height: ${window.innerWidth > 768 ? '23px' : '15px'};
      background-color: ${(props) => props.theme.colors.stockMarketDown};
      transform: ${window.innerWidth > 768 ? 'rotate(-45deg) translate(8px, 2px)' : 'rotate(-45deg) translate(5px, 2px)'};
      left: 0;
      top: 0;
    }
`;


export const GlobalCss = createGlobalStyle`
   .ant-input-group-wrapper{
      line-height: 2.5715;
   }
   .ant-select-item-group{
      display: none;
   }
   //fixed issue for scrollbar issue
   .ant-select-item{
      width: 97%;
  }
`;


export const ProgressStyle = styled.div`
   padding: 4px;
   border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
   border: solid 1.5px ${(props) => props.theme.colors.graphMainColor}; 
   background-color: ${(props) => props.theme.colors.btnOutlinedBackgroundColor};
   div{
      background-color: ${(props) => props.theme.colors.btnTextColor};
      border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
   }
   .progress-bar{
      height: 14px;
      border-radius: ${(props) => props.theme.generalConfig.inputBorderRadius};
      background-color: ${(props) => props.theme.colors.graphMainColor};
      width: ${(props) => props.width};
   }
`;

export const headingStyle = styled.div`
   p{
      font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
      color: #2d2d2d;  // need to add in global style
   }
`;

export const StockButton = styled(Button)`
    padding: 0 15px !important;
    min-width: 95px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledUnderline = styled.div`
   text-decoration: underline;
`;

export const StockLink = styled.div`
   display: flex;
   align-items: center;
   text-decoration:none;
   color:${(props) => props.theme.colors.bodyPrimaryTextColor};
   a{
      color:${(props) => props.theme.colors.bodyPrimaryTextColor};
   }
   span:nth-child(1){
      min-width: 40px;
   }
   span:nth-child(2){
      margin: 0 20px;
   }
   span:nth-child(3){
      text-decoration: underline;
   }
`;
