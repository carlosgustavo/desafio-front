export const SearchForm = () => {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2
              className="text-center fw-bold mb-2"
              style={{ color: "#131313" }}
            >
              Buscar usuário
            </h2>

            <p className="text-center mb-4" style={{ color: "#7A7A7A" }}>
              Digite o nome de um usuário do GitHub.
            </p>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ex: octocat"
              />

              <button className="btn btn-danger px-4" type="button">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
