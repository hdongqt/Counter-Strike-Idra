import axiosClient from "./axiosClient";

const fetchUsersAPI = (search = "") => {
  const url = "/users";
  return axiosClient.get(url, { params: { search: search } });
};

const getUserByIdAPI = (id) => {
  const url = `/users/${id}`;
  return axiosClient.get(url, { params: {} });
};

const deleteUserAPI = (id) => {
  const url = "/users/" + id;
  return axiosClient.delete(url);
};

const createUserAPI = (formData) => {
  const url = "/users";
  return axiosClient.post(url, formData);
};

const editUserAPI = (id, formData) => {
  const url = "/users/" + id;
  return axiosClient.put(url, formData);
};

export { fetchUsersAPI, getUserByIdAPI, deleteUserAPI, createUserAPI, editUserAPI };
