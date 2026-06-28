import { SearchForm } from "../components/SearchForm";
import { useGitHubUser } from "../contexts/GitHubUserContext";

const Home = () => {
  const {
    currentPage,
    error,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    paginatedRepositories,
    repositories,
    totalPages,
    user,
  } = useGitHubUser();

  return (
    <main className="container py-5">
      <SearchForm />
      {error && (
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}

      {user && (
        <>
          <section className="row justify-content-center mt-4">
            <div className="col-12 col-md-8 col-lg-6">
              <article className="card shadow-sm border-0 text-start">
                <div className="card-body p-4">
                  <div className="d-flex flex-column flex-sm-row gap-4 align-items-center align-items-sm-start">
                    <img
                      src={user.avatar_url}
                      alt={`Avatar de ${user.login}`}
                      className="rounded-circle flex-shrink-0"
                      width="120"
                      height="120"
                    />

                    <div className="w-100">
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
                        <div>
                          <h3 className="h4 fw-bold mb-1 text-dark">
                            {user.name ?? user.login}
                          </h3>
                          <a
                            href={user.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                          >
                            @{user.login}
                          </a>
                        </div>
                      </div>

                      <p className="text-secondary mb-3">
                        {user.bio ?? "Bio não informada."}
                      </p>

                      <dl className="row g-3 mb-0">
                        <div className="col-6">
                          <dt className="text-secondary small fw-normal">
                            Seguidores
                          </dt>
                          <dd className="fs-5 fw-bold text-dark mb-0">
                            {user.followers}
                          </dd>
                        </div>

                        <div className="col-6">
                          <dt className="text-secondary small fw-normal">
                            Seguindo
                          </dt>
                          <dd className="fs-5 fw-bold text-dark mb-0">
                            {user.following}
                          </dd>
                        </div>

                        <div className="col-12">
                          <dt className="text-secondary small fw-normal">
                            E-mail
                          </dt>
                          <dd className="text-dark mb-0">
                            {user.email ?? "E-mail não informado."}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

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
                                {repository.description ??
                                  "Descrição não informada."}
                              </p>
                            </div>

                            <div className="text-sm-end flex-shrink-0">
                              <strong className="d-block text-dark">
                                {repository.stargazers_count}
                              </strong>
                              <span className="text-secondary small">
                                estrelas
                              </span>
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
        </>
      )}
    </main>
  );
};

export default Home;
