import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Loader from "../../sharedComponents/Loader";
import { Modal } from "../../sharedComponents/Modal";
import { Button } from "../../sharedComponents/button";

import { routes } from "../../constants/routes";

import { StockTable, StyledLink,StyledText } from "./Style";
import { Message } from "../kyc/sharedComponents/style";
function onChange(pagination, filters, sorter, extra) {
  // console.log("params", pagination, filters, sorter, extra);
}

const InformationTable = (props) => {
  const { client_list, loader } = props;
  const history = useHistory();

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [clientName, setClientName] = useState("");

  const handleClick = (client) => {
    if (
      client.client_code.kyc_submitted &&
      client.client_code.kyc_status.toUpperCase() === "PENDING"
    ) {
      setClientName(
        client.client_details.first_name + " " + client.client_details.last_name
      );
      setInfoModalVisible(true);
    } else {
      history.push({
        pathname: routes.authRoutes.clientDetails + "/" + client.id,
        state: { client },
      });
    }
  };

  const infoModalHandleOK = () => setInfoModalVisible(false);

  const columns = [
    {
      title: "Client",
      key: 1,
      render: (client_list) => (
        <StyledLink type="link" onClick={() => handleClick(client_list)}>
          {client_list.client_details.first_name +
            " " +
            client_list.client_details.last_name}
        </StyledLink>
      ),
      filterMultiple: false,
      // width: "25%",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.client.length - b.client.length,
      sorter: (a, b) =>
        a.client_details.first_name.localeCompare(b.client_details.first_name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      key: 2,
      render: (client_list) => client_list.email,
      // width: "15%",
    },
    {
      title: "Phone No.",
      key: 3,
      render: (client_list) => client_list.client_details.phone_number,
      // width: "15%",
    },
    {
      title: "RM Code & Name",
      key: 4,
      render: (client_list) =>
        client_list.relationship_managers.length > 0 ? (
          <>
            <StyledText>
              {
                client_list.relationship_managers[0].relationship_manager
                  .rm_code
              }
            </StyledText>
            <StyledText>
              {
                client_list.relationship_managers[0].relationship_manager
                  .relationship_manager_detail.first_name
              }
            </StyledText>
          </>
        ) : (
          ""
        ),
      width: "13%",
      sortDirections: ["descend", "ascend"],
      // sorter: (a, b) => a.sell - b.sell,
      // sorter: (a, b) =>{console.log("a",a.relationship_managers[0].relationship_manager.rm_code)},
      sorter: (a, b) =>
        // console.log(a.relationship_managers)
        a.relationship_managers.length > 0 && b.relationship_managers.length > 0
          ? a.relationship_managers[0].relationship_manager.relationship_manager_detail.first_name.localeCompare(
              b.relationship_managers[0].relationship_manager
                .relationship_manager_detail.first_name
            )
          : // console.log('...',a.relationship_managers[0].relationship_manager.relationship_manager_detail.first_name)
            "",
    },
    {
      title: "Client Code",
      key: 5,
      render: (client_list) => client_list.client_code.client_code,
      // width: "10%",
    },
    // {
    //   title: "Groups",
    //   dataIndex: "group",
    //   width: "20%",
    // },
  ];

  const tableLoading = {
    spinning: loader,
    indicator: <Loader size="large" />,
  };
  return (
    <React.Fragment>
      <StockTable
        columns={columns}
        dataSource={client_list}
        onChange={onChange}
        loading={tableLoading}
        // rowSelection={true}
      />
      <Modal
        title="Message"
        visible={infoModalVisible}
        onCancel={infoModalHandleOK}
        centered={true}
        footer={[
          <Button key="back" size="md-2" onClick={() => infoModalHandleOK()}>
            OK
          </Button>,
        ]}
      >
        <Message>The KYC of {clientName} is in progress</Message>
      </Modal>
    </React.Fragment>
  );
};

export default InformationTable;
