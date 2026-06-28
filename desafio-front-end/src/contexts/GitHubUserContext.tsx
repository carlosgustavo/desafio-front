import axios from "axios";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { getGitHubUser, type GitHubUser } from "../api/github";

type GitHubUserState = {
  user: GitHubUser | null;
  isLoading: boolean;
  error: string;
};

type GitHubUserContextValue = GitHubUserState & {
  searchUser: (username: string) => Promise<void>;
};

type GitHubUserAction =
  | { type: "search_started" }
  | { type: "search_succeeded"; payload: GitHubUser }
  | { type: "search_failed"; payload: string };

const initialState: GitHubUserState = {
  user: null,
  isLoading: false,
  error: "",
};

const GitHubUserContext = createContext<GitHubUserContextValue | null>(null);

const githubUserReducer = (
  state: GitHubUserState,
  action: GitHubUserAction,
): GitHubUserState => {
  switch (action.type) {
    case "search_started":
      return {
        ...state,
        user: null,
        isLoading: true,
        error: "",
      };
    case "search_succeeded":
      return {
        user: action.payload,
        isLoading: false,
        error: "",
      };
    case "search_failed":
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const GitHubUserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubUserReducer, initialState);

  const searchUser = useCallback(async (username: string) => {
    dispatch({ type: "search_started" });

    try {
      const githubUser = await getGitHubUser(username);
      dispatch({ type: "search_succeeded", payload: githubUser });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        dispatch({ type: "search_failed", payload: "Usuário não encontrado." });
        return;
      }

      dispatch({
        type: "search_failed",
        payload: "Não foi possível buscar o usuário. Tente novamente.",
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      searchUser,
    }),
    [state, searchUser],
  );

  return (
    <GitHubUserContext.Provider value={value}>
      {children}
    </GitHubUserContext.Provider>
  );
};

export const useGitHubUser = () => {
  const context = useContext(GitHubUserContext);

  if (!context) {
    throw new Error("useGitHubUser deve ser usado dentro de GitHubUserProvider");
  }

  return context;
};
