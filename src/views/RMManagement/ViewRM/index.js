import React, { useEffect, useState } from "react";
import { StyleLabel, RMContent, RMButtons, StyledRow } from "./style";
import { Row, Col } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { useInsideAuthApi } from "../../../contextProviders/apiProvider"; // step1: needed for calling all inside authentication apis
import Notification from "../../../sharedComponents/Notification";
import Loader from "../../../sharedComponents/Loader";
import { PageHeading } from "../../../sharedComponents/Heading";
import Divider from "../../../sharedComponents/Divider";
import { Button } from "../../../sharedComponents/button";
import { Modal } from "../../../sharedComponents/Modal";
import { RMWrapper, ModalText } from "../style";

const ViewRM = () => {
  const [status, handleStatus] = useState();
  const [conform_deactivate, handleConformDeativate] = useState(false);
  const [deactivate_rm, handleDeactivateRM] = useState(false);
  const [delete_popup, handleDeletePopup] = useState(false);
  const [conform_delete, handleConformDelete] = useState(false);
  const [rm_detail, setRMDetails] = useState({});
  let history = useHistory();
  const { connectWithApi } = useInsideAuthApi(); // step 2:  needed for calling all inside authentication apis
  const location = useLocation();
  const id = location.state;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
    // const id = location.state;
    // step 3:  function calls for related api functions written in services -> insideAuthApis.js
    connectWithApi()
      .getRM(id)
      .then((res) => {
        let obj = {
          id: res.data.personal_details.id,
          email: res.data.user.email,
          status: res.data.status ,
          name: res.data.personal_details.first_name,
          address: res.data.address,
          phone_number: res.data.personal_details.phone_number,
          office_phone: res.data.personal_details.office_phone,
          rm_code: res.data.rm_code,
          employee_code: res.data.employee_code,
        };
        setRMDetails(obj);
        handleStatus(res.data.status);
        setLoader(false);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  }, []);

  const handleDeactivate = () => {
    handleDeactivateRM(true);
  };

  const handleEditRM = () => {
    history.push({
      pathname: routes.authRoutes.editRM,
      state: id,
    });
  };

  const handleModalDeactivate = () => {
    handleDeactivateRM(false);
    if (rm_detail.status === "Active") {
      let data = {
        status: "Inactive",
      };
      connectWithApi()
        .deactivateRM(id, data)
        .then((res) => {
          handleConformDeativate(true);
          setRMDetails({ ...rm_detail, status: "Inactive" });
        })
        .catch((error) => {
          Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
          console.log(error);
        });
    } else {
      let data = {
        status: "Active",
      };
      connectWithApi()
        .deactivateRM(id, data)
        .then((res) => {
          // setLoader(false);
          console.log("rm status", rm_detail.status, "status", status);
          handleConformDeativate(true);
          setRMDetails({ ...rm_detail, status: "Active" });
        })
        .catch((error) => {
          Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
          console.log(error);
        });
    }
  };

  const handleDelete = () => {
    handleDeletePopup(true);
  };

  const handleMoodalDelete = () => {
    handleDeletePopup(false);
    connectWithApi()
      .deleteRM(id)
      .then((res) => {
        // setLoader(false);
        handleConformDelete(true);
      })
      .catch((error) => {
        Notification({ type: "error", content: error.message }); //Universal error function to show error/success notification
        console.log(error);
      });
  };
  const handleOk = () => {
    handleConformDeativate(false);
    handleStatus(rm_detail.status);
  };

  const handleDeleteOk = () => {
    handleConformDelete(false);
    history.push(routes.authRoutes.listRM);
  };

  const handleCancel = () => {
    handleDeletePopup(false);
    handleDeactivateRM(false);
  };
  return (
    <RMWrapper>
      <Loader size="large" spinning={loader} />
      {!loader ? (
        <>
          <Row>
            <Col>
              <PageHeading>Relationship Managers Details</PageHeading>
            </Col>
          </Row>
          <Divider />
          <RMContent className="children">
            <StyledRow className="first-cont">
              <Col lg={{ span: 23 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Name</StyleLabel>
                <StyleLabel className="content">{rm_detail.name}</StyleLabel>
              </Col>
            </StyledRow>
            <StyledRow className="seco-cont">
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Employee Code</StyleLabel>
                <StyleLabel className="content">
                  {rm_detail.employee_code}
                </StyleLabel>
              </Col>
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Globalise RM Code</StyleLabel>
                <StyleLabel className="content">{rm_detail.rm_code}</StyleLabel>
              </Col>
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Email </StyleLabel>
                <StyleLabel className="content">{rm_detail.email}</StyleLabel>
              </Col>
            </StyledRow>
            <StyledRow className="third-cont">
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Office Phone</StyleLabel>
                <StyleLabel className="content">
                  {rm_detail.office_phone}
                </StyleLabel>
              </Col>
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Mobile</StyleLabel>
                <StyleLabel className="content">
                  {rm_detail.phone_number}
                </StyleLabel>
              </Col>
              <Col lg={{ span: 8 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Status</StyleLabel>
                <StyleLabel className="content">{rm_detail.status}</StyleLabel>
              </Col>
            </StyledRow>
            <StyledRow className="forth-cont">
              <Col lg={{ span: 23 }} xs={{ span: 23 }}>
                <StyleLabel className="heading">Address</StyleLabel>
                <StyleLabel className="content">{rm_detail.address}</StyleLabel>
              </Col>
            </StyledRow>
          </RMContent>
          <RMButtons>
            <Row gutter={[36, 24]}>
              <Col
                lg={{ span: 6, offset: 0 }}
                // sm={{ span: 10, offset: 2 }}
                // xs={{ span: 23, offset: 0 }}
              >
                <Button size="md-1" outlined={true} onClick={handleDelete}>
                  Delete
                </Button>
                {/* <StyledButton className="normal" onClick={handleDelete}>
                  Delete
                </StyledButton> */}
              </Col>
              <Col
                lg={{ span: 5, offset: 2 }}
                // sm={{ span: 10, offset: 2 }}
                // xs={{ span: 23, offset: 0 }}
              >
                <Button size="md-1" onClick={handleEditRM}>
                  Edit
                </Button>
              </Col>
              <Col
                lg={{ span: 5, offset: 0 }}
                // sm={{ span: 10, offset: 2 }}
                // xs={{ span: 23, offset: 0 }}
              >
                <Button size="md-1" onClick={handleDeactivate}>
                  {rm_detail.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </Col>
              <Col
                lg={{ span: 5, offset: 0 }}
                // sm={{ span: 10, offset: 2 }}
                // xs={{ span: 23, offset: 0 }}
              >
                <Button size="md-1">Transfer Clients</Button>
              </Col>
            </Row>
          </RMButtons>

          <Modal
            title="Message"
            visible={conform_deactivate}
            onOk={handleOk}
            onCancel={handleOk}
            footer={[
              <Button key="submit" size="md-2" onClick={handleOk}>
                Ok
              </Button>,
            ]}
          >
            <ModalText>
              {status === "Active"
                ? `${rm_detail.name} has been deactivated as a RM`
                : `${rm_detail.name} has been activated as a RM`}
            </ModalText>
          </Modal>

          <Modal
            title="Confirmation"
            visible={deactivate_rm}
            onOk={handleModalDeactivate}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                size="md-2"
                outlined={true}
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button key="submit" size="md-2" onClick={handleModalDeactivate}>
                {rm_detail.status === "Active" ? "Deactivate" : "Activate"}
              </Button>,
            ]}
          >
            <ModalText>
              {rm_detail.status === "Active"
                ? `Are you sure you want to deactivate ${rm_detail.name} as an RM`
                : `Are you sure you want to activate ${rm_detail.name} as an RM`}
            </ModalText>
          </Modal>

          <Modal
            title="Message"
            visible={conform_delete}
            onOk={handleDeleteOk}
            onCancel={handleDeleteOk}
            footer={[
              <Button key="submit" size="md-2" onClick={handleDeleteOk}>
                Ok
              </Button>,
            ]}
          >
            <ModalText>{`${rm_detail.name} has been deleted as a RM`}</ModalText>
          </Modal>

          <Modal
            title="Confirmation"
            visible={delete_popup}
            onOk={handleModalDeactivate}
            onCancel={handleCancel}
            // centered={true}
            footer={[
              <Button
                key="back"
                size="md-2"
                outlined={true}
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button key="submit" size="md-2" onClick={handleMoodalDelete}>
                Delete
              </Button>,
            ]}
          >
            <ModalText>
              {`Are you sure you want to delete ${rm_detail.name} as an RM`}
            </ModalText>
          </Modal>
        </>
      ) : null}
    </RMWrapper>
  );
};

export default ViewRM;
