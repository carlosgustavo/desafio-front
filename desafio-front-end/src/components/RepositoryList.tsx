import { useGitHubUser } from "../contexts/GitHubUserContext";

export const RepositoryList = () => {
  const {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    paginatedRepositories,
    repositories,
    totalPages,
  } = useGitHubUser();

  return (
    <section className="row justify-content-center mt-4">
      <div className="col-12 col-lg-8">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h4 fw-bold text-dark mb-0">Repositórios</h3>
          <span className="badge text-bg-light">
            {repositories.length} encontrados
          </span>
        </div>

        {repositories.length > 0 ? (
          <>
            <div className="d-grid gap-3">
              {paginatedRepositories.map((repository) => (
                <article
                  className="card shadow-sm border-0 text-start"
                  key={repository.id}
                >
                  <div className="card-body p-4">
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
                      <div>
                        <h4 className="h5 fw-bold mb-2">
                          <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-dark text-decoration-none"
                          >
                            {repository.name}
                          </a>
                        </h4>
                        <p className="text-secondary">
                          {repository.description ?? "Descrição não informada."}
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
