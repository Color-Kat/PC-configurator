import {Layout} from "./UI/layout/Layout";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Configurator from "@pages/configurator/Configurator";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Configurator />,
    },
]);

function App() {

  return (
      <Layout>
          <RouterProvider router={router} />
      </Layout>
  );
}

export default App;
