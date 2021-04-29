import axios from "axios";

export const getRestaurants = async (hotels, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/restaurants`,
    { hotels: hotels },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRestaurant = async (id, authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_APIV2}/restaurant/get/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addRestaurant = async (values, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/restaurant/add`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRestaurantsByHotel = async (hotel_code, authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_APIV2}/restaurantOptions/${hotel_code}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateRestaurant = async (id, values, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_APIV2}/restaurant/update/${id}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getHotels = async () => {
  return await axios.get(`${process.env.REACT_APP_APIV2}/get/hotels`);
};
