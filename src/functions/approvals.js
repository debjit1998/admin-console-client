import axios from "axios";

export const getPendingApprovals = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/GetPendingApprovals`, {
    headers: {
      authtoken,
    },
  });
};

export const addApproval = async (values, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_APIV2}/AddApproval`, values, {
    headers: {
      authtoken,
    },
  });
};
