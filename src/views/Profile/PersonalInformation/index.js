import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";

import { useInsideAuthApi } from "../../../contextProviders/apiProvider";
import { routes } from "../../../constants/routes";

import Divider from "../../../sharedComponents/Divider";
import Loader from "../../../sharedComponents/Loader";
import { PageHeading, SubHeading } from "../../../sharedComponents/Heading";

import * as S from "./styles.js";

function PersonalInformation() {
  const { connectWithApi } = useInsideAuthApi();
  const history = useHistory();

  const [pageLoading, setPageLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [citizenship, setCitizenship] = useState();
  const [taxNumber, setTaxNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [advisorInfo, setAdvisorInfo] = useState([]);
  const [dataSharing, setDataSharing] = useState();

  useEffect(() => {
    connectWithApi()
      .getUserDetails()
      .then((res) => {
        setPageLoading(false);
        setFullName(
          res.personal_details.first_name + " " + res.personal_details.last_name
        );
        setDob(res.personal_details.dob);
        setGender(res.personal_details.gender);
        setMaritalStatus(res.personal_details.marital_status);
        setPhoneNumber(res.personal_details.phone_number);
        setCitizenship(res.personal_details.citizenship);
        setCountry(res.address_details.country);
        setTaxNumber(res.personal_details.tax_id_number);
        setAdvisorInfo(res.advisor_information);
        setAddress(
          res.address_details.address_one +
            " " +
            (res.address_details.address_two
              ? res.address_details.address_two
              : "")
        );
        setCity(res.address_details.city);
        setPostalCode(res.address_details.postal_code);
        setProvince(res.address_details.state);
        setDataSharing(res.is_dw_data_sharing_accepted);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message });
      });
  }, []);

  const clickedEventHandler = () => {
    history.push({
      pathname: routes.authRoutes.kycDisclosures,
      state: {
        lastPath: routes.authRoutes.personalInformation,
        dataSharing: dataSharing,
      },
    });
  };

  return (
    <React.Fragment>
      {pageLoading ? (
        <Row justify="center">
          <Col>
            <Loader />
          </Col>
        </Row>
      ) : (
        <div>
          <Row justify="center" gutter={[0, 20]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 0 }}>
              <PageHeading>Personal Information</PageHeading>
              <Divider />
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 10]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails>Full Name: {fullName}</S.StyledDetails>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 10]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>Date of Birth: {dob}</S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>Gender: {gender}</S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 6, offset: 1 }}>
              <S.StyledDetails>
                Marital Status: 
                {maritalStatus ? maritalStatus.toLowerCase() : ""}
              </S.StyledDetails>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 28]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>Citizenship: {citizenship}</S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>
                PAN No.: {taxNumber ? taxNumber.toUpperCase() : ""}
              </S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 6, offset: 1 }}>
              <S.StyledDetails>Phone Number: {phoneNumber}</S.StyledDetails>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <SubHeading>Address Information</SubHeading>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 20]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 0 }}>
              <Divider />
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 10]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails>Address : {address}</S.StyledDetails>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 10]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>City: {city}</S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 4, offset: 1 }}>
              <S.StyledDetails>Province: {province}</S.StyledDetails>
            </Col>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 6, offset: 1 }}>
              <S.StyledDetails>Postal Code: {postalCode}</S.StyledDetails>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 28]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails>Country : {country}</S.StyledDetails>
            </Col>
          </Row>

          <Row justify="center" gutter={[0, 0]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <SubHeading>Advisor Information</SubHeading>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 20]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 0 }}>
              <Divider />
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 10]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails>
                Advisor:
                {advisorInfo.map((advisors) => (
                  <span>
                    {advisors.advisor.advisor_code}
                    {" -  " + advisors.advisor.advisor_detail.first_name + " "}
                    {(advisors.advisor.advisor_detail.last_name
                      ? advisors.advisor.advisor_detail.last_name
                      : " ") + ","}
                  </span>
                ))}
              </S.StyledDetails>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 28]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails>
                Relationship Manager :
                {advisorInfo.map((advisors) => (
                  <span>
                    {advisors.relationship_manager.rm_code}
                    {" - " +
                      advisors.relationship_manager.relationship_manager_detail
                        .first_name +
                      " "}
                    {advisors.relationship_manager.relationship_manager_detail
                      .last_name
                      ? advisors.relationship_manager
                          .relationship_manager_detail.last_name
                      : ""}
                  </span>
                ))}
              </S.StyledDetails>
            </Col>
          </Row>

          <Row justify="center" gutter={[0, 0]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <SubHeading>DriveWealth Disclosure</SubHeading>
            </Col>
          </Row>
          <Row justify="center" gutter={[0, 20]}>
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 0 }}>
              <Divider />
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 23, offset: 0 }} lg={{ span: 16, offset: 1 }}>
              <S.StyledDetails
                className="disclosure-link"
                onClick={clickedEventHandler}
              >
                <u>View Disclosures</u>
              </S.StyledDetails>
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
}
export default PersonalInformation;
