import axiosClient from "./axiosClient";

const fetchMatchsAPI = (search = "", type) => {
  const url = "/matchs";
  return axiosClient.get(url, { params: { search: search, type: type } });
};

const getMatchByIdAPI = (id) => {
  const url = `/matchs/${id}`;
  return axiosClient.get(url, { params: {} });
};

const generateTeamAPI = (data) => {
  const url = "/matchs/team";
  return axiosClient.post(url, data);
};

const createMatchAPI = (matchInfo) => {
  const url = "/matchs";
  return axiosClient.post(url, matchInfo);
};

const deleteMatchAPI = (id) => {
  const url = "/matchs/" + id;
  return axiosClient.delete(url);
};

const editMatchAPI = (id, formData) => {
  const url = "/matchs/" + id;
  return axiosClient.put(url, formData);
};

const setTeamWinAPI = (id, teamWin) => {
  const url = "/matchs/set-team-win/" + id;
  return axiosClient.put(url, { teamWin: teamWin });
};

export {
  fetchMatchsAPI,
  getMatchByIdAPI,
  generateTeamAPI,
  createMatchAPI,
  deleteMatchAPI,
  editMatchAPI,
  setTeamWinAPI,
};
