import React, { useState, useEffect } from "react";
import { RMContent, RMButtons } from "./style";
import { Row, Col } from "antd";
import { Form } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import { routes } from "../../../constants/routes";
import Loader from "../../../sharedComponents/Loader";
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

const EditRM = () => {
  const [success_popup, handleSuccessPopup] = useState(false);
  const [mobile_edited, handleMobileEdited] = useState(false);
  const [email_edited, handleEmailEdited] = useState(false);
  const [email_edit_popup, handleEditPopup] = useState(false);
  const [otp_popup, handleOtp] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const id = location.state;
  const [countryCode, setCountryCode] = useState("in");
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const [udpate_details, setUpdate] = useState({
    name: "",
    employee_code: "",
    email: "",
    mobile_no: "",
    office_phone: "",
    address: "",
  });
  const [loader, setLoader] = useState(true);
  const [btn_loading, setBtnLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    setCountryCode("in");
    // const id = location.state;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    connectWithApi()
      .getRM(id)
      .then((res) => {
        form.setFieldsValue({
          name: res.data.personal_details.first_name,
          employee_code: res.data.employee_code,
          email: res.data.user.email,
          mobile_no: res.data.personal_details.phone_number,
          office_phone: res.data.personal_details.office_phone || "",
          address: res.data.address,
        });
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }, []);

  let history = useHistory();

  const handleFF = () => {
    setBtnLoading(true);
    let obj = {};
    let personal_details = {};
    let user = {};
    if (udpate_details.name !== "") {
      personal_details["first_name"] = udpate_details.name;
    }
    if (udpate_details.mobile_no !== "") {
      personal_details["phone_number"] = udpate_details.mobile_no;
    }
    if (udpate_details.office_phone !== "") {
      personal_details["office_phone"] = udpate_details.office_phone;
    }
    if (Object.entries(personal_details).length !== 0) {
      user["personal_details"] = personal_details;
    }
    // obj["user"] = user;
    if (udpate_details.email !== "") {
      user["email"] = udpate_details.email;
    }
    if (Object.entries(user).length !== 0) {
      obj["user"] = user;
    }

    if (udpate_details.employee_code !== "") {
      obj["employee_code"] = udpate_details.employee_code;
    }
    if (udpate_details.address !== "") {
      obj["address"] = udpate_details.address;
    }

    connectWithApi()
      .updateRM(id, obj)
      .then((res) => {
        handleSuccessPopup(true);
        setBtnLoading(false);
        // setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };

  const handleOK = () => {
    handleSuccessPopup(false);
    history.push({ pathname: routes.authRoutes.viewRM, state: id });
  };

  const handleCancel = () => {
    history.push({ pathname: routes.authRoutes.viewRM, state: id });
  };

  const handleClosePopup = () => {
    handleSuccessPopup(false);
    handleEditPopup(false);
    handleOtp(false);
  };

  const inputChangedHandler = (phoneNum, country, e, formattedValue) => {
    setUpdate({ ...udpate_details, mobile_no: formattedValue });
    // handleMobileEdited(true);
  };

  const officePhoneChange = (phoneNum, country, e, formattedValue) => {
    setUpdate({ ...udpate_details, office_phone: formattedValue });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      if (mobile_edited === true) {
        // e.preventDefault();
      } else {
        console.log("state changed email");
        setUpdate({ ...udpate_details, email: e.target.value });
        // handleEmailEdited(true);
      }
    } else {
      setUpdate({ ...udpate_details, [e.target.name]: e.target.value });
    }
  };
  // const handleKeyPress = (e) => {
  //   console.log(e.target.name);
  //   if (mobile_edited === true && e.target.name === "email") {
  //     handleEditPopup(true);
  //     e.preventDefault();
  //   }
  // };

  // const handleKeyDown = (e) => {
  //   if (email_edited === true) {
  //     handleEditPopup(true);
  //     e.preventDefault();
  //   }
  // };
  // const onSendOtp = () => {
  //   handleOtp(false);
  //   handleSuccessPopup(true);
  // };

  return (
    <RMWrapper>
      {!loader ? (
        <>
          <Row>
            <Col>
              <PageHeading>Edit Relationship Manager Details</PageHeading>
            </Col>
          </Row>
          <Divider />
          <Form
            layout="vertical"
            // {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={handleFF}
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
                      onChange={handleInputChange}
                      placeholder="Enter the name"
                    />
                  </LabelComponent>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 23 }}>
                  <LabelComponent label="Employee Code" name="employee_code">
                    <Input
                      name="employee_code"
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      // onKeyDown={handleKeyPress}
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
                      // value={user_info.mobile_no}
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
                      // onKeyDown={handleKeyDown}
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
                      // value={initialValues["phone_number"]}
                      containerClass="phone-input"
                      inputProps={{
                        name: "office_phone",
                      }}
                      // isValid={isValidNumber}
                      onChange={officePhoneChange}
                    />
                  </LabelComponent>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 23 }}>
                  <LabelComponent label="Address" name="address">
                    <Input
                      name="address"
                      onChange={handleInputChange}
                      placeholder="Enter the address"
                    />
                  </LabelComponent>
                </Col>
              </Row>
            </RMContent>
            <RMButtons className="button">
              {" "}
              <Row gutter={15}>
                <Col span={12}>
                  <Button size="md-1" outlined={true} onClick={handleCancel}>
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
            onCancel={handleClosePopup}
            footer={[
              <Button key="submit" size="md-2" onClick={handleOK}>
                Ok
              </Button>,
            ]}
          >
            <ModalText>
              <ModalText>The changes have been saved</ModalText>
            </ModalText>
          </Modal>

          <Modal
            title="Message"
            visible={email_edit_popup}
            onOk={handleClosePopup}
            onCancel={handleClosePopup}
            footer={[
              <Button key="submit" size="md-2" onClick={handleClosePopup}>
                Ok
              </Button>,
            ]}
          >
            <ModalText>
              <ModalText>
                Changing of both email id and phone number can't be done in
                single iteration
              </ModalText>
            </ModalText>
          </Modal>

          {/* <ModalComponent
            visible={otp_popup}
            onCancel={handleClosePopup}
            onClick={onSendOtp}
          /> */}
        </>
      ) : (
        <Loader size="large" spinner={loader} />
      )}
    </RMWrapper>
  );
};

export default EditRM;
