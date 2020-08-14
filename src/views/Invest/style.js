import styled from "styled-components";
import {Space, Form, Col} from "antd";
import "antd/dist/antd.css";
import Divider from '../../sharedComponents/Divider/index';
import {Select} from '../../sharedComponents/Select';
import {SwitchButton} from '../../sharedComponents/SwitchButton';
import {PageHeading} from '../../sharedComponents/Heading/index';

export const StyledCol = styled(Col)`
   font-size: ${window.innerWidth > 768?'18px':'14px'};
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   text-align: left;
   color: #1d1d1d;
   min-height: ${window.innerWidth > 768?'35px':'18px'};
   display: flex;
   align-items: center;
   justify-content: left;
   margin-bottom: 20px;
   justify-content: ${props => props.justify ? 'flex-end' : null};
   .ant-select-arrow{
      color:#2c93d9;
   }
   .ant-select-selector{
      border-radius: ${window.innerWidth > 768?'5px':'0px'} !important;
      border: ${window.innerWidth > 768?'':'none'} !important;
      border-bottom: ${window.innerWidth > 768?'':'1px solid #d9d9d9'} !important;
   }
`;

export const StyledHeading = styled.div`
   h2.ant-typography{
      font-size: ${window.innerWidth > 768?'28px':'18px'};
      font-stretch: normal;
      font-style: normal;
      line-height: 0.79;
      letter-spacing: normal;
      text-align: left;
      color: #011c3c;
   }
`;

export const StyledAmount = styled(Space)`
   font-size: ${window.innerWidth > 768?'18px':'14px'};
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   text-align: left;
   color: #1d1d1d;
`;

export const StyledSwitch = styled(SwitchButton)`
   margin: 0 10px;
   &.ant-switch .ant-switch-handle::before{
      background-color: ${(props)=>props.theme.colors.btnLgBackground};
   }
`;

export const StyledDiv = styled.div`
  display:flex;
  width: ${window.innerWidth > 768?'410px':''};
  margin: auto;
  button{
      margin: 0 10px;
  }
`;
export const StyledCenterDiv = styled.div`
  text-align:center;
  width: 100%
`;
export const StyledForm = styled(Form)`
   max-width: 550px;
   margin: auto;
   margin-top: ${window.innerWidth > 768?'15px':'60px'};
   width: 90%;
`;

export const StyledFormMain = styled(Form)`
   max-width: 700px;
   margin: auto;
   margin-top: ${window.innerWidth > 768?'15px':'60px'};
   width: 90%;
   text-align: center;
   .ant-form-item{
      width:100%;
      margin-bottom: 0px;
   }
`;

export const StyledDivider = styled(Divider)`
   margin: 24px 0;
`;
export const StyledPageHeading = styled(PageHeading)`
   text-align: left;
`;
export const StyledSmallDivider = styled(Divider)`
   margin-bottom: 24px;
`;
export const StyledGapDivider = styled(Divider)`
   border-top: 0px;
   margin: 13px 0;
`;
export const StyledSelect = styled(Select)`
   width: 100%;
   textAlign: left;
`;
export const StyledRightDiv = styled.div`
   width: 100%;
   text-align: right;
`;
export const MarketStatus = styled.div`
    margin-top:${prop=>prop.theme.elementDistances.h1DisTop};
    margin-bottom:${prop=>prop.theme.elementDistances.h1DisBottom};
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: ${(props)=>props.theme.colors.h2Color};
`;
export const StyledDotedDivider = styled(Divider)`
border-top:  2px dashed #1997fc;
margin-bottom: 15px;

`;

export const ModalText = styled.p`
font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
padding: 0px 47px;
text-align: center;
color: ${(props) => props.theme.colors.h2Color};
`;