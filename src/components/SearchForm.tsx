import { type FormEvent, useState } from "react";

import { useGitHubUser } from "../contexts/GitHubUserContext";

export const SearchForm = () => {
  const [username, setUsername] = useState("");
  const { isLoading, searchUser } = useGitHubUser();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      return;
    }

    void searchUser(trimmedUsername);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2
              className="text-center fw-bold mb-2"
            >
              Buscar usuário
            </h2>

            <p className="text-center mb-4" style={{ color: "#7A7A7A" }}>
              Digite o nome de um usuário do GitHub.
            </p>

            <form className="input-group" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: carlosgustavo"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                disabled={isLoading}
              />

              <button
                className="btn btn-danger px-4"
                type="submit"
                disabled={isLoading || !username.trim()}
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
