import Notification from "../../../../sharedComponents/Notification";

export const Employed = "Employed";
export const SelfEmployed = "Self Employed / Business Owner";

export const getEmployedPayload = (
  values,
  getSelectedObj,
  employeeStatus,
  industry,
  position,
  userType,
  affiliated,
  tradedCompany,
  officialInfo
) => {
  const politicalPublicMember = {
    political_public_member: values.political_public_member,
  };
  const companyTricker = {
    company_tricker_symbol: values.company_tricker_symbol,
    control_person_company_name: values.control_person_company_name,
  };

  let payload = {
    kyc_step: "step2",
    kyc_type: userType,
    information: {
      emp_status: getSelectedObj(employeeStatus, values.emp_status),
      is_finra: affiliated,
      is_control_person: tradedCompany,
      is_political_public: officialInfo,
    },
  };
  if (officialInfo) {
    payload.information = {
      ...payload.information,
      ...politicalPublicMember,
    };
  }
  if (tradedCompany) {
    payload.information = { ...payload.information, ...companyTricker };
  }
  if (values.emp_status === Employed || values.emp_status === SelfEmployed) {
    const notEmployed = {
      industry: getSelectedObj(industry, values.industry),
      emp_type: getSelectedObj(position, values.emp_type),
      company_name: values.company_name,
    };
    payload.information = { ...payload.information, ...notEmployed };
  }
  return payload;
};

export const storeKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  nextStep
) => {
  connectWithApi()
    .storeKycData(payload)
    .then((res) => {
      setIsLoading(false);
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};

export const getKycData = (
  connectWithApi,
  setIsData,
  setEmpDetailsData,
  setEmpDetailsDataId,
  setAffiliated,
  setTradedCompany,
  setOfficialInfo,
  setIsAffiliatedSwitch,
  setIsTradedCompanySwitch,
  setIsOfficialInfoSwitch,
  setEmployed,
  setDropdownLoader,
  userType,
  params,
  setApiPayload
) => {
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      const response = res.data;
      if (response.length) {
        setIsData(true);
        setEmpDetailsData(response[0].information);
        setEmpDetailsDataId(response[0].id);
        setAffiliated(response[0].information.is_finra);
        setIsAffiliatedSwitch(response[0].information.is_finra);
        setTradedCompany(response[0].information.is_control_person);
        setIsTradedCompanySwitch(response[0].information.is_control_person);
        setOfficialInfo(response[0].information.is_political_public);
        setIsOfficialInfoSwitch(response[0].information.is_political_public);
        const isEmployedOrSelfEmployed =
          response[0].information.emp_status.value === "EMPLOYED" ||
          response[0].information.emp_status.value === "SELF_EMPLOYED";
        setEmployed(isEmployedOrSelfEmployed);
        const apiPayload = {
          kyc_step: response[0].kyc_step,
          kyc_type: response[0].kyc_type,
          information: response[0].information,
        };
        setApiPayload(apiPayload);
      } else {
        setIsData(false);
      }
      setDropdownLoader(false);
    })
    .catch((error) => {
      setDropdownLoader(false);
      Notification({ type: "error", content: error.message });
    });
};

export const updateKycData = (
  connectWithApi,
  payload,
  setIsLoading,
  nextStep,
  params
) => {
  connectWithApi()
    .updateKycData(payload, params)
    .then((res) => {
      setIsLoading(false);
      nextStep();
    })
    .catch((error) => {
      setIsLoading(false);
      Notification({ type: "error", content: error.message });
    });
};
