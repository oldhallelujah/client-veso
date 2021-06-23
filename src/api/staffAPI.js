import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../auth/auth";
const url = "https://ve-so-nhat-tien.herokuapp.com/api";

export const getUserID = () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(accessToken);
    return decoded.data._id;
  }
};

export const addCustomer = async (data) => {
  return await axios
    .post(`${url}/add-customer`, data, {
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
export const addDeal = async (data) => {
  return await axios
    .post(`${url}/add-deal`, data, {
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

export const addGift = async (data) => {
  return await axios
    .post(`${url}/use-point`, data, {
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
