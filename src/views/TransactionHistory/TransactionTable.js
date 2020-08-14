import React from "react";
import { StyledTable } from "./styles";
import Loader from "../../sharedComponents/Loader";
import { Row, Col } from "antd";
import {Button} from "../../sharedComponents/button"

const TransactionTable = (props) => {
  const { historyData } = props;
  // console.log("his", historyData);
  const columns = [
    {
      title: "Date",
      render: (historyData) => historyData.tranWhen,
      filterMultiple: false,
      // width: "25%",
    },
    {
      title: "Transaction",
      // dataIndex: "transaction",
      // width: "25%",
      render: (historyData) => historyData.finTranTypeID,
      filteredValue: props.filter || null,
      onFilter: (value, record) => record.finTranTypeID.includes(value),

      // onFilter:(value, record) => {console.log(value,record.transaction)}
    },
    {
      title: "Amount",
      // dataIndex: "props.history.accountAmmount",
      render: (historyData) => historyData.accountAmount,
      filterMultiple: false,
      // width: "25%",
    },
    {
      title: "Balance",
      render: (historyData) => historyData.accountBalance,
      // width: "25%",
    },
    {
      title: "Comment",
      render: (historyData) => historyData.comment,
      // width: "25%",
    },
    {
      title: "",
      render: (text, record) =>
          <Row gutter={15} justify={"center"}>
            <Col>
              <Button
                size="sm-2"
                // onClick={(e) => handleCancel(e, record.dw_order_id)}
                // onClick={(e) => handleOpen(e, record.id)}
              >
                Details
              </Button>
            </Col>
          </Row>
    },
  ];

  const tableLoading = {
    spinning: props.loader,
    indicator: <Loader size="large" />,
  };

  return (
    <StyledTable
      columns={columns}
      dataSource={historyData}
      loading={tableLoading}
    />
  );
};

export default TransactionTable;
