import Notification from "../../sharedComponents/Notification";

export const getPostalCode = (
  connectWithApi,
  countryCode3,
  searchText,
  setPincode,
  setFetching
) => {
  const params = `ordering=code&country__code3=${countryCode3}&search=${searchText}`;
  connectWithApi()
    .getPostalCode(params)
    .then((res) => {
      if (res.data) {
        const response = res.data;
        const postalCode = [
          ...new Map(
            response.map((item) => [item.code, { ...item, nameStr: item.name }])
          ).values(),
        ];
        setFetching(false);
        setPincode(postalCode);
      }
    })
    .catch((error) => {
      Notification({ type: "error", content: error.message });
    });
};

export const populateStateCity = (val, key, initialValues, form) => {
  if (key !== undefined) {
    initialValues["postal_code_list"] = {
      id: key.id,
      name: key.name,
      region_name: key.region_name,
      city: key.city,
      region: key.region,
      district_name: key.district_name,
      code: key.value,
    };
    form.setFieldsValue({
      city: key.city === null ? key.district_name : key.city,
      state: key.region_name,
    });
    initialValues["city"] = {
      region: key.region,
      name_std: key.city === null ? key.district_name : key.city,
    };
    initialValues["state"] = {
      name_std: key.region_name,
    };
    return initialValues;
  }
};
