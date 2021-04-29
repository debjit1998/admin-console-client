import axios from "axios";

export const loginUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/login-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUsers = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/users`, {
    headers: {
      authToken,
    },
  });
};

export const updateUser = async (values, authToken) => {
  return await axios.put(`${process.env.REACT_APP_APIV2}/user/update`, values, {
    headers: {
      authToken,
    },
  });
};

export const saveUser = async (values, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/user/create`,
    values,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const deleteUser = async (id, authToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_APIV2}/user/remove/${id}`,
    {
      headers: {
        authToken,
      },
    }
  );
};
