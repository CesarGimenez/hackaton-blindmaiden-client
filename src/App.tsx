import { Routes as RoutesP, Route, BrowserRouter } from "react-router-dom";

import { Home, Login } from "@pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedLoggedRoute from "./routes/ProtectedLoggedRoute";

function App() {
  return (
    <BrowserRouter>
      <RoutesP>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLoggedRoute>
              <Login />
            </ProtectedLoggedRoute>
          }
        />
      </RoutesP>
    </BrowserRouter>
  );
}

export default App;
