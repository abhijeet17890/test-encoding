import styled from 'styled-components';
import {Button} from '../../../sharedComponents/button';
import {Row} from 'antd';


export const CustomListItem = styled.li`
    border-bottom:none;
    list-style:${props=>props.nestedList?'disc':'decimal'};
    margin-left:${props=>props.table?'18px':'20px'};
    margin-bottom:13px;
    color:${props=>props.nestedList? '#1997fc': '#1d1d1d'};
    font-size:${props=>props.theme.fontConfig.bodyTextFontSize};
    font-weight:normal;

`;
export const Content = styled.div`
    max-width: 835px;
`;
export const StyledDiv = styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;
export const ListItem = styled.span`
    color:${props=>props.theme.colors.bodyPrimaryTextColor};
`;
export const Span = styled.span`
    padding-right: 5px;
    margin-left: 5px;
`;
export const StyledButton = styled(Button)`
    font-weight:normal;
    width: 246px;
`;

export const ButtonRow = styled(Row)`
    margin-top:70px;
`;