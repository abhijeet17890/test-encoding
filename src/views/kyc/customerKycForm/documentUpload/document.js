import Notification from "../../../../sharedComponents/Notification";

export const getFormData = (documentType, file) => {
  const formData = new FormData();
  formData.set("document_type", documentType);
  formData.set("name", file.name);
  formData.append("document", file.originFileObj);
  return formData;
};

export const storeClientKycDocument = (
  connectWithApi,
  file,
  documentType,
  setIdentityProofImage,
  identityProofImage,
  setIdentityProofLoader,
  setAddressProofImage,
  addressProofImage,
  setAddressProofLoader,
  setIdentityProofErrorMessage,
  setAddressProofErrorMessage,
  formData,
  clientId
) => {
  let updatedList = [];
  connectWithApi()
    .storeClientKycDocument(formData, clientId)
    .then((res) => {
      if (res.data) {
        const list = {
          name: res.data.name,
          id: res.data.id,
        };

        if (documentType === "PICTURE_ID") {
          updatedList = [...identityProofImage, list];
          setIdentityProofImage(updatedList);
          setIdentityProofErrorMessage("");
        } else {
          updatedList = [...addressProofImage, list];
          setAddressProofImage(updatedList);
          setAddressProofErrorMessage("");
        }
      }
      documentType === "PICTURE_ID"
        ? setIdentityProofLoader(false)
        : setAddressProofLoader(false);
    })
    .catch((error) => {
      if (documentType === "PICTURE_ID") {
        setIdentityProofLoader(false);
        setIdentityProofErrorMessage(error.message);
      } else {
        setAddressProofLoader(false);
        setAddressProofErrorMessage(error.message);
      }
    });
};


export const getUploadedKycDocument = (
  connectWithApi,
  documentType,
  setIdentityProofImage,
  setIdentityProofLoader,
  setAddressProofImage,
  setAddressProofLoader,
  params
) => {
  connectWithApi()
    .getKycDocument(params)
    .then((res) => {
      if (res.data) {
        const result = res.data;
        let newList = [];
        result.map((val) => {
          newList.push({
            name: val.name,
            id: val.id,
          });
        });
        if (documentType === "PICTURE_ID") {
          setIdentityProofImage(newList);
        } else {
          setAddressProofImage(newList);
        }
      }
      documentType === "PICTURE_ID"
        ? setIdentityProofLoader(false)
        : setAddressProofLoader(false);
    })
    .catch((error) => {
      documentType === "PICTURE_ID"
        ? setIdentityProofLoader(false)
        : setAddressProofLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

export const removedImage = (
  list,
  id,
  isAddress,
  setAddressProofImage,
  setIdentityProofImage,
  connectWithApi,
  params
) => {
  deleteKycDocument(connectWithApi, params);
  const updatedList = list.filter((val) => id !== val.id);
  isAddress === true
    ? setAddressProofImage(updatedList)
    : setIdentityProofImage(updatedList);
};

const deleteKycDocument = (connectWithApi, id) => {
  connectWithApi()
    .deleteKycDocument(id)
    .then((res) => {})
    .catch((error) => {});
};

export const storeKycDocument = (
  connectWithApi,
  file,
  documentType,
  setIdentityProofImage,
  identityProofImage,
  setIdentityProofLoader,
  setAddressProofImage,
  addressProofImage,
  setAddressProofLoader,
  setIdentityProofErrorMessage,
  setAddressProofErrorMessage,
  formData
) => {
  let updatedList = [];
  connectWithApi()
    .storeKycDocument(formData)
    .then((res) => {
      if (res.data) {
        const list = {
          name: res.data.name,
          id: res.data.id,
        };

        if (documentType === "PICTURE_ID") {
          updatedList = [...identityProofImage, list];
          setIdentityProofImage(updatedList);
          setIdentityProofErrorMessage("");
        } else {
          updatedList = [...addressProofImage, list];
          setAddressProofImage(updatedList);
          setAddressProofErrorMessage("");
        }
      }
      documentType === "PICTURE_ID"
        ? setIdentityProofLoader(false)
        : setAddressProofLoader(false);
    })
    .catch((error) => {
      if (documentType === "PICTURE_ID") {
        setIdentityProofLoader(false);
        setIdentityProofErrorMessage(error.message);
      } else {
        setAddressProofLoader(false);
        setAddressProofErrorMessage(error.message);
      }
    });
};