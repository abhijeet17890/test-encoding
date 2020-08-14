import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {LoaderWrapper , loaderSize} from "./style.js";

const antIcon = <LoadingOutlined style={loaderSize} spin />;

export default function Loader(props) {
  return (
    <LoaderWrapper>
      <Spin {...props} indicator={antIcon} />
    </LoaderWrapper>
  );
}
