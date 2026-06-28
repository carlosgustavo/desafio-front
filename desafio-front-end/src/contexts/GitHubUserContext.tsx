import axios from "axios";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import {
  getGitHubUser,
  getGitHubUserRepositories,
  type GitHubRepository,
  type GitHubUser,
} from "../api/github";

const REPOSITORIES_PER_PAGE = 5;

type GitHubUserState = {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  currentPage: number;
  isLoading: boolean;
  error: string;
};

type GitHubUserContextValue = GitHubUserState & {
  paginatedRepositories: GitHubRepository[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  searchUser: (username: string) => Promise<void>;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

type GitHubUserAction =
  | { type: "search_started" }
  | {
      type: "search_succeeded";
      payload: {
        user: GitHubUser;
        repositories: GitHubRepository[];
      };
    }
  | { type: "search_failed"; payload: string }
  | { type: "next_page" }
  | { type: "previous_page" };

const initialState: GitHubUserState = {
  user: null,
  repositories: [],
  currentPage: 1,
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
        repositories: [],
        currentPage: 1,
        isLoading: true,
        error: "",
      };
    case "search_succeeded":
      return {
        user: action.payload.user,
        repositories: action.payload.repositories,
        currentPage: 1,
        isLoading: false,
        error: "",
      };
    case "search_failed":
      return {
        user: null,
        repositories: [],
        currentPage: 1,
        isLoading: false,
        error: action.payload,
      };
    case "next_page": {
      const totalPages = Math.max(
        1,
        Math.ceil(state.repositories.length / REPOSITORIES_PER_PAGE),
      );

      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, totalPages),
      };
    }
    case "previous_page":
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 1),
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
      const [githubUser, repositories] = await Promise.all([
        getGitHubUser(username),
        getGitHubUserRepositories(username),
      ]);

      dispatch({
        type: "search_succeeded",
        payload: {
          user: githubUser,
          repositories,
        },
      });
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

  const goToNextPage = useCallback(() => {
    dispatch({ type: "next_page" });
  }, []);

  const goToPreviousPage = useCallback(() => {
    dispatch({ type: "previous_page" });
  }, []);

  const value = useMemo(
    () => {
      const totalPages = Math.max(
        1,
        Math.ceil(state.repositories.length / REPOSITORIES_PER_PAGE),
      );
      const startIndex = (state.currentPage - 1) * REPOSITORIES_PER_PAGE;
      const paginatedRepositories = state.repositories.slice(
        startIndex,
        startIndex + REPOSITORIES_PER_PAGE,
      );

      return {
        ...state,
        paginatedRepositories,
        totalPages,
        hasNextPage: state.currentPage < totalPages,
        hasPreviousPage: state.currentPage > 1,
        searchUser,
        goToNextPage,
        goToPreviousPage,
      };
    },
    [state, searchUser, goToNextPage, goToPreviousPage],
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
