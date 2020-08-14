import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import Input from "./SharedComponents/Input/index";
import TransactionTable from "./TransactionTable";
import { StyledMainDiv, StyledDivider, StyledCheckbox } from "./styles";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import { buildQuery } from "../../../utils/dataManipulation";
import { applyAmountCommaMask } from "../../../utils/dataManipulation";
import { defaultValues } from "../../../constants/defaultValues";
import moment from "moment";
import { Checkbox } from "../../../sharedComponents/Checkbox";

const dateFormat = "YYYY-MM-DD";
function handleChange(value) {
  console.log(`selected ${value}`);
}

function TransactionHistory(props) {
  const [filter, handleFilter] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [account_id, setAccountId] = useState("");
  const [start_date, setStartDate] = useState("2020-01-01");
  const [end_date, setEndDate] = useState("2020-07-29");
  const [loader, setLoader] = useState(true);
  const [account_info, setAccountInfo] = useState([]);
  const handleCheckbox = (value) => {
    handleFilter(value);
  };

  const handleStartDate = (value, dateString) => {
    dateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    // console.log("datestring", dateString);
    setStartDate(dateString);
  };
  const handleEndDate = (date, dateString) => {
    dateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    // console.log("datestring", dateString);
    setEndDate(dateString);
  };

  const handleSearch = () => {
    setLoader(true);
    let varData = {
      start_date: start_date || "2020-01-01",
      end_date: end_date || "2020-07-29",
      client_id: props.clientId,
    };
    connectWithApi()
      .getTransactionHistory(account_id, buildQuery(varData))
      .then((res) => {
        res.data.map(
          (data) => (
            data.finTranTypeID === "CSR"
              ? (data.finTranTypeID = "Deposit")
              : data.finTranTypeID === "CSD"
              ? (data.finTranTypeID = "Withdrawal")
              : data.finTranTypeID === "SPUR"
              ? (data.finTranTypeID = "Purchase")
              : data.finTranTypeID === "SSAL"
              ? (data.finTranTypeID = "Sale")
              : "",
            // data.tranWhen = data.tranWhen.split("T")
            (data.tranWhen = moment(data.tranWhen).format("DD/MM/YYYY")),
            // (data.tranWhen = data.tranWhen[0]),
            (data.accountAmount =
              data.accountAmount >= 0
                ? "$" + applyAmountCommaMask(data.accountAmount)
                : "-$" + applyAmountCommaMask(Math.abs(data.accountAmount))),
            // "$ " + applyAmountCommaMask(data.accountAmount)
            (data.accountBalance =
              data.accountBalance >= 0
                ? "$" + applyAmountCommaMask(data.accountBalance)
                : "-$" + applyAmountCommaMask(Math.abs(data.accountBalance)))
          )
        );
        setHistoryData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    let obj = {
      client_id: props.clientId,
    };
    connectWithApi()
      .getAccountDetails(buildQuery(obj))
      .then((res) => {
        let data = res.data[0].nick_name + "/" + res.data[0].dw_account_number;
        setAccountInfo([...account_info, data]);
        // console.log("dddddddddddddd", res.data[0].id)
        setAccountId(res.data[0].id);
        let acc_id = res.data[0].id;
        let id = props.clientId;
        let varData = {
          client_id: id,
          start_date: start_date,
          end_date: end_date,
        };

        connectWithApi()
          .getClientTransactionHistory(acc_id, buildQuery(varData))
          .then((res) => {
            res.data.map(
              (data) => (
                data.finTranTypeID === "CSR"
                  ? (data.finTranTypeID = "Deposit")
                  : data.finTranTypeID === "CSD"
                  ? (data.finTranTypeID = "Withdrawal")
                  : data.finTranTypeID === "SPUR"
                  ? (data.finTranTypeID = "Purchase")
                  : data.finTranTypeID === "SSAL"
                  ? (data.finTranTypeID = "Sale")
                  : "",
                // data.tranWhen = data.tranWhen.split("T")
                (data.tranWhen = moment(data.tranWhen).format("DD/MM/YYYY")),
                // (data.tranWhen = data.tranWhen[0]),
                (data.accountAmount =
                  data.accountAmount >= 0
                    ? "$" + applyAmountCommaMask(data.accountAmount)
                    : "-$" +
                      applyAmountCommaMask(Math.abs(data.accountAmount))),
                (data.accountBalance =
                  data.accountBalance >= 0
                    ? "$" + applyAmountCommaMask(data.accountBalance)
                    : "-$" +
                      applyAmountCommaMask(Math.abs(data.accountBalance)))
              )
            );
            setHistoryData(res.data);
            setLoader(false);
          })
          .catch((error) => {
            Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
            console.log(error);
          });
        // getTransactionHist(connectWithApi,res.data[0].accountSummary.accountID)
        setLoader(false);
        // 2020-01-01
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }, []);

  return (
    <StyledMainDiv>
      <Row>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Input
            heading="Account"
            onChange={handleChange}
            select={true}
            default={true}
            data={account_info}
          />
        </Col>
      </Row>
      <StyledDivider />
      <Row>
        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
          <Input
            heading="Start date"
            onChange={handleStartDate}
            datapicker={true}
            value={start_date}
          />
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} xl={3} offset={1}>
          <Input
            heading="End date"
            onChange={handleEndDate}
            datapicker={true}
            value={end_date}
          />
        </Col>
        <Col xs={12} sm={12} md={1} lg={3} xl={3} offset={1}>
          <Input
            heading=" "
            onClick={handleSearch}
            button={true}
            type="primary"
            content="Search"
          />
        </Col>
      </Row>
      <StyledDivider />
      <StyledCheckbox onChange={handleCheckbox}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Sale">Sale</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Purchase">Purchase</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Deposit">Deposit</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Withdrawal">Withdrawal</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Dividend">Dividend</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Interest">Interest</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Fees">Fees</Checkbox>
          </Col>
          <Col xs={6} sm={6} md={6} lg={3} xl={3}>
            <Checkbox value="Commission">Commission</Checkbox>
          </Col>
        </Row>
      </StyledCheckbox>
      <StyledDivider />

      <TransactionTable
        filter={filter}
        historyData={historyData}
        loader={loader}
      />
    </StyledMainDiv>
  );
}

export default TransactionHistory;
