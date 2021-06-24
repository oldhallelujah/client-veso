import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../auth/auth";

const url = "https://ve-so-nhat-tien.herokuapp.com/api";
const getUserID = () => {
  const token = localStorage.getItem("userToken");
  if (token != null) {
    const tokenJSON = JSON.parse(localStorage.userToken);
    const refreshToken = tokenJSON.refreshToken;
    const accessToken = tokenJSON.accessToken;
    const decoded = jwt_decode(accessToken);
    return decoded.data._id;
  }
};

export const getProfile = async () => {
  const userID = getUserID();
  return await axios
    .get(`${url}/get-profile/${userID}`, {
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

export const updatePassword = async (data) => {
  return await axios
    .post(`${url}/update-password`, data, {
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
