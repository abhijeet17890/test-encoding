export const regExp = {
  Pan: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
  Email: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  strLowerCase: /^(?=.*[a-z])/,
  strUpperCase: /^(?=.*[A-Z])/,
  containsNum: /^(?=.*[0-9])/,
  containsSpecialChar: /^(?=.*[!@#$%^&*])/,
  Aadhaar: /\d{4}\d{4}\d{4}$/,
  Gst: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
  ifscCode: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
  routingNumber:/^\d{9}$/,
  swiftNumber:/^[A-Za-z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/
};
