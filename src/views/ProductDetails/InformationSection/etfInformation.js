import React from "react";
import {InformationWrapper,Heading,Content,CostContent} from "./style";

const EtfInformationSection = () => {
  return (
    <InformationWrapper>
      <Heading>Objective</Heading>
      <Content>Index: S&P 500 Net Total Return</Content>
      <Content>
        Aim: The Fund seeks to track the performance of the Standard and Poor's
        500 Index.
      </Content>
      <Content>Leverage: NA</Content>
      <Content>Currency Hedging: No</Content>
      <Heading>Costs</Heading>
      <CostContent>
        <Content>Ongoing Charge (OCF/TER):</Content>
        <Content>0.07%</Content>
      </CostContent>
      <CostContent>
        <Content>Management Fee:</Content>
        <Content>0.07%</Content>
      </CostContent>
      <CostContent>
        <Content>Indicative Spread: </Content>
        <Content>0.04%</Content>
      </CostContent>
      <Content>
        In certain cases, where no TER or OCF is shown, additional costs may
        apply. Please ensure you have read the KeyInvestor Information Document,
        Factsheet, Prospectus and any other relevant documentation prior to
        investing.
      </Content>
      <Heading>Annual & Interim Reports</Heading>
      <Content>
        {" "}
        Before you invest, please make sure you read the documents below{" "}
      </Content>
      <Content className="link">View Report & Accounts</Content>
      <Content className="link">
        Simplified Prospectus/Key Investor Information Document
      </Content>
    </InformationWrapper>
  );
};

export default EtfInformationSection;
