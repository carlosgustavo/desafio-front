import { SearchForm } from "../components/SearchForm";
import { useGitHubUser } from "../contexts/GitHubUserContext";

const Home = () => {
  const { error, user } = useGitHubUser();

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
      )}
    </main>
  );
};

export default Home;
