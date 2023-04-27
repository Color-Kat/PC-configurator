import {Layout} from "./UI/layout/Layout";

import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Configurator from "@pages/configurator/Configurator";

const router = createBrowserRouter([
    {
        path: "/PC-configurator",
        element: <Configurator />,
    },
]);

function App() {

  return (
      <Layout>
          {/*<BrowserRouter router={router} basename="/PC-configurator" />*/}
          <Configurator />
      </Layout>
  );
}

export default App;
