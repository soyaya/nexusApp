import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { appRoutes } from "@/routes";

/**
 * Renders the matched route tree. Must live inside <Router> so that
 * useRoutes() has access to the routing context.
 */
function AppRoutes() {
  return useRoutes(appRoutes);
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
