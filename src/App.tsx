import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GitHubUserProvider } from "./contexts/GitHubUserContext";
import Home from "./pages/Home";
import RepositoryDetails from "./pages/RepositoryDetails";

function App() {
  return (
    <BrowserRouter>
      <GitHubUserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/repos/:owner/:repositoryName"
            element={<RepositoryDetails />}
          />
        </Routes>
      </GitHubUserProvider>
    </BrowserRouter>
  );
}

export default App;
