import Notification from "../../../../sharedComponents/Notification";

export const hideShowCountryErrorMessage = (isActive, form) => {
  if (!isActive) {
    form.setFields([
      {
        name: "country",
        validating: false,
        errors: [`Applications from 'Selected country cannot be processed'`],
      },
    ]);
  } else {
    form.setFields([
      {
        name: "country",
        validating: true,
        errors: [],
      },
    ]);
  }
};

export const getCountryList = (connectWithApi, setCountries) => {
  connectWithApi()
    .getCountryList()
    .then((res) => {
      setCountries(res.data);
    })
    .catch((error) => {
      Notification({ type: "error", content: error.message });
    });
};

export const addressChangedEvent = (
  value,
  setCountryActive,
  setCountryCode3,
  countries,
  form
) => {
  const country = countries.find((item) => item.name == value);
  const isActive = country.active;
  const code = country.code3;
  form.setFieldsValue({
    city: null,
    state: null,
    postal_code: null,
  });
  setCountryActive(isActive);
  hideShowCountryErrorMessage(isActive, form);
  setCountryCode3(code);
};

export const citizenshipChangedEvent = (
  value,
  countries,
  setIsValidCitizenship,
  openInfoModal,
  setInfoModalVisible,
  setCountryCode
) => {
  const country = countries.find((item) => item.name == value);
  const code = country.code2;
  if (value === "United States") {
    setIsValidCitizenship(false);
    openInfoModal(setInfoModalVisible);
  } else {
    setIsValidCitizenship(true);
  }
  setCountryCode(code.toLowerCase());
};
