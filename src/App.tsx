import {Layout} from "./UI/layout/Layout";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!👨🏻</div>,
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
