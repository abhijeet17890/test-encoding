import styled from 'styled-components';
import { Table,Checkbox} from 'antd';
import 'antd/dist/antd.css';
import Divider from '../../../sharedComponents/Divider'


export const StyledMainDiv = styled.div`
   width: 92%;
   margin:20px  auto;
  
`;

export const StyledDivider = styled(Divider)`
   margin: 12px 0;
   border-top: 0px;
`;
export const StyledSmallDivider = styled(Divider)`
   margin-bottom: 24px;
`;

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
.ant-table-tbody > tr > td{
   text-align: center;
}
`;

export const StyledCheckbox = styled(Checkbox.Group)`
&.ant-checkbox-group {
   width:100%;
}

.ant-checkbox + span{
   font-size:${(props) => props.theme.fontConfig.bodyTextFontSize};
  color: ${(props) => props.theme.colors.h1Color};

`;