import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

export const UploadImageMessage = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
`;

export const BlueImageIcon = styled.img`
  width: 13.3px;
  height: 15.2px;
  margin-right: 10px;
`;
export const RemovedImageIcon = styled(CloseOutlined)`
  border: 1px solid #f66666;
  background-color: #f66666;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  width: 16px;
  height: 16px;
  padding-top: 1px;
`;

export const ImageName = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 226px;
  vertical-align: text-top;
`;
