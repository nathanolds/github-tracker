import axios from "axios";

export const getAllRepos = async (username) => {
  const result = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  const { data } = await result;
  return data;
};

export const getDetailsFromAxios = async (repoName, username) => {
  const result = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const { data } = await result;
  return data;
};

export const getUserInfo = async (username) => {
  const result = await axios.get(`https://api.github.com/users/${username}`);
  const { data } = await result;
  console.log(data);
  return data;
};
