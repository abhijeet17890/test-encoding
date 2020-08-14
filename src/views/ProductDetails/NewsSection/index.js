import React, { useState } from "react";
import {
  NewsSection,
  Heading,
  NewsContainer,
  NewsLeftContent,
  NewsRightContent,
  NewsHeading,
  NewsInfoDiv,
  NewsInformation,
  NewsTime,
  NewsButtonDiv,
  ReadMoreBtn,
  StyledDivider,
} from "./style";

const News = () => {
  const [viewless, handleView] = useState([
    {
      id: 1,
      img: "",
      class: "viewless",
      heading: "Stocks in news: Divi's Lab, JSW Steel and Indiabulls Housing",
      time: "ET NOW | 06 FEB 2020, 08:28 AM IST",
      information:
        "Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type",
    },
    {
      id: 2,
      img: "",
      class: "viewless",
      heading: "Stocks in news: Divi's Lab, JSW Steel and Indiabulls Housing",
      time: "ET NOW | 06 FEB 2020, 08:28 AM IST",
      information:
        "Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type Lorem Ipsum is simply dummy text of the printing and type setting industry. Rem Ipsum is simply printing and type setting industry.Lorem Ipsum is simply Rem Ipsum is simply printing and type",
    },
  ]);

  const viewEvent = (index) => {
    let newArr = [...viewless]; // copying the old datas array

    if (newArr[index].class !== "") {
      newArr[index].class = "";
    } else {
      newArr[index].class = "viewless";
    }
    handleView(newArr);
  };
  return (
    <NewsSection>
      <Heading>News</Heading>
      {viewless.map((d, index) => {
        return (
          <div key={index}>
            <NewsContainer>
              <NewsLeftContent>
                <img src={require("./Rounded Rectangle 900.jpg")} alt="" />
              </NewsLeftContent>
              <NewsRightContent>
                <NewsHeading>{d.heading}</NewsHeading>
                <NewsTime>{d.time}</NewsTime>
                <NewsInfoDiv className={d.class}>
                  <NewsInformation>{d.information}</NewsInformation>
                </NewsInfoDiv>
                <NewsButtonDiv>
                  <ReadMoreBtn
                    type="link"
                    // onClick={(index) => handleViewExt(index)}
                    // onClick={() => handleView(!viewless)}
                    onClick={() => viewEvent(index)}
                  >
                    {viewless[index].class === "viewless"
                      ? `Read more`
                      : `Read less`}
                  </ReadMoreBtn>
                </NewsButtonDiv>
              </NewsRightContent>
            </NewsContainer>
            <StyledDivider />
          </div>
        );
      })}
    </NewsSection>
  );
};

export default News;
