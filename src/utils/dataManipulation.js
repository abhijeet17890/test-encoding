import scrollIntoView from "scroll-into-view-if-needed";
import moment from "moment";

export const datePickerFormat = "DD MMM YYYY";

export const apiDateFormat = "DD-MM-YYYY";

export const buildQuery = params => {
    let query = "";
    for (const [key, value] of Object.entries(params)) {
        query = query.concat(`&${key}=${(value)}`);
    }
    return `?${query.slice(1)}`;
}

export const capitaliseFirstChar = phrase => {
    let query = phrase?phrase.toString():'';
    query = phrase.replace(/_/g, " ");
    query = query.replace(/^\w/, c => c.toUpperCase());
    return query;
}

export const changePascalCase=(str)=> {
    return str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}


//this will add the commas and return vale with two places after decimal
export const applyAmountCommaMask = val => {   // u can pass as a number or string
    val = parseFloat(val).toFixed(2)
   val += '';
   var x = val.split('.');
   var x1 = x[0];
   var x2 = x.length > 1 ? '.' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
       x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;    // u wil get result in string format
}
export const formatPercentage = val => {
  const y = Math.pow(10,2);

  let x = val?parseFloat(val):0;
  x = Math.round(x * y)/y;
  return (x+'%');

}

export const appendQryParamToUrl = (queryParamsObj,url) => {
    let queryStr = buildQuery(queryParamsObj);
    return url.includes("?") ? `${url}&${queryStr.replace("?","")}` : `${url}${queryStr}`
}


export const getUserType = (loggedInUser) =>
  loggedInUser.userType.charAt(0).toUpperCase() +
  loggedInUser.userType.slice(1);

export const getDropdownValue = (obj, key) => {
  const data = obj.find((item) => item.name === key);
  return data ? data.value : null;
};

export const getDropdownName = (obj, key) => {
  const data = obj.find((item) => item.value === key);
  return data ? data.name : null;
};

const removeWhiteSpaces = (text) => text.replace(/\s/g, "");

export const getSelectedObj = (obj, key) => {
  const data = obj.find(
    (item) => removeWhiteSpaces(item.name) === removeWhiteSpaces(key)
  );
  if (data) {
    let updatedData = {};
    if (data.value !== undefined) {
      updatedData = {
        id: data.id,
        name: data.name,
        value: data.value,
      };
    } else {
      updatedData = {
        id: data.id,
        name: data.name,
      };
    }
    return updatedData;
  } else {
    return null;
  }
};

export const getSelectedAdvObj = (obj, key) => {
  const data = obj.find((item) => item.name === key.toUpperCase());
  return data ? data : null;
};

export const getSelectedAdvCountryObj = (obj, key) => {
  const data = obj.find((item) => item.name === key);
  if (data) {
    let updatedData = {};
    updatedData = {
      id: data.id,
      name: data.name,
      code: data.code,
    };
    return updatedData;
  } else {
    return null;
  }
};

export const formateName = (name) => {
  if (name) {
    return (
      name.toLocaleLowerCase().charAt(0).toUpperCase() +
      name.toLocaleLowerCase().slice(1)
    );
  } else {
    return null;
  }
};

export const onFinishFailed = (className) => {
  const node = document.getElementsByClassName(className)[0];
  scrollIntoView(node, {
    scrollMode: "if-needed",
    block: "center",
    inline: "center",
  });
};

export const disabledPastDate = (current) =>
  current && current < moment().endOf("day");

export const disabledFutureDate = (current) =>
  current && current > moment().endOf("day");

export const getApiDate = (dateString) =>
  moment(dateString).format(apiDateFormat);

export const formateDate = (dateString) => {
  const date = moment(dateString, apiDateFormat).format(datePickerFormat);
  return moment(date, datePickerFormat);
};

export const getPersonAge = (year) => moment().diff(`${year}`, "years");

export const scrollToTop = () => {
  window.scrollTo(0, 0);
  window.scrollTop = 0;
};

export const countDecimals = (value) => {
  if (value !== "-") {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  } else {
    return 0;
  }
};