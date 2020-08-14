import React, { useState, useEffect } from "react";
import { ProductDeatilWrapper } from "./style";
import HeaderSection from "./HeaderSection";
import ProductDetailsNavigation from "./NavigarionSection";
import { PageHeading } from "../../sharedComponents/Heading";
import { Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../sharedComponents/Notification";
import Loader from "../../sharedComponents/Loader";

const ProductDetail = () => {
  const location = useLocation();

  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [header_details, setHeaderDetails] = useState({});
  const [other_details, setOtherDetails] = useState({});
  const [summaryValue, setSummaryValue] = useState({});
  const [changeData, setChangeData] = useState({});
  const [loader, setLoader] = useState(true);
  const [customer_info, setCustomerInfo] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    const arr = location.pathname.split("/");
    const id = arr[2];
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    connectWithApi()
      .getProductDetails(id)
      .then((res) => {
        setCustomerInfo(res.data.customer_info)
        setHeaderDetails(res.data.instrument_15min_delayed_info[0]);
        setOtherDetails(res.data.instrument_fundamental_info);
        setSummaryValue(
          res.data.instrument_fundamental_info.fundamentalDataModel
        );
        setChangeData(res.data.instrument_fundamental_info);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        // console.log(error);
      });
  }, []);

  return (
    <ProductDeatilWrapper>
      {!loader ? (
        <>
          <Row>
            <Col>
              <PageHeading>{changeData.type==="EQUITY"?"Stock Search":"ETFs Search" }</PageHeading>
            </Col>
          </Row>
          <Row>
            <Col>
              <HeaderSection
                header_data={header_details}
                other_data={other_details}
                summaryValue={summaryValue}
                changeData={changeData}
                customer_info={customer_info}
              />
            </Col>
          </Row>

          <ProductDetailsNavigation
            header_data={header_details}
            other_data={other_details}
            summaryValue={summaryValue}
          />
        </>
      ) : (
        <Loader size="large" spinner={loader} />
      )}
    </ProductDeatilWrapper>
  );
};

export default ProductDetail;
