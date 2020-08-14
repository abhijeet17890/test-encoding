import React from "react";

import SubHeadingComponent from "../sharedComponents/subHeading";
import { StyledDiv } from "../sharedComponents/style";

const Title = ({ className, title }) => (
  <StyledDiv className={className}>
    <SubHeadingComponent title={title} />
  </StyledDiv>
);

export default Title;
