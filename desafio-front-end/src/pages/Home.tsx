import { RepositoryList } from "../components/RepositoryList";
import { SearchForm } from "../components/SearchForm";
import { UserDetails } from "../components/UserDetails";
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
        <>
          <UserDetails user={user} />
          <RepositoryList />
        </>
      )}
    </main>
  );
};

export default Home;
