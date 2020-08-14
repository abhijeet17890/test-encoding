import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import Input from "./SharedComponents/Input/index";
import OrderHistoryTable from "./OrderHistoryTable";
import {
  StyledMainDiv,
  StyledDivider,
  PageHeading,
  TableValue,
} from "./styles";
import Divider from "../../../sharedComponents/Divider/index";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import {
  applyAmountCommaMask,
  buildQuery,
} from "../../../utils/dataManipulation";
import { defaultValues } from "../../../constants/defaultValues";
import moment from "moment";
import { Button } from "../../../sharedComponents/button";
import Loader from "../../../sharedComponents/Loader";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants/routes";

const dateFormat = "DD/MM/YYYY";

function handleChange(value) {
  console.log(`selected ${value}`);
}

function OrderHistory(props) {
  const [loader, setLoader] = useState(true);
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [pendingData, setPendingData] = useState("");
  const [passedData, setPassedData] = useState("");
  const history = useHistory();
  const tableLoading = {
    spinning: loader,
    indicator: <Loader size="large" />,
  };
  const statusOption = [
    { value: "CANCELED", data: "Cancelled" },
    { value: "FILLED", data: "Filled" },
    { value: "NEW", data: "Submitted" },
    // { value: "PARTIAL_FILL", data: "Partially Filled" },
    { value: "PENDING_CANCEL", data: "Pending Cancel" },
    { value: "REJECTED", data: "Rejected" },
  ];

  const typeOption = [
    { value: "BUY", data: "Buy" },
    { value: "SELL", data: "Sell" },
  ];

  // const changedHandler = (value) => {
  //   console.log("value", value);
  // };
  const [status, setStatus] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [open_popup, handlePopup] = useState(false);
  const [ordr_id, setOrderId] = useState("");

  const handleStartDate = (value, dateString) => {
    if (dateString !== "") {
      dateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
      setStartDate(dateString);
    } else {
      // console.log("start datestring", dateString);
      setStartDate("");
    }
  };
  const handleEndDate = (date, dateString) => {
    if (dateString !== "") {
      dateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
      // console.log("end datestring", dateString);
      setEndDate(dateString);
    } else {
      setEndDate("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    let id = props.clientId;
    let obj = {
      client_id: id,
      g_status: "PENDING",
    };
    connectWithApi()
      .getClientOrderHistory(buildQuery(obj))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = applyAmountCommaMask(data.unit)),
            (data.order_date = moment(data.tranWhen).format("DD/MM/YYYY")),
            (data.dw_status =
              data.dw_status === "NEW"
                ? "Submitted"
                : data.dw_status === "FILLED"
                ? "Filled"
                : data.dw_status === "PARTIAL_FILL"
                ? "Partially Filled"
                : data.dw_status === "REJECTED"
                ? "Rejected"
                : data.dw_status == "CANCELED"
                ? "Cancelled"
                : data.dw_status === "PENDING_CANCEL"
                ? "Pending Cancel"
                : "")
          )
        );
        setPendingData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });

    let obj1 = {
      client_id: id,
      g_status: "PASS",
    };
    connectWithApi()
      .getOrderHistory(buildQuery(obj1))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = applyAmountCommaMask(data.unit)),
            (data.order_date = moment(data.tranWhen).format("DD/MM/YYYY")),
            (data.dw_status =
              data.dw_status === "NEW"
                ? "Submitted"
                : data.dw_status === "FILLED"
                ? "Filled"
                : data.dw_status === "PARTIAL_FILL"
                ? "Partially Filled"
                : data.dw_status === "REJECTED"
                ? "Rejected"
                : data.dw_status == "CANCELED"
                ? "Cancelled"
                : data.dw_status === "PENDING_CANCEL"
                ? "Pending Cancel"
                : "")
          )
        );
        setPassedData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }, []);

  const pendingOrderColumn = [
    {
      title: "Name",
      key: 1,
      render: (pendingData) =>
        // console.log("pppp",pendingData.instrument.name),
        pendingData.instrument.symbol + " | " + pendingData.instrument.name,
      fixed: "left",
      sorter: (a, b) =>
        // console.log("a",a.instrument.name,b)
        a.instrument.symbol.localeCompare(b.instrument.symbol),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Value",
      key: 2,
      render: (pendingData) => {
        return {
          children: (
            <TableValue className={pendingData.value > 0 ? "green" : "red"}>
              {pendingData.value >= 0
                ? "+" + defaultValues.defaultCurrency + pendingData.value
                : "-" + defaultValues.defaultCurrency + pendingData.value}
            </TableValue>
          ),
        };
      },
      sorter: (a, b) => a.value.localeCompare(b.value),
    },
    {
      title: "Units",
      key: 3,
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Order Type",
      key: 4,
      render: (pendingData) =>
        pendingData.buy_sell + " | " + pendingData.order_type,
      sorter: (a, b) => a.buy_sell.localeCompare(b.buy_sell),
    },
    {
      title: "Order Date",
      key: 5,
      dataIndex: "order_date",
      sorter: (a, b) => a.order_date.localeCompare(b.order_date),
    },
    {
      title: "Status",
      key: 6,
      dataIndex: "dw_status",
      // sorter: {
      //   compare: (a, b) => a.status - b.status,
      //   multiple: 1,
      // },
      sorter: (a, b) => a.dw_status.localeCompare(b.dw_status),
    },
    {
      title: "",
      key: 7,
      render: (text, record) =>
        record.dw_status === "Submitted" ||
        record.dw_status === "Partially Filled" ? (
          <Row gutter={15} justify={"end"}>
            <Col>
              <Button
                size="sm-2"
                // onClick={(e) => handleCancel(e, record.dw_order_id)}
                // onClick={(e) => handleOpen(e, record.id)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        ) : null,
    },
  ];
  const passedOrderColumn = [
    {
      title: "Name",
      key: 1,
      render: (passedData) =>
        passedData.instrument.symbol + " | " + passedData.instrument.name,
      fixed: "left",
      sorter: (a, b) =>
        // console.log("a",a.instrument.name,b)
        a.instrument.symbol.localeCompare(b.instrument.symbol),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Value",
      key: 2,
      // dataIndex: "value",
      render: (passedData) => {
        return {
          children: (
            <TableValue className={passedData.value > 0 ? "green" : "red"}>
              {passedData.value >= 0
                ? "+" + defaultValues.defaultCurrency + passedData.value
                : "-" + defaultValues.defaultCurrency + passedData.value}
            </TableValue>
          ),
        };
      },
      sorter: (a, b) => a.value.localeCompare(b.value),
    },
    {
      title: "Units",
      key: 3,
      dataIndex: "unit",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Order Type",
      key: 4,
      render: (passedData) =>
        passedData.buy_sell + " | " + passedData.order_type,
      sorter: (a, b) => a.buy_sell.localeCompare(b.buy_sell),
    },
    {
      title: "Order Date",
      key: 5,
      dataIndex: "order_date",
      sorter: (a, b) => a.order_date.localeCompare(b.order_date),
    },
    {
      title: "Status",
      key: 6,
      dataIndex: "dw_status",
      sorter: (a, b) => a.dw_status.localeCompare(b.dw_status),
      // sorter: {
      //   compare: (a, b) => a.status - b.status,
      //   multiple: 1,
      // },
    },
  ];

  const handleStatusSelect = (value) => {
    if (value === undefined) {
      setStatus("");
    } else {
      setStatus(value);
    }
  };

  const handleTypeSelect = (value) => {
    if (value === undefined) {
      setType("");
    } else {
      setType(value);
    }
  };
  const handleSearch = () => {
    let id = props.clientId;
    let passedArr = [];
    let pendingArr = [];
    let varData = { client_id: id };
    setLoader(true);
    if (status !== "") {
      varData = {
        ...varData,
        dw_status: statusOption.find((val) => val.data === status).value,
      };
    }
    if (type !== "") {
      varData = {
        ...varData,
        buy_sell: typeOption.find((val) => val.data === type).value,
      };
    }
    if (start_date !== "") {
      varData = { ...varData, order_date__gte: start_date + `T00:00:00` };
    }
    if (end_date !== "") {
      varData = { ...varData, order_date__lt: end_date + `T23:59:59` };
    }
    connectWithApi()
      .getOrderHistory(buildQuery(varData))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = applyAmountCommaMask(data.unit)),
            (data.order_date = moment(data.tranWhen).format("DD/MM/YYYY")),
            (data.dw_status =
              data.dw_status === "NEW"
                ? "Submitted"
                : data.dw_status === "FILLED"
                ? "Filled"
                : data.dw_status === "PARTIAL_FILL"
                ? "Partially Filled"
                : data.dw_status === "REJECTED"
                ? "Rejected"
                : data.dw_status == "CANCELED"
                ? "Cancelled"
                : data.dw_status === "PENDING_CANCEL"
                ? "Pending Cancel"
                : ""),
            data.g_status === "PASS"
              ? passedArr.push(data)
              : data.g_status === "PENDING"
              ? pendingArr.push(data)
              : ""
          )
        );
        // console.log("passed arr",passedArr,"pending arr",pendingArr)
        setPendingData(pendingArr);
        setPassedData(passedArr);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };
  const scroll = { y: 2067 };

  const handleOrder = (data) => {
    // console.log("view order", data);
    history.push({
      pathname: routes.authRoutes.orderConfirmation,
      details: data,
      redirect: "OrderDetails",
    });
  };

  return (
    <StyledMainDiv>
      <Row gutter={[0, 30]} justify="center">
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Input
            heading="Order Type"
            onChange={handleTypeSelect}
            select
            data={typeOption}
            placeholder="Select Order Type"
            default
          />
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} offset={1}>
          <Input
            heading="Order Status"
            onChange={handleStatusSelect}
            select
            data={statusOption}
            placeholder="Select Order Status"
            default
          />
        </Col>
        <Col span={1}></Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Input
            heading="Start date"
            datapicker={true}
            format={dateFormat}
            onChange={handleStartDate}
          />
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} offset={1}>
          <Input
            heading="End date"
            datapicker={true}
            format={dateFormat}
            onChange={handleEndDate}
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
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <Row></Row>
      <PageHeading>Pending Orders</PageHeading>
      <StyledDivider />

      <OrderHistoryTable
        columns={pendingOrderColumn}
        dataSource={pendingData}
        pagination={false}
        loading={tableLoading}
        onRow={(r) => ({
          onClick: () => handleOrder(r.dw_order_id),
        })}
      />
      <Row gutter={[0, 20]}>
        <Col>
          <PageHeading>Passed Orders</PageHeading>
        </Col>
      </Row>
      <OrderHistoryTable
        columns={passedOrderColumn}
        dataSource={passedData}
        pagination={false}
        loading={tableLoading}
        scroll={passedData.length > 25 ? scroll : ""}
        onRow={(r) => ({
          onClick: () => handleOrder(r.dw_order_id),
        })}
      />
    </StyledMainDiv>
  );
}

export default OrderHistory;
