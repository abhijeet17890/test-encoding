import React, { useState , useRef} from "react";
import { Typography, Row , Col} from 'antd';
import { StyledDivider } from '../Style';
import {
  Heading,
  NewsInfoDiv,
  NewsInformation,
  NewsTime,
  NewsButtonDiv,
  ReadMoreBtn
} from "./style";


const News = (props) => {
  // const [viewless, handleView] = useState(true);
  const [viewless, handleView] = useState([
    {
      id: 1,
      img: "",
      class:'viewless',
      heading: "Stocks in news: Divi's Lab, JSW Steel and Indiabulls Housing",
      time: "ET NOW | 06 FEB 2020, 08:28 AM IST",
      information:
        "Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type",
    },
    {
      id: 2,
      img: "",
      class:'viewless',
      heading: "Stocks in news: Divi's Lab, JSW Steel and Indiabulls Housing",
      time: "ET NOW | 06 FEB 2020, 08:28 AM IST",
      information:
        "Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type",
    },
  ]);
  const { Title } = Typography;

  const viewEvent =(index)=>{

    let newArr = [...viewless]; // copying the old datas array

    if(newArr[index].class !== ''){
      newArr[index].class = '';
    }else{
      newArr[index].class = 'viewless'
    }
    handleView(newArr);
  }

  return (
    <>
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Title level={4}>News</Title>
      </Col>
    </Row>
      {viewless.map((d, index) => {
        return (
          <div key={index}>
            <Row gutter={[8, 40]}>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <img src={require("./Rounded Rectangle 900.jpg")} alt="" />
              </Col>
              <Col xs={24} sm={24} md={15} lg={15} xl={15} offset={window.innerWidth > 768 ?1:0}>
              <Row>
                <Col span={24}>
                  <Heading>{d.heading}</Heading>
                </Col>
                <Col span={24}>
                  <NewsTime>{d.time}</NewsTime>
                </Col>
                <Col span={24}>
                <NewsInfoDiv className={d.class}>
                  <NewsInformation>{d.information}</NewsInformation>
                </NewsInfoDiv>
                <NewsButtonDiv>
                  <ReadMoreBtn
                    type="link"
                    // onClick={(index) => handleViewExt(index)}
                    onClick={() => viewEvent(index)}
                  >
                    {viewless[index].class === 'viewless' ? `Read more` : `Read less`}
                  </ReadMoreBtn>
                </NewsButtonDiv>
                </Col>

              </Row>
                
                
              </Col>
            </Row>
            <Row gutter={[0, 20]}>
              <Col span={24}>
              <StyledDivider />
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default News;
