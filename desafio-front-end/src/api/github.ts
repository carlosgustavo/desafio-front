import axios from "axios";

export type GitHubUser = {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  email: string | null;
  bio: string | null;
};

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const getGitHubUser = async (username: string) => {
  const { data } = await api.get<GitHubUser>(
    `/users/${encodeURIComponent(username)}`,
  );

  return data;
};
