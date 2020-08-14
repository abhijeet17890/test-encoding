import React from "react";
import { StyledTable } from "./styles";

const columns = [
  {
    title: "Name",
    dataIndex: "date",
    filterMultiple: false,
    width: "20%",
  },
  {
    title: "Value",
    dataIndex: "reference",
    width: "15%",
  },
  {
    title: "Units",
    dataIndex: "transaction",
    width: "15%",
  },
  {
    title: "Order Type",
    dataIndex: "amount",
    filterMultiple: false,
    width: "10%",
  },
  {
    title: "Order Date",
    dataIndex: "amount",
    filterMultiple: false,
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "transaction",
    width: "15%",
  },
  {
    title: "",
    dataIndex: "buttons",
    width: "10%",
  },
];

const data = [
  {
    key: "1",
    date: "02/03/2020",
    reference: "8342HGA67220",
    transaction: "Withdrawal",
    amount: "$15,000.00",
  },
  {
    key: "2",
    date: "02/03/2020",
    reference: "8342HGA67220",
    transaction: "Withdrawal",
    amount: "$15,000.00",
  },
  {
    key: "3",
    date: "02/03/2020",
    reference: "8342HGA67220",
    transaction: "Withdrawal",
    amount: "$15,000.00",
  },
  {
    key: "4",
    date: "02/03/2020",
    reference: "8342HGA67220",
    transaction: "Withdrawal",
    amount: "$15,000.00",
  },
  {
    key: "5",
    date: "02/03/2020",
    reference: "8342HGA67220",
    transaction: "Withdrawal",
    amount: "$15,000.00",
  },
];

const OrderHistoryTable = (props) => {
  return (
    <StyledTable
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={props.pagination}
      loading={props.loading}
      scroll={props.scroll}
      onRow={props.onRow}
    />
  );
};

export default OrderHistoryTable;
