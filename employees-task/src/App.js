import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES";
import { FavoritesContext } from "./context";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <FavoritesContext.Provider>
      <>
        <RouterProvider router={routes} />
      </>
    </FavoritesContext.Provider>
  );
}

export default App;