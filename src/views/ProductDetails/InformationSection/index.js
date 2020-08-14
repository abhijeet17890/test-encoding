import React from "react";
import ShareInformationSection from "./shareInformation";
import EtfInformation from "./etfInformation";
const InformationSection = (props) => {
  return (
    <>
      <ShareInformationSection header_data={props.header_data} other_data={props.other_data}/>
      {/* <EtfInformation/> */}
    </>
  )
}
export default InformationSection;