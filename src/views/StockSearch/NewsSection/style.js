import styled from "styled-components";
import { Divider } from "antd";
import {SubHeading} from '../../../sharedComponents/Heading/index';
import {Button} from '../../../sharedComponents/button/index';


export const Heading = styled(SubHeading)`
  color: #0097ff; //need to add in common component
`;

export const NewsTime = styled.p`
  object-fit: contain;
  font-size: 12px; //need to add in common component
  color: ${(props) => props.theme.colors.footerBackground};
`;

export const NewsInformation = styled.p`
  object-fit: contain;
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  color: ${(props) => props.theme.colors.footerBackground};
  margin-bottom: 0px;
`;

export const NewsInfoDiv = styled.div`
  &.viewless {
    height: 78px;    //need to add in common component
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const NewsButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;


export const ReadMoreBtn = styled(Button)`
  padding: 0px;
  color: ${(props) => props.theme.colors.btnLgBackground};
  background-color: ${(props) => props.theme.colors.btnTextColor};

  &.ant-btn > span{
      text-decoration:underline;
  }
  `;
