import React, { useEffect } from "react";
import { Row, Col } from "antd";

import Loader from "../../../../sharedComponents/Loader";
import { Input } from "../../../../sharedComponents/Input";

import SelectComponent from "../../sharedComponents/selectComponent";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";

const AddressInformation = ({
  countries,
  addressChangedHandler,
  isCountryActive,
  userProfileData,
  form,
  initialValues,
  pincodeChangedHandler,
  pincode,
  autoPopulateStateCity,
  fetching,
}) => {
  useEffect(() => {
    if (userProfileData) {
      form.setFieldsValue({
        address1: userProfileData.address1,
        address2: userProfileData.address2,
        country:
          userProfileData.country !== undefined
            ? userProfileData.country.name
            : initialValues["country"],
        postal_code: userProfileData.postal_code.code,
        city: userProfileData.city.name_std,
        state: userProfileData.state.name_std,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <SelectComponent
            name="country"
            label="Country"
            placeholder="Select an option"
            list={countries}
            rules={[
              {
                required: true,
                message: "Please select country",
              },
            ]}
            isCountry={true}
            changedHandler={addressChangedHandler}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}></StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem
            label="Address 1"
            name="address1"
            rules={[
              {
                required: true,
                message: "Please enter your address",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter your address" />
          </StyledFormItem>
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <StyledFormItem label="Address 2" name="address2">
            <Input placeholder="Enter your address" />
          </StyledFormItem>
        </StyledRightCol>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <SelectComponent
            name="postal_code"
            label="Postal Code"
            placeholder="Select an option"
            list={pincode}
            rules={[
              {
                required: true,
                message: "Please select postal code",
              },
            ]}
            isPincode={true}
            onSearch={pincodeChangedHandler}
            onSelect={autoPopulateStateCity}
            notFoundContent={fetching ? <Loader /> : "No data"}
          />
        </Col>
        <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <StyledFormItem label="City" name="city">
                <Input placeholder="City" disabled={true} />
              </StyledFormItem>
            </Col>
            <StyledRightCol xs={{ span: 24 }} lg={{ span: 11 }}>
              <StyledFormItem label="State" name="state">
                <Input placeholder="State" disabled={true} />
              </StyledFormItem>
            </StyledRightCol>
          </Row>
        </StyledRightCol>
      </Row>
    </React.Fragment>
  );
};

export default AddressInformation;
