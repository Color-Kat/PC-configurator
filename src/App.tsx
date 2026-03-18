import React from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "./UI/layout/Layout";

import {
    createBrowserRouter,
} from "react-router-dom";

import Configurator from "@pages/configurator/Configurator";

const router = createBrowserRouter([
    {
        path   : "/PC-configurator",
        element: <Configurator/>,
    },
]);

function App() {

    return (
        <Layout>
            {/*<BrowserRouter router={router} basename="/PC-configurator" />*/}
            <Configurator/>
            {/* Toaster container for react-hot-toast */}
            <Toaster />

        </Layout>
    );
}

export default App;
