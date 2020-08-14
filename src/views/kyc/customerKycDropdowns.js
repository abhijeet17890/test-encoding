import Notification from "../../sharedComponents/Notification";

export const getCustomerKycDropdowns = (
  connectWithApi,
  setSteps1DropDown,
  setSteps2DropDown,
  setSteps3DropDown,
  setSteps4DropDown,
  setIsStep
) => {
  connectWithApi()
    .getCustomerKycDropdowns()
    .then((res) => {
      res.step1 ? setSteps1DropDown(res.step1) : setSteps1DropDown([]);
      res.step2 ? setSteps2DropDown(res.step2) : setSteps2DropDown([]);
      res.step3 ? setSteps3DropDown(res.step3) : setSteps3DropDown([]);
      res.step4 ? setSteps4DropDown(res.step4) : setSteps4DropDown([]);
      setIsStep(true);
    })
    .catch((error) => {
      setIsStep(true);
      Notification({ type: "error", content: error.message });
    });
};
