import React, { useState, useEffect } from "react";
import { StyledTable, RMContent, ButtonRow } from "./style";
import { useHistory } from "react-router-dom";
import SearchBar from "../SharedComponent/SearchBar";
import { Row, Col } from "antd";
import { routes } from "../../../constants/routes";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import { defaultValues } from "../../../constants/defaultValues";
import Loader from "../../../sharedComponents/Loader";
import { PageHeading } from "../../../sharedComponents/Heading";
import Divider from "../../../sharedComponents/Divider";
import { Button } from "../../../sharedComponents/button";
import { RMWrapper } from "../style";

const getRMList = (
  connectWithApi,
  setRM,
  setLoader,
  pagination,
  setPaginationObj
) => {
  const params = `page=${pagination.current}&page_count=${pagination.pageSize}`;
  connectWithApi()
    .getRMList(params)
    .then((res) => {
      setRM(res.data);
      const updatedPagination = { ...pagination, total: res.pagination_data.total_count };
      setPaginationObj(updatedPagination);
      setLoader(false);
    })
    .catch((error) => {
      Notification({ type: "error", content: error.message });
    });
};

const ListRM = () => {
  const history = useHistory();
  const [rm_list, setRM] = useState([]);
  const { connectWithApi } = useInsideAuthApi();
  const [loader, setLoader] = useState(true);

  const paginationParams = {
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
  };
  const [paginationObj, setPaginationObj] = useState(paginationParams);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    getRMList(
      connectWithApi,
      setRM,
      setLoader,
      paginationObj,
      setPaginationObj
    );
  }, []);

  const columns = [
    {
      title: "Name",
      key: 1,
      render: (rm_list) => rm_list.personal_details.first_name,
      fixed: "left",
      sorter: (a, b) =>
        a.personal_details.first_name.localeCompare(
          b.personal_details.first_name
        ),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Employee Code",
      key: 2,
      dataIndex: "employee_code",
    },
    {
      title: "Globalise RM Code",
      key: 3,
      dataIndex: "rm_code",
    },
    {
      title: "Email",
      key: 4,
      render: (rm_list) => rm_list.user.email,
    },
    {
      title: "Status",
      key: 5,
      dataIndex: "status",
      // sorter: {
      //   compare: (a, b) => a.status - b.status,
      //   multiple: 1,
      // },
    },
    {
      title: "",
      key: "x",
      render: (text, record) => (
        <ButtonRow gutter={15} justify={"end"}>
          <Col>
            <Button
              size="sm-2"
              outlined={true}
              onClick={() => handleClick(record.id)}
            >
              View
            </Button>
          </Col>
          <Col>
            <Button size="sm-2">View Clients</Button>
          </Col>
        </ButtonRow>
      ),
    },
  ];

  const handleClick = (id) => {
    history.push({
      pathname: routes.authRoutes.viewRM,
      state: id,
    });
  };

  const handleAdd = () => {
    history.push(routes.authRoutes.addRM);
  };

  const onType = (data) => {
    let arr = [];
    if (data.length >= defaultValues.searchAfterChar) {
      rm_list.map((e) =>
        e.personal_details.first_name
          .toLowerCase()
          .startsWith(data.toLowerCase())
          ? arr.push(e)
          : null
      );
      setSearchData(arr);
    } else {
      setSearchData("");
    }
  };
  const [SearchData, setSearchData] = useState("");

  const tableLoading = {
    spinning: loader,
    indicator: <Loader size="large" />,
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPaginationObj(pagination);
    getRMList(connectWithApi, setRM, setLoader, pagination, setPaginationObj);
  };

  return (
    <RMWrapper>
      <Row>
        <Col>
          <PageHeading>Relationship Managers</PageHeading>
        </Col>
      </Row>
      <Divider />
      <RMContent>
        <Row gutter={15}>
          <Col lg={{ span: 21 }} sm={{ span: 18 }} xs={{ span: 14 }}>
            <SearchBar ontype={onType} data={SearchData} />
          </Col>
          <Col
            lg={{ span: 1, offset: 0 }}
            sm={{ span: 2, offset: 1 }}
            xs={{ span: 2, offset: 0 }}
          >
            <Button size="sm-1" onClick={handleAdd}>
              Add New RM
            </Button>
          </Col>
        </Row>
      </RMContent>
      <StyledTable
        columns={columns}
        dataSource={rm_list}
        pagination={paginationObj}
        loading={tableLoading}
        rowKey={rm_list.id}
        onChange={handleTableChange}
      />
    </RMWrapper>
  );
};

export default ListRM;
