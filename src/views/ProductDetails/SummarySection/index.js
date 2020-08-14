import React from "react";
import {
  SummaryWrapper,
  SummaryTopLeft,
  SummaryRightInfo,
  SummaryRightContent,
  SummaryLeftInfo,
  SummaryLeftContent,
  SummaryInfo,
  SummaryHeading,
  SummaryData,
  SummaryBottomContent,
  IconDiv,
} from "./style";
import { applyAmountCommaMask } from "../../../utils/dataManipulation";
import { defaultValues } from "../../../constants/defaultValues";

function nFormatter(num) {
  var si = [
    // { value: 1, symbol: "" },
    // { value: 1E3, symbol: "k" },
    { value: 1e6, symbol: " (M)" },
    // { value: 1E9, symbol: "G" },
    // { value: 1E12, symbol: "T" },
    // { value: 1E15, symbol: "P" },
    // { value: 1E18, symbol: "E" }
  ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  var data = num / si[i].value;
  return applyAmountCommaMask(data) + si[i].symbol;
}

export const applyVolumeCommaMask = (val) => {
  // u can pass as a number or string
  val = val.toString();
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(val)) {
    val = val.replace(rgx, "$1" + "," + "$2");
  }
  return val; // u wil get result in string format
};

const SummarySection = (props) => {
  const { header_data, other_data, summaryValue } = props;
  let dayRangeVal1 = header_data.lastTrade - summaryValue.lowPrice;
  let dayRangeVal2 = header_data.lastTrade - summaryValue.highPrice;
  let weekrange1 = header_data.lastTrade - summaryValue.fiftyTwoWeekLowPrice;
  let weekrange2 = header_data.lastTrade - summaryValue.fiftyTwoWeekHighPrice;
  const data = [
    {
      data: "Close",
      value:
        other_data.closePrior === undefined
          ? "-"
          : other_data.closePrior >= 0
          ? defaultValues.defaultCurrency + applyAmountCommaMask(other_data.closePrior)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(other_data.closePrior)), //"$266.07" ,
    },
    {
      data: "Open",
      value:
        summaryValue.openPrice === undefined
          ? "-"
          : summaryValue.openPrice >= 0
          ? defaultValues.defaultCurrency + applyAmountCommaMask(summaryValue.openPrice)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(summaryValue.openPrice)),
    },
    {
      data: "Price",
      value:
        header_data.lastTrade === undefined
          ? "-"
          : header_data.lastTrade >= 0
          ? defaultValues.defaultCurrency +applyAmountCommaMask(header_data.lastTrade)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(header_data.lastTrade)), //"$266.47",
    },
    {
      data: "Volume ",
      value:
        summaryValue.cumulativeVolume === undefined
          ? "-"
          : summaryValue.cumulativeVolume >= 0
          ? applyVolumeCommaMask(summaryValue.cumulativeVolume)
          : // applyVolumeCommaMask(summaryValue.cumulativeVolume)
            "-" + applyVolumeCommaMask(Math.abs(summaryValue.cumulativeVolume)), //"5,470,254",
    },
    // {
    //   data: "Total Cumulative Volume",
    //   value: summaryValue.cumulativeVolume,
    // },
    {
      data: "Market Capitalisation",
      value:
        summaryValue.marketCap === undefined
          ? "-"
          : summaryValue.marketCap >= 0
          ? defaultValues.defaultCurrency +
            nFormatter(summaryValue.marketCap)
          : "-" +
            defaultValues.defaultCurrency +
            nFormatter(Math.abs(summaryValue.marketCap)),
      // applyAmountCommaMask(summaryValue.marketCap)
    },
    {
      data: "Shares Outstanding",
      value:
        summaryValue.sharesOutstanding === undefined
          ? "-"
          : nFormatter(summaryValue.sharesOutstanding),
      // applyAmountCommaMask(summaryValue.sharesOutstanding),
    },
    {
      data: "10 Day Moving Average Volume",
      value:
        summaryValue.volumeMovingAverage10Day === undefined
          ? "-"
          : applyVolumeCommaMask(summaryValue.volumeMovingAverage10Day),
    },
    {
      data: "25 Day Moving Average Volume",
      value:
        summaryValue.volumeMovingAverage25Day === undefined
          ? "-"
          : applyVolumeCommaMask(summaryValue.volumeMovingAverage25Day),
    },
    {
      data: "50 Day Moving Average Volume",
      value:
        summaryValue.volumeMovingAverage50Day === undefined
          ? "-"
          : applyVolumeCommaMask(summaryValue.volumeMovingAverage50Day),
    },
    {
      data: "50 Day Moving Average Price",
      value:
        summaryValue.priceMovingAverage50Day === undefined
          ? "-"
          : summaryValue.priceMovingAverage50Day >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.priceMovingAverage50Day)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(
              Math.abs(summaryValue.priceMovingAverage50Day)
            ),
    },
    {
      data: "150 Day Moving Average Price",
      value:
        summaryValue.priceMovingAverage150Day === undefined
          ? "-"
          : summaryValue.priceMovingAverage150Day >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.priceMovingAverage150Day)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(
              Math.abs(summaryValue.priceMovingAverage150Day)
            ),
    },
    {
      data: "200 Day Moving Average Price",
      value:
        summaryValue.priceMovingAverage200Day === undefined
          ? "-"
          : summaryValue.priceMovingAverage200Day >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.priceMovingAverage200Day)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(
              Math.abs(summaryValue.priceMovingAverage200Day)
            ),
    },
  ];

  const data2 = [
    {
      data: "EPS",
      value:
        summaryValue.earningsPerShare === undefined
          ? "-"
          : summaryValue.earningsPerShare >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.earningsPerShare)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(summaryValue.earningsPerShare)),
    },
    {
      data: "Dividend",
      value:
        summaryValue.dividend === undefined
          ? "-"
          : summaryValue.dividend >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.dividend)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(summaryValue.dividend)),
    },
    {
      data: "Book Value (Per Share)",
      value:
        summaryValue.bookValuePerShare === undefined
          ? "-"
          : defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.bookValuePerShare),
    },
    {
      data: "Cash Flow (Per Share)",
      value:
        summaryValue.cashFlowPerShare === undefined
          ? "-"
          : summaryValue.cashFlowPerShare >= 0
          ? defaultValues.defaultCurrency +
            applyAmountCommaMask(summaryValue.cashFlowPerShare)
          : "-" +
            defaultValues.defaultCurrency +
            applyAmountCommaMask(Math.abs(summaryValue.cashFlowPerShare)),
    },
    {
      data: "Operating Income",
      value:
        summaryValue.operatingIncome === undefined
          ? "-"
          : summaryValue.operatingIncome > 0
          ? defaultValues.defaultCurrency +
            nFormatter(summaryValue.operatingIncome)
          : "-" +
            defaultValues.defaultCurrency +
            nFormatter(Math.abs(summaryValue.operatingIncome)),
      // defaultValues.defaultCurrency +
      // applyAmountCommaMask(summaryValue.operatingIncome),
      // nFormatter(summaryValue.operatingIncome),
    },
    {
      data: "Return on Equity",
      value:
        summaryValue.roe === undefined
          ? "-"
          : applyAmountCommaMask(summaryValue.roe),
    },
    {
      data: "P/E",
      value:
        summaryValue.peRatio === undefined
          ? "-"
          : summaryValue.peRatio === 0
          ? "-"
          : applyAmountCommaMask(summaryValue.peRatio),
    },
    {
      data: "Dividend Yield",
      value:
        summaryValue.dividendYield === undefined
          ? "-"
          : summaryValue.peRatio === 0
          ? "-"
          : applyAmountCommaMask(summaryValue.dividendYield),
    },
    {
      data: "Price to Book",
      value:
        summaryValue.pbRatio === undefined
          ? "-"
          : applyAmountCommaMask(summaryValue.pbRatio),
    },
  ];

  return (
    <SummaryWrapper>
      <SummaryBottomContent className="top-section">
        <SummaryTopLeft>
          <SummaryHeading>Day Range</SummaryHeading>
          <>
            <SummaryInfo className="top-cont-div">
              <SummaryData>
                {summaryValue.lowPrice === undefined
                  ? "-"
                  : "$" + applyAmountCommaMask(summaryValue.lowPrice)}
              </SummaryData>
              <SummaryData>
                {summaryValue.highPrice === undefined
                  ? "-"
                  : "$" + applyAmountCommaMask(summaryValue.highPrice)}
              </SummaryData>
            </SummaryInfo>
            <IconDiv
              className={
                Math.abs(dayRangeVal1) > Math.abs(dayRangeVal2)
                  ? "end"
                  : "start"
              }
            >
              <img
                className="icon-margin"
                src={require("../../../assets/Polygon 7.svg")}
                alt=""
              />
            </IconDiv>
          </>
        </SummaryTopLeft>
        <SummaryTopLeft>
          <SummaryHeading>52 Week Range</SummaryHeading>
          <>
            <SummaryInfo className="top-cont-div">
              <SummaryData>
                {summaryValue.fiftyTwoWeekLowPrice === undefined
                  ? "-"
                  : "$" +
                    applyAmountCommaMask(summaryValue.fiftyTwoWeekLowPrice)}
              </SummaryData>
              <SummaryData>
                {summaryValue.fiftyTwoWeekHighPrice === undefined
                  ? "-"
                  : "$" +
                    applyAmountCommaMask(summaryValue.fiftyTwoWeekHighPrice)}
              </SummaryData>
            </SummaryInfo>
            <IconDiv
              className={
                Math.abs(weekrange1) > Math.abs(weekrange2) ? "end" : "start"
              }
            >
              <img
                className="icon-margin"
                src={require("../../../assets/Polygon 7.svg")}
                alt=""
              />
            </IconDiv>
          </>
        </SummaryTopLeft>
      </SummaryBottomContent>
      <SummaryBottomContent>
        <SummaryLeftContent>
          {/* Left Content */}
          <SummaryHeading>Market Information</SummaryHeading>
          {data.map((d, index) =>
            d.value !== "" ? (
              <SummaryInfo key={index}>
                <SummaryLeftInfo>{d.data}</SummaryLeftInfo>
                <SummaryRightInfo>{d.value}</SummaryRightInfo>
              </SummaryInfo>
            ) : null
          )}
        </SummaryLeftContent>
        <SummaryRightContent>
          {/* Right Content */}
          <SummaryHeading>Financial Information</SummaryHeading>
          {data2.map((d, index) =>
            d.value !== "" ? (
              <SummaryInfo key={index}>
                <SummaryLeftInfo>{d.data}</SummaryLeftInfo>
                <SummaryRightInfo>{d.value}</SummaryRightInfo>
              </SummaryInfo>
            ) : null
          )}
        </SummaryRightContent>
      </SummaryBottomContent>
    </SummaryWrapper>
  );
};

export default SummarySection;
