import { routes } from "../../../constants/routes";

export const data = [
  {
    title: "DriveWealth's ",
    subTitle: "Terms Of Use",
    name: "termsOfUse",
    link: "https://legal.drivewealth.com/terms-of-use",
  },
  {
    title: "DriveWealth's ",
    subTitle: "Customer Agreement",
    name: "customerAgreement",
    link: "https://legal.drivewealth.com/customer-account-agreement",
  },
  {
    title: "DriveWealth's ",
    subTitle: "Market Data Agreement",
    name: "marketDataAgreement",
    link: "https://legal.drivewealth.com/bats-subscriber-agreement",
  },
  {
    title: "",
    subTitle: "DriveWealth's Privacy Policy",
    name: "privacyPolicy",
    link: "https://legal.drivewealth.com/privacy-policy",
  },
  {
    title: `Rule 14b-1(c) of the Securities Exchange Act, unless you object, requires us to     
        disclose to an issuer, upon its request, the names, addresses, and securities positions 
        of our  customers who are beneficial owners of the issuer's securities held by us in  
        nominee name. The issuer would be permitted to use your name and other related 
        information for corporation communication only. `,
    name: "rule14b",
  },
  {
    title: `DriveWealth's Data Sharing Acceptance`,
    checkBox: `New Services, Promotional, and Marketing Consent`,
    name: "dataSharing",
  },
];

export const advisorDisclosures = [
  {
    title: "Disclosure 1",
    link: routes.authRoutes.advisorKycDisclosureLink,
  },
  {
    title: "Disclosure 2",
    link: routes.authRoutes.advisorKycDisclosureLink,
  },
  {
    title: "Disclosure 3",
    link: routes.authRoutes.advisorKycDisclosureLink,
  },
];
