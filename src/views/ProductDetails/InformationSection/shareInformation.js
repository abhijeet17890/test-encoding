import React, { useState } from "react";
import {
  InformationWrapper,
  Heading,
  Content,
  ReadMoreBtn,
  ReadMoreBtnDiv,
  StyledAnchor,
  Span
} from "./style";
// import { Anchor } from 'antd';

const { Link } = StyledAnchor;

const ShareInformationSection = (props) => {
  const { header_data, other_data } = props;
  let first_data = other_data.description.substring(0, 250);
  let last_data = other_data.description.substring(251);
  console.log('first_data',first_data,'last_data',last_data)
  const [viewless, handleView] = useState(true);
  const [disp,setDisplay]=useState(true)
  const handleViewExt = (index) => {
    handleView(!viewless);
  };
  const handleClick = () => {
    setDisplay(!disp);
  }

  return (
    <InformationWrapper>
      <Heading>Description</Heading>

      <Content className={viewless === true ? "viewless" : null}>
        {other_data.description}
      </Content>
      {/* <Content>
        {first_data}<Span className={disp===true?'disp_none':"disp_more"}>{last_data}</Span>
      </Content> */}
      <ReadMoreBtnDiv>
        {/* <ReadMoreBtn type="link" onClick={handleClick}>
        {disp === true ? `Read more` : `Read less`}
        </ReadMoreBtn> */}
        <ReadMoreBtn
          type="link"
          onClick={(index) => handleViewExt(index)}
          // onClick={() => handleView(!viewless)}
        >
          {viewless === true ? `Read more` : `Read less`}
        </ReadMoreBtn>
      </ReadMoreBtnDiv>
      <Heading>Investor Relations</Heading>
      <Content>
      <StyledAnchor>
          <Link href={other_data.url} title={other_data.url} />
        </StyledAnchor>
      </Content>
    </InformationWrapper>
  );
};

export default ShareInformationSection;
