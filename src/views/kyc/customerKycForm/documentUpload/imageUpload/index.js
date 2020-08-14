import React from "react";
import { Col, Row } from "antd";

import { ErrorMessage } from "../../../sharedComponents/style";

import {
  BlueImageIcon,
  RemovedImageIcon,
  ImageName,
} from "../../../sharedComponents/imageUpload/style";

import ImageGroup from "../../../../../assets/imageGroup.png";

const ImageUpload = ({ list, clicked, isAddress, errorMessage }) => (
  <Row justify="center">
    <Col xs={{ span: 23, offset: 0 }} lg={{ span: 13 }}>
      <Row>
        {list.map((image) => (
          <Col span={12} key={image.id}>
            <BlueImageIcon src={ImageGroup}></BlueImageIcon>
            <ImageName>{image.name}</ImageName>
            <RemovedImageIcon
              onClick={() => clicked(list, image.id, isAddress)}
            ></RemovedImageIcon>
          </Col>
        ))}
      </Row>
      <ErrorMessage>{errorMessage} </ErrorMessage>
    </Col>
  </Row>
);

export default ImageUpload;
