import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "*",
                element: <div>
                    <h1>404 Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            }
        ]
    }
])

export default router;