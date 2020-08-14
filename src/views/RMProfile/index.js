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
import { capitaliseFirstChar } from "../../utils/dataManipulation";

import { useAuth } from "../../contextProviders/authProvider";

const RMProfile = () => {
  const [email, setEmail] = useState("Email");
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [loader, setLoader] = useState(true);
  const [personal_details, setPersonalDetails] = useState("");
  const [rm_details, setRMDetails] = useState("");
  const { loggedInUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    connectWithApi()
      .getRMProfile()
      .then((res) => {
        setEmail(res.email);
        setPersonalDetails(res.personal_details);
        setRMDetails(res.relationship_manager_details);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
  }, []);

  return (
    <>
      {!loader ? (
        <ProfileWrapper>
          <Row>
            <Col>
              <PageHeading>RM Profile</PageHeading>
            </Col>
          </Row>
          <Divider />
          <ProfileContainer>
            {/* <Row>
              <Col span={24}>
                <AdvisorCodeHeading>
                  RM Code - {ga_code}
                </AdvisorCodeHeading>
              </Col>
            </Row> */}
            <Row>
              <ColHeading span={24}>
                <SubHeading>My Details</SubHeading>
              </ColHeading>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Full Name :
                {" " + capitaliseFirstChar(personal_details.first_name)}{" "}
                {personal_details.last_name !== null
                  ? capitaliseFirstChar(personal_details.last_name)
                  : ""}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Employee Code :
                {rm_details.employee_code !== null
                  ? " " + rm_details.employee_code
                  : "-"}
              </ColContent>
            </Row>

            <Row>
              <ColHeading className="first-heading" span={24}>
                <SubHeading>Address Information</SubHeading>
                <Divider></Divider>
              </ColHeading>
              <ColContent lg={{ span: 24 }} sm={{ span: 24 }}>
                Address :
                {rm_details.address !== null
                  ? " " + capitaliseFirstChar(rm_details.address)
                  : "-"}
              </ColContent>
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Mobile :{" " + personal_details.phone_number}
              </ColContent>
              {/* {office_ph !== "" ? ( */}
              <ColContent lg={{ span: 8 }} sm={{ span: 24 }}>
                Office :
                {personal_details.office_phone !== null
                  ? " " + personal_details.office_phone
                  : " -"}
              </ColContent>
              {/* ) : null} */}
              <ColContent span={24}>Email Id :{" " + email}</ColContent>
            </Row>
          </ProfileContainer>
        </ProfileWrapper>
      ) : (
        <Loader size="large" spinner={loader} />
      )}
    </>
  );
};

export default RMProfile;
