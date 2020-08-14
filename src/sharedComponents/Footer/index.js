import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import { StyledFooter } from "./styles";

const FooterComponent = () => {
    return (
        <StyledFooter>
            By signing in you agree to our <span>terms</span> and{" "}
            <span>policies</span> . You also acknowledge you have read our{" "}
            <span>disclosures</span> & <span>brochure</span>.
        </StyledFooter>
    );
};

export default FooterComponent;
