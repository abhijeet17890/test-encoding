import React, { useState, useEffect } from "react";
import { PageHeading } from "../../sharedComponents/Heading";
import { Row, Col, Form, Tooltip } from "antd";
import {
  OrderWrapper,
  SubHeading,
  StyledTable,
  Styleddatepicker,
  StyledCol,
  StyledRow,
  TableValue,
  ModalText,
  StyledForm,
  StyledText,
} from "./style";
import Divider from "../../sharedComponents/Divider";
import Loader from "../../sharedComponents/Loader";
import SelectComponent from "./SharedComponent/select";
import { StyledFormItem } from "./SharedComponent/style";
import { Button } from "../../sharedComponents/button";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../sharedComponents/Notification";
import { applyAmountCommaMask, buildQuery,countDecimals } from "../../utils/dataManipulation";
import { defaultValues } from "../../constants/defaultValues";
import moment from "moment";
import { Modal } from "../../sharedComponents/Modal";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";

const dateFormat = "DD/MM/YYYY";

// const getAllHistory=(connectWithApi,setPendingData,setPassedData,setPaginationObj,pagination)

const OrderHistory = () => {
  const [loader, setLoader] = useState(true);
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [pendingData, setPendingData] = useState("");
  const [passedData, setPassedData] = useState("");
  const history = useHistory();
  
  const [paginationObj, setPaginationObj] = useState(defaultValues.paginationParams);

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
  const handleClose = () => {
    handlePopup(false);
  };
  const handleOpen = (e, id) => {
    e.stopPropagation();
    setOrderId(id);
    handlePopup(true);
  };
  const handleCancel = (e) => {
    // e.stopPropagation();
    let id = ordr_id;
    let payload = {
      method: "CANCEL",
    };
    connectWithApi()
      .cancelOrder(id, payload)
      .then((res) => {
        // console.log(res.data);
        getOrderUpdated();
        handlePopup(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };

  const handleOrder = (data) => {
    history.push({
      pathname: routes.authRoutes.orderConfirmation,
      details: data,
      redirect: "OrderDetails",
    });
  };

  const formatUnitVal = (val) => {
    val = applyAmountCommaMask(val) + "...";
    return val;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    const params = `page=${paginationObj.current}&page_count=${paginationObj.pageSize}`;
    console.log("params in order history",params)
    let obj = {
      g_status: "PENDING",
    };
    connectWithApi()
      .getOrderHistory(buildQuery(obj))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit =
              data.unit === null ? "-" : data.unit),
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
      g_status: "PASS",
    };
    connectWithApi()
      .getOrderHistory(buildQuery(obj1))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = data.unit === null ? "-" : data.unit),
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

  const getOrderUpdated = () => {
    let obj = {
      g_status: "PENDING",
    };
    connectWithApi()
      .getOrderHistory(buildQuery(obj))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = data.unit === null ? "-" : data.unit),
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
      g_status: "PASS",
    };
    connectWithApi()
      .getOrderHistory(buildQuery(obj1))
      .then((res) => {
        res.data.map(
          (data) => (
            (data.value = applyAmountCommaMask(data.value)),
            (data.unit = data.unit === null ? "-" : data.unit),
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
  };

  const pendingOrderColumn = [
    {
      title: "Name",
      key: 1,
      render: (pendingData) => (
        <React.Fragment>
          <StyledText>{pendingData.instrument.symbol + " | "}</StyledText>
          <StyledText>{pendingData.instrument.name}</StyledText>
        </React.Fragment>
      ),
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
            <TableValue
              className={
                pendingData.buy_sell === "BUY"
                  ? "green"
                  : pendingData.buy_sell === "SELL"
                  ? "red"
                  : ""
              }
            >
              {pendingData.buy_sell === "BUY"
                ? "+" + defaultValues.defaultCurrency + pendingData.value
                : "-" + defaultValues.defaultCurrency + pendingData.value}
              {/* {defaultValues.defaultCurrency + pendingData.value} */}
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
      render: (unit) => (
        <Tooltip placement="top" title={unit}>
          {countDecimals(unit) > defaultValues.ellipsisLength ? formatUnitVal(unit) : unit}
        </Tooltip>
      ),
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
          <Row gutter={15} justify={"center"}>
            <Col>
              <Button
                size="sm-2"
                // onClick={(e) => handleCancel(e, record.dw_order_id)}
                onClick={(e) => handleOpen(e, record.id)}
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
      render: (passedData) => (
        <React.Fragment>
          <StyledText>{passedData.instrument.symbol + " | "}</StyledText>
          <StyledText>{passedData.instrument.name}</StyledText>
        </React.Fragment>
      ),
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
            <TableValue
              className={
                passedData.buy_sell === "BUY"
                  ? "green"
                  : passedData.buy_sell === "SELL"
                  ? "red"
                  : ""
              }
            >
              {passedData.buy_sell === "BUY"
                ? "+" + defaultValues.defaultCurrency + passedData.value
                : "-" + defaultValues.defaultCurrency + passedData.value}
              {/* {defaultValues.defaultCurrency + passedData.value} */}
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
      render: (unit) => (
        <Tooltip placement="top" title={unit}>
          {countDecimals(unit) > defaultValues.ellipsisLength ? formatUnitVal(unit) : unit}
        </Tooltip>
      ),
    },
    {
      title: "Order Type",
      key: 4,
      render: (passedData) =>
        // <p style={{ textAlign: "left", color: "red" }}>
        // {
        passedData.buy_sell + " | " + passedData.order_type,
        // }
        // </p>
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
    let passedArr = [];
    let pendingArr = [];
    let varData = {};
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
            (data.unit = data.unit),
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

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination)
    setPaginationObj(pagination);
    // getRMList(connectWithApi, setRM, setLoader, pagination, setPaginationObj);
  };

  return (
    <OrderWrapper>
      <Row>
        <Col>
          <PageHeading>Order History</PageHeading>
        </Col>
      </Row>
      <Divider />
      <StyledForm layout="vertical">
        <StyledRow gutter={16}>
          {/* <Col><PageHeading>Filtering Option</PageHeading></Col> */}
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <SelectComponent
              placeholder="Select Order Type"
              data={typeOption}
              name="order_type"
              label="Order Type"
              onChange={handleTypeSelect}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <SelectComponent
              placeholder="Select Order Status"
              data={statusOption}
              name="order_status"
              label="Order Status"
              onChange={handleStatusSelect}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}>
            <StyledFormItem name="start_date" label="Start date">
              <Styleddatepicker
                format={dateFormat}
                onChange={handleStartDate}
                placeholder="DD/MM/YYYY"
              />
            </StyledFormItem>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}>
            <StyledFormItem name="end_date" label="End date">
              <Styleddatepicker
                format={dateFormat}
                onChange={handleEndDate}
                placeholder="DD/MM/YYYY"
              />
            </StyledFormItem>
          </Col>
          <StyledCol className={"btn-style"} xs={{ span: 24 }} lg={{ span: 4 }}>
            <Button size="sm-1" onClick={handleSearch}>
              Search
            </Button>
          </StyledCol>
        </StyledRow>
      </StyledForm>
      <Divider />
      <StyledRow className="heading">
        <Col>
          <SubHeading>Pending Orders</SubHeading>
        </Col>
      </StyledRow>
      <StyledTable
        columns={pendingOrderColumn}
        dataSource={pendingData}
        pagination={false}
        loading={tableLoading}
        onRow={(r) => ({
          onClick: () => handleOrder(r),
        })}
      />
      <StyledRow className="heading">
        <Col>
          <SubHeading>Passed Orders</SubHeading>
        </Col>
      </StyledRow>
      <StyledTable
        columns={passedOrderColumn}
        dataSource={passedData}
        pagination={false}
        loading={tableLoading}
        scroll={passedData.length > 25 ? scroll : ""}
        onRow={(r) => ({
          onClick: () => handleOrder(r),
        })}
        onChange={handleTableChange}
        pagination={paginationObj}

      />

      <Modal
        title="Message"
        visible={open_popup}
        // onOk={handleDeleteOk}
        onCancel={handleClose}
        footer={[
          <Button key="back" size="md-2" outlined={true} onClick={handleClose}>
            No
          </Button>,
          <Button key="submit" size="md-2" onClick={handleCancel}>
            Yes
          </Button>,
        ]}
      >
        <ModalText>{`Are you sure you want to cancel order`}</ModalText>
      </Modal>
    </OrderWrapper>
  );
};

export default OrderHistory;
