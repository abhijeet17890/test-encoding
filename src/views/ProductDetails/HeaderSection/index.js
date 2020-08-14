import React from "react";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderTopContent,
  HeaderLeftContent,
  HeaderBottomContent,
  Paragraph,
  HeaderRightContent,
  NormalButton,
  StyledButton,
} from "./style";
import { Button } from "../../../sharedComponents/button";
import { applyAmountCommaMask } from "../../../utils/dataManipulation";
import { defaultValues } from "../../../constants/defaultValues";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants/routes";
import moment from "moment";

const HeaderSection = (props) => {
  const history = useHistory();

  const {
    header_data,
    other_data,
    summaryValue,
    changeData,
    customer_info,
  } = props;
  let current_time = moment().format("HH:mm:ss");

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTopContent>
          <HeaderLeftContent>
            <HeaderBottomContent>
              <Paragraph className="title">
                {summaryValue.symbol} | {summaryValue.companyName}{" "}
              </Paragraph>
            </HeaderBottomContent>
            <HeaderBottomContent>
              <Paragraph className="right">{other_data.sector}</Paragraph>
              {/* <Paragraph>ISIN : US0378331005</Paragraph> */}
            </HeaderBottomContent>
          </HeaderLeftContent>
          <HeaderRightContent>
            <Button size="sm1" outlined={true} className="normal-btn">
              + Watchlist
            </Button>
            <Button
              size="sm1"
              className="styled-btn"
              onClick={() =>
                history.push({
                  pathname: routes.authRoutes.invest,
                  state: {
                    symbol: summaryValue.symbol,
                    name: summaryValue.companyName,
                    id: customer_info.id,
                  },
                })
              }
            >
              Invest
            </Button>
          </HeaderRightContent>
        </HeaderTopContent>
        <HeaderBottomContent className="bottomcont">
          <Paragraph>
            {/* {console.log("header_data.bid", header_data.bid)} */}
            Sell {defaultValues.defaultCurrency + applyAmountCommaMask(header_data.bid)}
          </Paragraph>
          <Paragraph>
            Buy {defaultValues.defaultCurrency + applyAmountCommaMask(header_data.ask)}
          </Paragraph>
          {/* <Paragraph>Change {applyAmountCommaMask(changeData.day_change)}( {applyAmountCommaMask(changeData.day_change_percent)}%)</Paragraph> */}

          <Paragraph>
            Change
            {changeData.day_change === null
              ? " "
              : changeData.day_change.toString().includes("-")
              ? " " + applyAmountCommaMask(changeData.day_change)
              : " +" + applyAmountCommaMask(changeData.day_change)}
            {changeData.day_change_percent === null
              ? ""
              : changeData.day_change_percent.toString().includes("-")
              ? "" +
                "(" +
                applyAmountCommaMask(changeData.day_change_percent) +
                "%)"
              : "+" +
                "(" +
                applyAmountCommaMask(changeData.day_change_percent) +
                "%)"}
          </Paragraph>

          <Paragraph>
            As of {current_time}, {/* {summaryValue.timeLastUpdate},{" "} */}
            {header_data.dataProvider}
          </Paragraph>
        </HeaderBottomContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default HeaderSection;
