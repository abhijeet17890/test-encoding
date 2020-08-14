import styled from "styled-components";

export const SummaryWrapper = styled.div`
  // width: 887px;
  margin: 0 auto;
  padding: 20px 0px;
`;

export const SummaryBottomContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.top-section {
    margin-bottom: 25px;
  }
`;

export const SummaryLeftContent = styled.div`
  width: 45%;
`;
export const SummaryRightContent = styled.div`
  width: 45%;
`;

export const SummaryHeading = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  font-weight: ${(props) => props.theme.fontConfig.fontWeight2};
  line-height: 1.38;
  text-align: left;
  color: ${(props) => props.theme.colors.footerBackground};
`;

export const SummaryInfo = styled.div`
  display: flex;
  justify-content: space-between;

  &.top-cont-div {
    width: 312px;
    border-bottom: 2px solid #bfbfbf;
  }
`;

export const SummaryLeftInfo = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  text-align: left;
  color: ${(props) => props.theme.colors.footerBackground};
`;

export const SummaryRightInfo = styled.p`
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  line-height: 1.38;
  text-align: right;
  color: ${(props) => props.theme.colors.footerBackground};

  &.top-cont {
    margin-bottom: 0px;
  }
`;

export const SummaryTopLeft = styled.div`
  width: 45%;
`;

export const SummaryData = styled.p`
  color: ${(props) => props.theme.colors.footerBackground};
  text-align: right;
  font-size: ${(props) => props.theme.fontConfig.bodyTextFontSize};
  margin-bottom: 0px;
`;

export const IconDiv = styled.div`
  width: 312px;
  display: flex;

  &.start {
    justify-content: flex-start;
    margin-left: 20px;
  }

  &.end {
    justify-content: flex-end;
    // margin-right: 20px;


  }

  .icon-margin {
    margin-right: 20px;
  }
`;
