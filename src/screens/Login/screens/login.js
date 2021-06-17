import axios from "axios";
import { getRole } from "../../../auth/auth";
const url = "https://ve-so-nhat-tien.herokuapp.com/api";
export const login = async (data) => {
  return await axios
    .post(`${url}/login`, {
      username: data.username,
      password: data.password,
    })
    .then(async (res) => {
      const token = {
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      };

      localStorage.setItem("userToken", JSON.stringify(token));
      localStorage.setItem(
        "schedule",
        JSON.stringify(res.data.data.checkSchedule)
      );

      let role;
      await getRole().then((user) => {
        role = user;
      });
      return role;
    })
    .catch((error) => {
      console.log(error);
    });
};
