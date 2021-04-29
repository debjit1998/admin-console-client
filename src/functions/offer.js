import axios from "axios";

export const getAllOffers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/offers`, {
    headers: {
      authtoken,
    },
  });
};

export const addOffer = async (values, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_APIV2}/offer/add`, values, {
    headers: {
      authtoken,
    },
  });
};

export const removeOffer = async (id, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_APIV2}/offer/remove/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOffer = async (id, authtoken) => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/offer/get/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateOffer = async (id, values, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_APIV2}/offer/update/${id}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};
