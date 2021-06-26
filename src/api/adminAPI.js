import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../auth/auth";
const url = "https://ve-so-nhat-tien.herokuapp.com/api";

export const getAllStore = async () => {
  return await axios
    .get(`${url}/get-all-store`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createStore = async (data) => {
  console.log(data);
  return await axios
    .post(`${url}/create-store`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDetailsStore = async (storeID) => {
  return await axios
    .get(`${url}/get-details-store/${storeID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateActiveStore = async (data) => {
  return await axios
    .post(`${url}/update-active-store`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStaff = async () => {
  return await axios
    .get(`${url}/get-staff`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDetailsStaff = async (staffID) => {
  return await axios
    .get(`${url}/get-staff/${staffID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addStaffStore = async (data) => {
  return await axios
    .post(`${url}/add-staff-store`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createStaff = async (data) => {
  return await axios
    .post(`${url}/create-account`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const blockUser = async (data) => {
  return await axios
    .post(`${url}/block-user`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const unblockUser = async (data) => {
  return await axios
    .post(`${url}/unblock-user`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSchedule = async (ownerID) => {
  return await axios
    .get(`${url}/get-schedule/${ownerID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addSchedule = async (data) => {
  console.log(data);
  return await axios
    .post(`${url}/add-schedule/`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeSchedule = async (data) => {
  return await axios
    .post(`${url}/remove-schedule/`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllCustomer = async (ownerID) => {
  return await axios
    .get(`${url}/get-all-customer`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getConfig = async (data) => {
  return await axios
    .get(`${url}/get-config`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const statisticStore = async (data) => {
  return await axios
    .get(`${url}/statistic-store`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const detailsStatisticStore = async (storeID) => {
  console.log(storeID);
  return await axios
    .get(`${url}/details-statistic-store/${storeID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const detailsStatisticCustomer = async (customerID) => {
  return await axios
    .get(`${url}/details-statistic-customer/${customerID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateConfigPoint = async (data) => {
  return await axios
    .post(`${url}/update-config-point`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateConfigGift = async (data) => {
  return await axios
    .post(`${url}/update-config-gift`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const statisticGift = async () => {
  return await axios
    .get(`${url}/statistic-gift`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updatePasswordStaff = async (data) => {
  return await axios
    .post(`${url}/update-password-staff`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addSearchPoint = async (data) => {
  return await axios
    .post(`${url}/add-search-point`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSearchPoint = async () => {
  return await axios
    .get(`${url}/get-search-point`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateSearchPoint = async (data) => {
  return await axios
    .post(`${url}/update-search-point`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteSearchPoint = async (data) => {
  return await axios
    .post(`${url}/delete-search-point`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
