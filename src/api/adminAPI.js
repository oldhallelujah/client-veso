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
