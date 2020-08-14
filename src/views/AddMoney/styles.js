import styled from 'styled-components';
import { SubHeading } from '../../sharedComponents/Heading';
import { Radio, Row, Col } from 'antd';
import {Button  } from '../../sharedComponents/button';
import 'antd/dist/antd.css';

export const CustomListItem = styled.li`
    border-bottom:none;
    list-style:decimal;
    margin-left:18px;
    margin-bottom:13px;
    color:${props=>props.nestedList? '#1997fc': '#1d1d1d'};
    font-size:${props=>props.theme.fontConfig.bodyTextFontSize};
    font-weight:normal;

`;
export const Content = styled.div`
  
`;
export const StyledDiv = styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;

export const Span = styled.span`
    padding-right: 5px;
    margin-left: 5px;
`;
export const StyledSubHeading = styled(SubHeading)`
    font-size:20px;
`;

export const CustomizedRadioGroup = styled(Radio.Group)`
    display:flex;
    justify-content: space-between;
`;
export const ModalContent = styled.div`
    text-align:center;
`;
export const ModalButton = styled(Button)`
    width:202px;
    height:42px;
    border-radius:6px;
`;

export const ButtonRow = styled(Row)`
    margin-top:130px;
`;
export const Labels = styled.p`
    font-size:18px;
    line-height:1.8;

`;
