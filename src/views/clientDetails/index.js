import React from "react";
import { useLocation } from "react-router-dom";

import ClientHome from "../kyc/clientKyc/clientHome";
import ClientAccountDetails from "../ClientAccountDetails";

const ClientDetails = (props) => {
  const location = useLocation();

  const client = location.state && location.state.client;
  const clientId = props.match.params.id;

  let kycStatus,
    kycSubmitted,
    clientName,
    clientFirstName,
    clientLastName,
    clientMobileNumber;
  if (client) {
    kycStatus = client.client_code.kyc_status;
    kycSubmitted = client.client_code.kyc_submitted;
    clientFirstName = client.client_details.first_name;
    clientLastName = client.client_details.last_name;
    clientName = clientFirstName + " " + clientLastName;
    clientMobileNumber = client.client_details.phone_number;
  }
  let clientDetailsTemplate;
  if (kycStatus === null && !kycSubmitted) {
    clientDetailsTemplate = (
      <ClientHome
        clientName={clientName}
        clientFirstName={clientFirstName}
        clientLastName={clientLastName}
        clientId={clientId}
        clientMobileNumber={clientMobileNumber}
      />
    );
  } else {
    clientDetailsTemplate = (
      <ClientAccountDetails clientName={clientName} clientId={clientId} />
    );
  }
  return clientDetailsTemplate;
};

export default ClientDetails;
