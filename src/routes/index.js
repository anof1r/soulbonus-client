import {
    createBrowserRouter,
} from "react-router-dom";

const Org = lazy(() => import("./pages/Org"));
const Client = lazy(() => import("./pages/Client"));
const Connection = lazy(() => import("./pages/Connection"));





export const router = createBrowserRouter([
    {
    path: "/",
    element: <MainMenu />,
    }, 
    {
    path: "/orgnization",
    element: <Org />,
    },
    {
    path: "/client",
    element: <Client />,
    },
    {
    path: "/connection",
    element: <Connection />,
    },
]);