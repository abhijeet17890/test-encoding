import styled from "styled-components";
import { Steps } from "antd";

const antStepsHorizontalClass = `.ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item`;
const antStepsItemContainerClass = ` > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title`;

export const CustomAntSteps = styled.div`
  width: 43%;
  margin: 0px auto;
  ${antStepsHorizontalClass} {
    margin-right: 0px;
    padding-left: 0px;
  }
  @media (max-width: 480px) {
    width: 80%;
    ${antStepsHorizontalClass} {
      margin-right: 15px;
    }
  }
  @media (max-width: 320px) {
    width: 80%;
    ${antStepsHorizontalClass} {
      margin-right: 8px;
    }
  }
`;
export const CustomAntStepsIcon = styled(Steps)`
  .ant-steps-icon {
    display: none;
  }
  .ant-steps-item-icon {
    border: 2px solid #b1b9c6;
    width: 37px;
    height: 37px;
    margin-right: 0px;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    width: 37px;
    height: 37px;
    background-color: ${(props) => props.theme.colors.primaryThemeColor};
    border: 2px solid ${(props) => props.theme.colors.primaryThemeColor};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    border: 3px solid ${(props) => props.theme.colors.primaryThemeColor};
  }
  .ant-steps-item-title::after {
    border: 1px solid #b1b9c6;
  }
  .ant-steps-item-finish ${antStepsItemContainerClass}::after {
    border: 1px solid ${(props) => props.theme.colors.primaryThemeColor};
  }
  .ant-steps-item-process
    ${antStepsItemContainerClass},
    .ant-steps-item-finish
    ${antStepsItemContainerClass} {
    color: #ffffff;
    padding-right: 11px;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background: ${(props) => props.theme.colors.primaryThemeColor};
  }
  .ant-steps-item-title {
    padding-right: 9px;
    right: 28px;
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
    font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
    font-size: 15px;
    vertical-align: middle;
  }
  .ant-steps-item-wait ${antStepsItemContainerClass} {
    color: ${(props) => props.theme.colors.bodyPrimaryTextColor};
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 37px;
    border-radius: 5px;
    border: 1px solid #d0d0d0;
    padding-left: 10px;
  }
  @media (max-width: 480px) {
    &.ant-steps-horizontal.ant-steps-label-horizontal {
      flex-direction: row;
    }
    .ant-steps-item-icon,
    .ant-steps-item-finish .ant-steps-item-icon {
      width: 32px;
      height: 32px;
    }
    &.ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-content {
      overflow: visible;
      min-height: 0px;
      display: inline-block;
    }
    .ant-steps-item-title {
      right: 41px;
    }
    .ant-steps-item-content {
      vertical-align: middle;
    }
    &.ant-steps-horizontal.ant-steps-label-horizontal
      > .ant-steps-item
      > .ant-steps-item-container
      > .ant-steps-item-tail {
      top: -28px;
      left: 32px;
      width: 81px;
      border-bottom: 1px solid #b1b9c6;
      transform: rotate(0deg);
    }
    &.ant-steps-horizontal.ant-steps-label-horizontal
      > .ant-steps-item.ant-steps-item-finish
      > .ant-steps-item-container
      > .ant-steps-item-tail {
      border-bottom: 1px solid
        ${(props) => props.theme.colors.primaryThemeColor};
    }
  }
`;
export const StyledComponent = styled.div`
  margin-top: ${(props) => props.theme.elementDistances.h1DisTop};
  margin-bottom: ${(props) => props.theme.elementDistances.h1DisTop};
`;
