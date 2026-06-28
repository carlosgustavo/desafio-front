import { Link } from "react-router-dom";

import {
  type RepositoryOrder,
  useGitHubUser,
} from "../contexts/GitHubUserContext";
import "../styles/RepositoryList.css";

export const RepositoryList = () => {
  const {
    currentPage,
    changeRepositoryOrder,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    paginatedRepositories,
    repositoryOrder,
    repositories,
    totalPages,
    user,
  } = useGitHubUser();

  return (
    <section className="row justify-content-center mt-4">
      <div className="col-12 col-lg-8">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
          <div className="d-flex align-items-center gap-2">
            <h3 className="h4 fw-bold text-dark mb-0">Repositórios</h3>
            <span className="badge text-bg-light">
              {repositories.length} encontrados
            </span>
          </div>

          <label className="d-flex align-items-center gap-2 text-secondary small">
            Ordenar
            <select
              className="form-select form-select-sm"
              value={repositoryOrder}
              onChange={(event) =>
                changeRepositoryOrder(event.target.value as RepositoryOrder)
              }
            >
              <option value="stars_desc">Mais estrelas</option>
              <option value="stars_asc">Menos estrelas</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
            </select>
          </label>
        </div>

        {repositories.length > 0 ? (
          <>
            <div className="d-grid gap-3">
              {paginatedRepositories.map((repository) => (
                <Link
                  to={`/repos/${encodeURIComponent(
                    user?.login ?? "",
                  )}/${encodeURIComponent(repository.name)}`}
                  className="text-decoration-none"
                  key={repository.id}
                >
                  <article className="repository-card card shadow-sm border-0 text-start h-100">
                    <div className="card-body p-4">
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
                        <div>
                          <h4 className="h5 fw-bold mb-2 text-dark">
                            {repository.name}
                          </h4>
                          <p className="text-secondary">
                            {repository.description ??
                              "Descrição não informada."}
                          </p>
                        </div>

                        <div className="text-sm-end flex-shrink-0">
                          <strong className="d-block text-dark">
                            {repository.stargazers_count}
                          </strong>
                          <span className="text-secondary small">estrelas</span>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 mt-3">
                        {repository.language && (
                          <span className="badge text-bg-secondary">
                            {repository.language}
                          </span>
                        )}
                        <span className="badge text-bg-light">
                          {repository.forks_count} forks
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mt-4">
              <span className="text-secondary small">
                Página {currentPage} de {totalPages}
              </span>

              <div
                className="btn-group"
                role="group"
                aria-label="Paginação de repositórios"
              >
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage}
                >
                  Anterior
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={goToNextPage}
                  disabled={!hasNextPage}
                >
                  Próxima
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-secondary mb-0" role="status">
            Nenhum repositório público encontrado.
          </div>
        )}
      </div>
    </section>
  );
  
};

