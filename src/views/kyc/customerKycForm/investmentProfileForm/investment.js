import Notification from "../../../../sharedComponents/Notification";

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

export const getInvestmentPayload = (
  values,
  getSelectedObj,
  userType,
  fundSource,
  getDropdownValue,
  defaultValues,
  annualIncome,
  liquidNetWorth,
  totalNetWorth,
  transactionFrequency,
  globaliseDeposit,
  investmentHistory
) => {
  const payload = {
    kyc_step: "step3",
    kyc_type: userType,
    information: {
      fund_source: getSelectedObj(fundSource, values.fund_source),
      often_plan_trade: getDropdownValue(
        defaultValues.planTotrade,
        values.often_plan_trade
      ),
      annual_income: getSelectedObj(annualIncome, values.annual_income),
      liquid_net_worth: getSelectedObj(liquidNetWorth, values.liquid_net_worth),
      total_net_worth: getSelectedObj(totalNetWorth, values.total_net_worth),
      invest_exp_year: getDropdownValue(
        defaultValues.investmentExperience,
        values.invest_exp_year
      ),
      transcation_count: getSelectedObj(
        transactionFrequency,
        values.transcation_count
      ),
      risk_tolerance: getDropdownValue(
        defaultValues.riskTolerance,
        values.risk_tolerance
      ),
      expect_dep_amt: getSelectedObj(globaliseDeposit, values.expect_dep_amt),
      past_trade_count: getSelectedObj(
        investmentHistory,
        values.past_trade_count
      ),
    },
  };
  return payload;
};

export const getKycData = (
  connectWithApi,
  setIsData,
  setInvestmentProfileData,
  setInvestmentProfileDataId,
  setDropdownLoader,
  userType,
  setApiPayload,
  params
) => {
  connectWithApi()
    .getKycData(params)
    .then((res) => {
      const response = res.data;
      if (response.length) {
        setIsData(true);
        setInvestmentProfileData(response[0].information);
        setInvestmentProfileDataId(response[0].id);
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
