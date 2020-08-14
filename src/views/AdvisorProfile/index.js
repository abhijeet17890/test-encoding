import React, { useState, useEffect } from "react";
import {
  ProfileWrapper,
  ProfileContainer,
  ColHeading,
  ColContent,
  AdvisorCodeHeading,
} from "./style";
import { Row, Col } from "antd";
import { PageHeading, SubHeading } from "../../sharedComponents/Heading";
import Divider from "../../sharedComponents/Divider";
import Loader from "../../sharedComponents/Loader";
import { useInsideAuthApi } from "../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../sharedComponents/Notification";
import {changePascalCase} from "../../utils/dataManipulation"
const AdvisorProfile = () => {
  const [prersonal_details, setPersonalDetails] = useState({});
  const [address_details, setAddressDetails] = useState({});
  const [bank_details, setBankDetails] = useState({});
  const [bussiness_details, setBusinessDetails] = useState({});
  const [advisor_type, setAdvisorType] = useState("");
  const [email, setEmail] = useState("");
  const [ga_code, setGaCode] = useState("");
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    connectWithApi()
      .getAdvisorProfile()
      .then((res) => {
        setAddressDetails(
          res.address_details !== null ? res.address_details : ""
        );
        setBankDetails(res.bank_details !== null ? res.bank_details : "");
        setBusinessDetails(
          res.bussiness_details !== null ? res.bussiness_details : ""
        );
        setPersonalDetails(
          res.personal_details !== null ? res.personal_details : ""
        );
        setEmail(res.email);
        setAdvisorType(res.advisor_type);
        setGaCode(res.advisor_code);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }, []);

  return (
    <>
      {!loader ? (
        <ProfileWrapper>
          <Row>
            <Col>
              <PageHeading>Profile</PageHeading>
            </Col>
          </Row>
          <Divider />
          <ProfileContainer>
            <Row>
              <Col span={24}>
                <AdvisorCodeHeading>
                  Globalise Advisor Code - {ga_code}
                </AdvisorCodeHeading>
              </Col>
            </Row>
            <Row>
              <ColHeading span={24}>
                <SubHeading>My Details</SubHeading>
              </ColHeading>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Full Name :{" " + changePascalCase(prersonal_details.first_name)}{" "}
                {prersonal_details.last_name !== null
                  ? changePascalCase(prersonal_details.last_name)
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Type of Advisor :{" " + advisor_type}
              </ColContent>
            </Row>

            <Row>
              <ColHeading className="first-heading" span={24}>
                <SubHeading>Address Information</SubHeading>
                <Divider></Divider>
              </ColHeading>
              <ColContent lg={{ span: 24 }} sm={{ span: 24 }}>
                Address :{" " + address_details.address_one}{" "}
                {address_details.address_two !== null
                  ? address_details.address_two
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                City :{" " + address_details.city}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                State :{" " + address_details.state}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Postal Code :{" " + address_details.postal_code}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Country :{" " + address_details.country}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Mobile :{" " + prersonal_details.phone_number}
              </ColContent>
              {prersonal_details.office_phone !== null ? (
                <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                  Office :
                  {prersonal_details.office_phone !== null
                    ? " " + prersonal_details.office_phone
                    : ""}
                </ColContent>
              ) : null}
              <ColContent span={24}>Email Id :{" " + email}</ColContent>
            </Row>

            <Row>
              <ColHeading className="second-heading" span={24}>
                <SubHeading>Business Details</SubHeading>
                <Divider></Divider>
              </ColHeading>
              <ColContent span={24}>
                Date of Incorporation :
                {" " + bussiness_details.date_of_incorporation}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                PAN Number :{" " + bussiness_details.pan_number.toUpperCase()}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Aadhar Number :{" " + bussiness_details.aadhar_number}
              </ColContent>
              <ColContent span={24}>
                GST Registration Number :{" " + bussiness_details.gst_number}
              </ColContent>
              <ColContent span={24}>
                {bussiness_details.sebi_registered_investment_advisor === true
                  ? `SEBI Registration Number :${
                      " " + bussiness_details.certification_registration_number.toUpperCase()
                    }`
                  : `AMFI Registered Distributor : ${
                      " " + bussiness_details.certification_registration_number.toUpperCase()
                    }`}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Date of Registration :
                {" " + bussiness_details.date_of_registration}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Date of Expiry :{" " + bussiness_details.date_of_expiry}
              </ColContent>
            </Row>

            <Row>
              <ColHeading className="third-heading" span={24}>
                <SubHeading>Bank Details</SubHeading>
                <Divider></Divider>
              </ColHeading>
              <ColContent span={24}>
                Account Holder Name :
                {bank_details.account_holder_name !== null
                  ? " " +changePascalCase(bank_details.account_holder_name)
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Bank Name :
                {bank_details.bank_name !== null
                  ? " " + bank_details.bank_name
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Account Number :
                {bank_details.account_number !== null
                  ? " " + bank_details.account_number
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                {" "}
                IFSC Code :
                {bank_details.ifsc_code !== null
                  ? " " + bank_details.ifsc_code
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Mobile :
                {prersonal_details.phone_number !== null
                  ? " " + prersonal_details.phone_number
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Email Id :{email !== null ? " " + email : ""}
              </ColContent>
            </Row>
          </ProfileContainer>
        </ProfileWrapper>
      ) : (
        <Loader size="large" spinner={loader} />
      )}
    </>
  );
};

export default AdvisorProfile;
