import axios from "axios";
import { BASE_URL } from "./base_url";

//GET ALL EMPLOYEES

export const getAllEmployees = async () => {
  let globalData;
  await axios.get(`${BASE_URL}/employees`).then((res) => {
    globalData = res.data;
  });
  return globalData;
};

//GET EMPLOYEE BY ID
export const getEmployeeByID = async (id) => {
  let globalData;
  await axios.get(`${BASE_URL}/employees/${id}`).then((res) => {
    globalData = res.data;
  });
  return globalData;
};

//POST EMPLOYEE
export const postEmployee = async (payload) => {
  await axios.post(`${BASE_URL}/employees`, payload);
};

//PUT EMPLOYEE
export const putEmployee = async (id, payload) => {
  axios.put(`${BASE_URL}/employees/${id}`, payload);
};
//DELETE EMPLOYEE BY ID
export const deleteEmployeeByID = async (id) => {
  axios.delete(`${BASE_URL}/employees/${id}`);
};
