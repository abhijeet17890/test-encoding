import { scrollToTop } from "../../utils/dataManipulation";

export const nextStep = (setCurrent, current) => {
  scrollToTop();
  setCurrent(current + 1);
};

export const backStep = (setCurrent, current) => {
  scrollToTop();
  setCurrent(current - 1);
};
