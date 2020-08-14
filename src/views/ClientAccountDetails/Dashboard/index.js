import React, { useState, useEffect } from "react";
import { Col, Row, Spin } from "antd";
import Table from "./Table";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import * as S from "./styles.js";
import Loader from "../../../sharedComponents/Loader";
import { DashboardTwoTone } from "@ant-design/icons";
import PortfolioOverview from '../PortfolioOverview/index';

import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// getAccountOverview

const getAccountOverview = (
  connectWithApi,
  setAccountData,
  setLoader,
  setShowText,
  setText,
  clientId,
  setIsFunds,
  setPageLoading
) => {
  connectWithApi()
    .getClientDashboard(clientId)
    .then((res) => {
      setLoader(false)
      setPageLoading(false);
      setAccountData(res.data);
      if (res.data[res.data.length - 1].total_cash_value > 0) {
        setShowText(false);
      } else {
        setText(res.message);
      }

      const response = res.data;
      response.map((val) => {
        if (val.stock_value === 0 && val.cash_value === 0) {
          setIsFunds(false); //kyc approved and no funds
        } else {
          setIsFunds(true); //kyc approved and funds
        }
      });
    })
    .catch((error) => {
      setLoader(false);
      setPageLoading(false);
    });
};

function Dashboard({ clientId, clientName, viewPortfolio }) {
  const [counter, setCounter] = useState(0);
  const { connectWithApi } = useInsideAuthApi();
  const [loader, setLoader] = useState(true);
  const [accountData, setAccountData] = useState([]);
  const [showText, setShowText] = useState(true);
  const [Text, setText] = useState("");
  const [isFunds, setIsFunds] = useState(false);
  const [openPortfolio, setOpenPortfolio] = useState(false);
  const[pageLoading, setPageLoading]= useState(true);

  useEffect(() => {
    getAccountOverview(
      connectWithApi,
      setAccountData,
      setLoader,
      setShowText,
      setText,
      clientId,
      setIsFunds,
      setPageLoading,
    );
  }, [counter]);

  return (
    <S.container>
      {pageLoading? <Row justify='center'><Spin indicator={antIcon}/></Row>
      :<div>
        {openPortfolio ? 
          <PortfolioOverview/>:
          <div>
        {!isFunds ? (
          <p>
            {clientName} has no available funds to invest. Please have funds
            transferred to the account to begin transactions.
          </p>
        ) : null}
        <Table info={accountData} handleClick={viewPortfolio} />
        </div>
        
      }</div>}
      
      
    </S.container>
  );
}

export default Dashboard;
