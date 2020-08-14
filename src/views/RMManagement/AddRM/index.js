import React, { useState } from "react";
import { RMContent, RMButtons } from "./style";
import { Row, Col } from "antd";
import { Form } from "antd";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants/routes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import Divider from "../../../sharedComponents/Divider";
import { PageHeading } from "../../../sharedComponents/Heading";
import { Input } from "../../../sharedComponents/Input";
import { Button } from "../../../sharedComponents/button";
import { Modal } from "../../../sharedComponents/Modal";
import { RMWrapper, ModalText, LabelComponent } from "../style";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddRM = () => {
  let history = useHistory();
  const [success_popup, handleSuccessPopup] = useState(false);
  const [user_info, setUserInfo] = useState({
    name: "",
    employee_code: "",
    email: "",
    mobile_no: "",
    office_phone: "",
    address: "",
  });
  const [countryCode, setCountryCode] = useState("in");
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [btn_loading, setBtnLoading] = useState(false);

  const onFinish = (user_info) => {
    setBtnLoading(true)
    let data = {
      user: {
        email: user_info.email,
        personal_details: {
          phone_number:
            "+" + user_info.mobile_no.replace(/\s/g, "").replace("-", ""),
          first_name: user_info.name,
          office_phone:
            user_info.office_phone !== undefined
              ? "+" + user_info.office_phone.replace(/\s/g, "").replace("-", "")
              : undefined,
        },
      },
      employee_code: user_info.employee_code,
      address: user_info.address,
    };
    connectWithApi()
      .addRM(data)
      .then((res) => {
        handleSuccessPopup(true);
        setBtnLoading(false)
        // setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };
  const handleOK = () => {
    handleSuccessPopup(false);
    history.push(routes.authRoutes.listRM);
  };

  const handleCancleRM = () => {
    history.push(routes.authRoutes.listRM);
  };

  const inputChange = (e) => {
    setUserInfo({ ...user_info, [e.target.name]: e.target.value });
  };

  const inputChangedHandler = (phoneNum, country, e, formattedValue) => {
    setUserInfo({ ...user_info, mobile_no: formattedValue });
  };
  const officePhoneChange = (phoneNum, country, e, formattedValue) => {
    setUserInfo({ ...user_info, office_phone: formattedValue });
  };

  return (
    <RMWrapper>
      <Row>
        <Col>
          <PageHeading>Add New Relationship Manager</PageHeading>
        </Col>
      </Row>
      <Divider />
      <Form
        layout="vertical"
        // {...layout}
        name="basic"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <RMContent>
          <Row gutter={15}>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    pattern: /^[a-zA-Z\s]*$/,
                  },
                ]}
              >
                <Input
                  name="name"
                  onChange={inputChange}
                  value={user_info.name}
                  placeholder="Enter the name"
                />
              </LabelComponent>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent label="Employee Code" name="employee_code">
                <Input
                  name="employee_code"
                  onChange={inputChange}
                  value={user_info.employee_code}
                  placeholder="Enter the employee code"
                />
              </LabelComponent>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/,
                  },
                ]}
              >
                <Input
                  name="email"
                  onChange={inputChange}
                  value={user_info.email}
                  placeholder="Enter the email"
                />
              </LabelComponent>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent
                label="Mobile Number"
                name="mobile_no"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <PhoneInput
                  className="phone-input"
                  country={countryCode}
                  name="mobile_no"
                  placeholder="Enter the phone number"
                  value={user_info.mobile_no}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                  inputProps={{
                    name: "mobile_no",
                  }}
                  containerClass="phone-input"
                  // isValid={isValidNumber}
                  onChange={inputChangedHandler}
                />
              </LabelComponent>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent label="Office Number" name="office_phone">
                <PhoneInput
                  className="phone-input"
                  country={countryCode}
                  name="office_phone"
                  placeholder="Enter the phone number"
                  // onChange={inputChangedHandler}
                  // value={initialValues["phone_number"]}
                  containerClass="phone-input"
                  inputProps={{
                    name: "office_phone",
                  }}
                  // isValid={isValidNumber}
                  onChange={officePhoneChange}
                  value={user_info.office_phone}
                />
              </LabelComponent>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 23 }}>
              <LabelComponent label="Address" name="address">
                <Input
                  name="address"
                  onChange={inputChange}
                  value={user_info.address}
                  placeholder="Enter the address"
                />
              </LabelComponent>
            </Col>
          </Row>
        </RMContent>
        <RMButtons className="button">
          <Row gutter={15}>
            <Col span={12}>
              <Button size="md-1" outlined={true} onClick={handleCancleRM}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button size="md-1" htmlType="submit" loading={btn_loading}>
                Save
              </Button>
            </Col>
          </Row>
        </RMButtons>
      </Form>

      <Modal
        title="Message"
        visible={success_popup}
        onOk={handleOK}
        onCancel={handleOK}
        footer={[
          <Button size="md-2" onClick={handleOK}>
            Ok
          </Button>,
        ]}
      >
        <ModalText>{`${user_info.name} has been added as a new RM.`}</ModalText>
      </Modal>
    </RMWrapper>
  );
};

export default AddRM;
