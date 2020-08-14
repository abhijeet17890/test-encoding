import React, { useState, useEffect } from "react";
import { Stock, GlobalCss } from "./Style";
import "antd/dist/antd.css";
import InformationTable from "./InformationTable";
import PageTitle from "./PageTitle";
import SearchContainer from "./SearchContainer";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../sharedComponents/Notification";
import { capitaliseFirstChar } from "../../utils/dataManipulation";

function ClientList(props) {
  const [client_list, setClientList] = useState([]);
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    getAllClientList(connectWithApi, setLoader);
  }, []);

  const getAllClientList = () => {
    connectWithApi()
      .getClientList()
      .then((res) => {
        setClientList(res.data);
        res.data.map(e => (
          (e.client_details.first_name = capitaliseFirstChar(e.client_details.first_name)),
          (e.client_details.last_name = capitaliseFirstChar(e.client_details.last_name))
        ))
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };

  const handleSearchResult = (data) => {
    setClientList(data);
  };

  return (
    <>
      <Stock>
        {/*header and switch part starts here */}
        <PageTitle />
        <SearchContainer
          client_list={client_list}
          handleSearchResult={handleSearchResult}
          getAllClientList={getAllClientList}
          setLoader={setLoader}
          
        />
        {/*header and switch part ends here */}

        <InformationTable client_list={client_list} loader={loader} />
      </Stock>
    </>
  );
}

export default ClientList;
