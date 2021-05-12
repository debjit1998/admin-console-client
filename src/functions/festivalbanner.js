import axios from "axios";

export const createBanner = async (values, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/AddFestiveMenu`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllBanners = async (hotelArr, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_APIV2}/GetFestiveMenus`,
    { hotelArr },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateFestiveBanner = async (values, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_APIV2}/UpdateFestiveMenu`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeFestiveBanner = async (id, festival_name, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_APIV2}/RemoveFestiveMenu/${id}`,
    {
      headers: {
        festival_name,
        authtoken,
      },
    }
  );
};
