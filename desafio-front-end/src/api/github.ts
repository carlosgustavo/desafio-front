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

export type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
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

export const getGitHubUserRepositories = async (username: string) => {
  const { data } = await api.get<GitHubRepository[]>(
    `/users/${encodeURIComponent(username)}/repos`,
    {
      params: {
        per_page: 100,
      },
    },
  );

  return data;
};
