import React from "react";
import { Col, Row } from "antd";

import { BlueImageIcon, RemovedImageIcon, ImageName } from "./style";
import { ErrorMessage } from "../style";

import ImageGroup from "../../../../assets/imageGroup.png";

const ImageUpload = ({ span, list, clicked, errorMessage }) => (
  <Row justify="center">
    <Col xs={{ span: 23, offset: 0 }} lg={{ span: span }}>
      <Row>
        {list.map((image) => (
          <Col span={12} key={image.id}>
            <BlueImageIcon src={ImageGroup}></BlueImageIcon>
            <ImageName>{image.name}</ImageName>
            <RemovedImageIcon onClick={() => clicked(list, image.id)} />
          </Col>
        ))}
      </Row>
      <ErrorMessage>{errorMessage} </ErrorMessage>
    </Col>
  </Row>
);

export default ImageUpload;
