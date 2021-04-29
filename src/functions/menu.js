import axios from "axios";

export const getMenuForRestaurant = async (id, authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_APIV2}/restaurantMenu/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addMenuItem = async (values, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_APIV2}/menu/add`, values, {
    headers: {
      authtoken,
    },
  });
};

export const removeMenuItem = async (id, restaurant_id, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_APIV2}/menu/remove/${id}`,
    {
      headers: {
        authtoken,
        restaurant_id,
      },
    }
  );
};

export const getMenuItem = async (id, authtoken) => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/menu/get/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateMenuItem = async (id, values, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_APIV2}/menu/update/${id}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};
