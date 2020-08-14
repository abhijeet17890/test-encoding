import React, { useState, useEffect } from "react";
import { Col, Tooltip, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { StyledDivider, StyledButton, StyledGapDivider } from "./Style";
import { Checkbox } from "../../sharedComponents/Checkbox";
import "antd/dist/antd.css";
import SearchBar from "./SearchBar";
import { useInsideAuthApi } from "../../contextProviders/apiProvider";
import { defaultValues } from "../../constants/defaultValues";
import { buildQuery } from "../../utils/dataManipulation";
import { routes } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { Button } from "../../sharedComponents/button";

const SearchContainer = (props) => {
  const history = useHistory();
  const [size, setSize] = useState("large");
  const [searchClient, setClient] = useState("");
  const [searchRM, setRM] = useState("");
  const [client_vale, setClientVal] = useState("");
  const [rm_vale, setRMVal] = useState("");
  const { connectWithApi } = useInsideAuthApi();
  const [loader, setLoader] = useState(true);
  let [counter, setCounter] = useState(0);
  const [rm_id, setRMId] = useState("");

  // const onType = (data, name) => {
  //   if (data.length >= 2) {
  //     if (name === "client") {
  //       setClientVal(data);
  //     } else if (name === "rm") {
  //       setRMVal(data);
  //     }
  //     getSearchData(
  //       connectWithApi,
  //       setLoader,
  //       client_vale,
  //       (client_vale, string) => {
  //         // setSearchData(client_vale);
  //         setClient(client_vale);
  //         // setSearchString(string);
  //       },
  //       rm_vale,
  //       (rm_vale, string) => {
  //         // setSearchData(client_vale);
  //         setRM(rm_vale);
  //         // setSearchString(string);
  //       }
  //     );
  //   } else {
  //     setRM("");
  //     setClient("");
  //     setRMVal("");
  //     // setClientVal("");
  //     // props.getAllClientList();
  //   }
  // };

  const onType = (data, name) => {
    if (name === "client") {
      if (data.length >= 2) {
        setClientVal(data);
        getClientSearchData(
          connectWithApi,
          setLoader,
          data,
          (client_vale, string) => {
            // setSearchData(client_vale);
            setClient(client_vale);
            // setSearchString(string);
          }
        );
      } else {
        setClientVal("");
        setClient("");
      }
    }
    if (name === "rm") {
      if (data.length >= 2) {
        setRMVal(data);
        setRMId("");
        getRMSearchData(
          connectWithApi,
          setLoader,
          rm_vale,
          (rm_vale, string) => {
            // setSearchData(client_vale);
            setRM(rm_vale);
            // setSearchString(string);
          }
        );
      } else {
        setRM("");
        setRMVal("");
        setRMId("");
      }
    }
  };

  const getClientSearchData = (
    connectWithApi,
    setLoader,
    client_vale,
    callback
  ) => {
    let varData = {};
    if (client_vale !== "") {
      varData = { ...varData, client_info: client_vale };
    }
    connectWithApi()
      .ClientSearch(buildQuery(varData))
      .then((res) => {
        callback(res.data, client_vale);
        // callback1(res.data, rm);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // Notification({ type: "error", content: error.message });
      });
  };

  const getRMSearchData = (connectWithApi, setLoader, rm, callback) => {
    // setLoader(true);
    let varData = {};
    if (rm_vale !== "") {
      varData = { ...varData, rm_info: rm };
    }
    connectWithApi()
      .getRMList()
      .then((res) => {
        callback(res.data, rm);
        // callback1(res.data, rm);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // Notification({ type: "error", content: error.message });
      });
  };

  const getSearchData = (
    connectWithApi,
    setLoader,
    client_vale,
    callback,
    rm,
    callback1
  ) => {
    let varData = {};
    if (client_vale !== "") {
      varData = { ...varData, client_info: client_vale };
    }
    if (rm !== "") {
      varData = { ...varData, rm_info: rm };
    }
    setLoader(true);
    connectWithApi()
      .ClientSearch(buildQuery(varData))
      .then((res) => {
        callback(res.data, client_vale);
        // callback1(res.data, rm);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // Notification({ type: "error", content: error.message });
      });
    connectWithApi()
      .getRMList()
      .then((res) => {
        callback1(res.data, rm);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleSearch = () => {
    let varData = {
      // client_info: client_vale,
      // rm_info: rm_vale,
    };
    if (client_vale !== "") {
      varData = { ...varData, client_info: client_vale };
    }
    if (rm_vale !== "") {
      varData = { ...varData, rm_info: rm_vale };
    }
    if (rm_id !== "") {
      varData = { ...varData, rm_info: "", rm_id: rm_id };
    }
    props.setLoader(true);
    connectWithApi()
      .ClientSearch(buildQuery(varData))
      .then((res) => {
        props.handleSearchResult(res.data);
        props.setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // Notification({ type: "error", content: error.message });
      });
  };

  const handleState = (val, name) => {
    if (name.name === "client") {
      setClientVal(val);
    } else if (name.name === "rm") {
      if (rm_vale !== "") {
        setRMId(name.id);
      } else {
        setRMId("");
        setRM("");
      }
    }
  };

  return (
    <div>
      <StyledGapDivider />

      <Row type="flex" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <SearchBar
            ontype={(e) => onType(e, "client")}
            data={searchClient}
            name="client"
            placeholder="Search by client"
            // value={client_vale}
            handleState={handleState}
          />
        </Col>
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <SearchBar
            ontype={(e) => onType(e, "rm")}
            data={searchRM}
            name="rm"
            placeholder="Search by RM"
            handleState={handleState}
          />
        </Col>
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          {/* <SearchBar ontype={onType} data={SearchData} placeholder='Search by group'/> */}
        </Col>
        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
          <Tooltip title="search">
            <Button
              type="primary"
              size="sm-1"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <StyledDivider orientation="left"></StyledDivider>
      <Row type="flex" gutter={[8, 16]}>
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <Checkbox>Select all</Checkbox>
        </Col>
        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
          {" "}
        </Col>
        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
          <StyledButton type="primary" disabled customcornertype="round-corner">
            Assign to RM
          </StyledButton>
        </Col>
        {/* <Col xs={24} sm={24} md={3} lg={3} xl={3}>
          <StyledButton type="primary" disabled customcornertype="round-corner">
            Allocate to group
          </StyledButton>
        </Col> */}
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <StyledButton type="primary" disabled customcornertype="round-corner">
            Allocate Client Code
          </StyledButton>
        </Col>
      </Row>
    </div>
  );
};

export default SearchContainer;
