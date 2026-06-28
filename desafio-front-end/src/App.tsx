import { GitHubUserProvider } from "./contexts/GitHubUserContext";
import Home from "./pages/Home";

function App() {
  return (
    <GitHubUserProvider>
      <Home />
    </GitHubUserProvider>
  );
}

export default App;
