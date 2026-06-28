import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getGitHubRepository,
  type GitHubRepository,
} from "../api/github";
import { useGitHubUser } from "../contexts/GitHubUserContext";

const RepositoryDetails = () => {
  const { owner, repositoryName } = useParams<{
    owner: string;
    repositoryName: string;
  }>();
  const { repositories } = useGitHubUser();
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!owner || !repositoryName) {
      setError("Repositório não informado.");
      return;
    }

    const repositoryFromState = repositories.find((currentRepository) => {
      return currentRepository.name === repositoryName;
    });

    if (repositoryFromState) {
      setRepository(repositoryFromState);
      setError("");
      return;
    }

    const loadRepository = async () => {
      setIsLoading(true);
      setError("");

      try {
        const githubRepository = await getGitHubRepository(
          owner,
          repositoryName,
        );
        setRepository(githubRepository);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("Repositório não encontrado.");
          return;
        }

        setError("Não foi possível carregar os detalhes do repositório.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadRepository();
  }, [owner, repositoryName, repositories]);

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <Link to="/" className="btn btn-outline-secondary mb-4">
            Voltar
          </Link>

          {isLoading && (
            <div className="alert alert-info mb-0" role="status">
              Carregando repositório...
            </div>
          )}

          {error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          {repository && !isLoading && !error && (
            <article className="card shadow-sm border-0 text-start">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-3">
                  <div>
                    <h1 className="h3 fw-bold text-dark mb-2">
                      {repository.name}
                    </h1>
                    <p className="text-secondary">
                      {repository.description ?? "Descrição não informada."}
                    </p>
                  </div>

                  <div className="text-sm-end flex-shrink-0">
                    <strong className="d-block fs-4 text-dark">
                      {repository.stargazers_count}
                    </strong>
                    <span className="text-secondary small">estrelas</span>
                  </div>
                </div>

                <dl className="row g-3 mb-4">
                  <div className="col-12 col-sm-6">
                    <dt className="text-secondary small fw-normal">
                      Linguagem
                    </dt>
                    <dd className="text-dark mb-0">
                      {repository.language ?? "Não informada"}
                    </dd>
                  </div>

                  <div className="col-12 col-sm-6">
                    <dt className="text-secondary small fw-normal">Forks</dt>
                    <dd className="text-dark mb-0">
                      {repository.forks_count}
                    </dd>
                  </div>
                </dl>

                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-danger"
                >
                  Abrir no GitHub
                </a>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
};

export default RepositoryDetails;
