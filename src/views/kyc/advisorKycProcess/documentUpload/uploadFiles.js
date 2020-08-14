import React from "react";

import PanUploadFiles from "./panDocUpload";
import IncorporationDocUpload from "./incorporationDocUpload";
import RegistrationDocUpload from "./registrationDocUpload";

const UploadFiles = ({ selectedAdvisorType, certificateValue }) => {
  return (
    <React.Fragment>
      <PanUploadFiles />
      {selectedAdvisorType === "Corporate" ? <IncorporationDocUpload /> : null}
      {selectedAdvisorType === "Partnership" ? (
        <RegistrationDocUpload certificateValue={certificateValue} />
      ) : null}
    </React.Fragment>
  );
};

export default UploadFiles;
