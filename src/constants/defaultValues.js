const hostName = window.location.hostname;
export const defaultValues = {
  userRole: hostName.includes("customer")?'Customer':(hostName.includes("advisor"))?'Advisor':'Customer',
  roleList: [
    {
      "id": 1,
      "name": "Advisor"
    },
    {
      "id": 2,
      "name": "Customer"
    },
    {
      "id": 3,
      "name": "Relationship Manager"
    }
  ],
  otpTime: 30, //seconds,
  otpLength: 6, //in no of digits
  timeAfterEmailExistsCheck: 300, // in seconds,
  appAutoLogOutTime: 15, // in minutes,
  kycOtpMessage: "Please enter the OTP sent to your mobile number",
  ResetPasswordOtpResend:'Reset your password by entering the OTP sent to your email' ,
  SignUpOtpResend: 'Activate your account by entering the OTP which we sent to your email',
  SignInOtpResend: 'Sign In to your account by entering the OTP sent to your email',
  searchAfterChar: 2,
  riskTolerance: [
    {
      id: 1,
      name: "Conservative",
      value: "LOW",
      description:
        "I'm comfortable accepting lower returns for more stability.",
    },
    {
      id: 2,
      name: "Moderate",
      value: "MODERATE",
      description:
        "I'm looking for growth. Moderate gains or losses along the way are fine.",
    },
    {
      id: 3,
      name: "Aggressive",
      value: "HIGH",
      description: "I'm comfortable accepting higher risk for higher returns.",
    },
  ],
  investmentExperience: [
    {
      id: 1,
      name: `None`,
      value: `NONE`,
    },
    {
      id: 2,
      name: `1–2 years`,
      value: `YRS_1_2`,
    },
    {
      id: 3,
      name: `3–5 years`,
      value: `YRS_3_5`,
    },
    {
      id: 4,
      name: `5–10 years`,
      value: `YRS_5_10`,
    },
    {
      id: 5,
      name: `10+ years`,
      value: `YRS_10_`,
    },
  ],
  planTotrade: [
    {
      id: 1,
      name: "Every 3-6 months",
      value: "LONG_TERM",
    },
    {
      id: 2,
      name: "Every month",
      value: "INFREQUENT",
      mobileSpan: 12,
      desktopSpan: 5,
    },
    {
      id: 3,
      name: "Every week",
      value: "FREQUENT",
    },
    {
      id: 4,
      name: "Daily",
      value: "ACTIVE_DAILY",
    },
  ],
  defaultCurrency: '$',
  BeneficiaryDetails: [
    {
      key: 'Beneficiary Name:',
      value: 'DriveWealth, LLC'
    },
    {
      key: ' Address: ',
      value:'97 Main St 2nd Floor Chatham, NJ 07928 USA'
    },
    {
      key: ' Bank: ',
      value:'M and T Bank'
    },
    {
      key: ' Account Number:',
      value:' 9870304186'
    },
    {
      key: 'Bank Address:',
      value:' One M and T Plaza Buffalo, NY 14203 USA'
    },
    {
      key: "Bank's SWIFT Code:",
      value:' MANTUS33'
    },
  ],
  ellipsisLength:3,
  paginationParams:{
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
  },
  withdrawalFees:35 // replace with api/meta_app/app_config
};

