import React, { useState } from "react";
import { Space } from "antd";
import { StockButton } from "./styles";

const ButtonWrape = ({handleClick}) => {
  

  return (
    <Space size="large" align="end">
      {/* <StockButton customcornertype="round-corner" outlined href="/" disabled>
        + Funds
      </StockButton> */}
      <StockButton customcornertype="round-corner" onClick={handleClick}>
        View Portfolio
      </StockButton>
    </Space>
  );
};

export default ButtonWrape;
