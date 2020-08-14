import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { getPersonAge } from "../../../../utils/dataManipulation";

import SelectComponent from "../../sharedComponents/selectComponent";

import {
  months,
  currentYear,
  dobErrorMessage,
} from "../../constants/basicInfo";

import { addRemoveFormError } from "../../mobileVerification";

import { StyledFormItem, StyledRightCol } from "../../sharedComponents/style";

const setDobErrorMessage = (form) => {
  const fieldsValue = form.getFieldsValue();
  if (fieldsValue.date !== undefined && fieldsValue.month !== undefined) {
    if (getPersonAge(fieldsValue.year) < 18) {
      form.setFieldsValue({
        "date-of-birth": null,
      });
      addRemoveFormError("date-of-birth", false, dobErrorMessage, form);
    } else {
      form.setFieldsValue({
        "date-of-birth": fieldsValue.year,
      });
    }
  }
};

const DateOfBirth = ({ form, userProfileData, initialValues }) => {
  const [dateRange, setDateRange] = useState(31);
  const [monthName, setMonth] = useState();
  const [isLeap, setLeapYear] = useState(false);

  const getSelectedDate = () => form.getFieldsValue().date;

  useEffect(() => {
    if (userProfileData) {
      form.setFieldsValue({
        date: userProfileData.dobday,
        month: userProfileData.dobmonth
          ? months.filter(
              (val) => val.id === parseInt(userProfileData.dobmonth)
            )[0].name
          : initialValues["month"],
        year: userProfileData.dobyear,
        "date-of-birth": userProfileData.dobyear,
      });
    }
  }, []);

  const monthChangedHandler = (value) => {
    const days = months.filter((month) => month.name === value)[0].days;
    if (isLeap && value === "Feb") {
      changedFebDate(29);
    } else if (!isLeap && value === "Feb") {
      changedFebDate(28);
    } else {
      setDateRange(days);
    }
    setMonth(value);
    setDobErrorMessage(form);
  };
  const changedFebDate = (date) => {
    if (getSelectedDate() > date) {
      form.setFieldsValue({
        date: date,
      });
    }
    setDateRange(date);
    setDobErrorMessage(form);
  };
  const yearChangedHandler = (year) => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      setLeapYear(true);
      if (monthName === "Feb") {
        changedFebDate(29);
      }
    } else {
      if (monthName === "Feb") {
        changedFebDate(28);
      }
      setLeapYear(false);
    }
    setDobErrorMessage(form);
  };
  const dateChangedHandler = () => setDobErrorMessage(form);

  return (
    <StyledFormItem
      name="date-of-birth"
      label="Date of Birth"
      className="no-margin-bottom "
      rules={[
        {
          required: true,
          message: " ",
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (
              !value &&
              form.getFieldsValue().date &&
              form.getFieldsValue().month &&
              form.getFieldsValue().year
            ) {
              return Promise.reject(dobErrorMessage);
            } else if (!value) {
              return Promise.reject("Please select date of birth");
            } else {
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Row>
        <Col xs={{ span: 6 }} lg={{ span: 7 }}>
          <SelectComponent
            list={Array.from(new Array(dateRange))}
            isDay={true}
            placeholder="DD"
            isYear={false}
            name="date"
            label="&nbsp;"
            className="no-label"
            changedHandler={dateChangedHandler}
          />
        </Col>
        <StyledRightCol xs={{ span: 6 }} lg={{ span: 7 }}>
          <SelectComponent
            list={months}
            isDay={false}
            placeholder="MM"
            isYear={false}
            isMonth={true}
            changedHandler={monthChangedHandler}
            name="month"
            label="&nbsp;"
            className="no-label"
          />
        </StyledRightCol>
        <StyledRightCol xs={{ span: 7 }} lg={{ span: 7 }}>
          <SelectComponent
            list={Array.from(new Array(100))}
            isDay={false}
            placeholder="YY"
            isYear={true}
            changedHandler={yearChangedHandler}
            currentYear={currentYear}
            name="year"
            label="&nbsp;"
            className="no-label"
          />
        </StyledRightCol>
      </Row>
    </StyledFormItem>
  );
};

export default DateOfBirth;
