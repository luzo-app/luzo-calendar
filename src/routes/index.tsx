import React, { Suspense } from "react";

import {
    RouterProvider,
    createBrowserRouter,
} from "react-router";

import Loader from "@/components/ui/loader";

import { routes } from "@/data";

// Public Page
const NotFoundPage = React.lazy(() => import('@/views/error/not-found'));

// Guest Pages
const HomePage = React.lazy(() => import('@/views/home'));

const Routes = () => {
    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ];

    // Define routes accessible only to guest users
    const routesForAuthenticatedOnly = [
        {
            path: routes.HOME,
            children: [
                {
                    path: routes.HOME,
                    element:
                        <Suspense
                            fallback={
                                <Loader className="absolute top-1/3 left-1/2" />
                            }
                        >
                            <HomePage />
                        </Suspense>,
                },
            ]
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;











// ROUTES WITH AUTHENTICATION

// import React, { Suspense } from "react";

// import {
//     RouterProvider,
//     createBrowserRouter,
// } from "react-router";

// import { useAuth } from "@/hooks/use-auth";

// import Loader from "@/components/ui/loader";

// import { routes } from "@/data";

// // Protected route
// import { ProtectedRoute } from "./protected-route";

// // Public Page
// const NotFoundPage = React.lazy(() => import('@/views/error/not-found'));

// // Guest Pages
// const HomePage = React.lazy(() => import('@/views/home'));

// const Routes = () => {
//     const { token } = useAuth();

//     // Define public routes accessible to all users
//     const routesForPublic = [
//         {
//             path: "*",
//             element: <NotFoundPage />,
//         },
//         // {
//         //     path: publicRoutes.LOGOUT,
//         //     element: <LogoutPage />,
//         // },
//     ];

//     // Define routes accessible only to non-authenticated users
//     const routesForNotAuthenticatedOnly = [
//         {
//             path: routes.HOME,
//             children: [
//                 {
//                     path: routes.HOME,
//                     element: <NotFoundPage />,
//                 },
//             ]
//         }
//     ];

//     // Define routes accessible only to guest users
//     const routesForAuthenticatedOnly = [
//         {
//             path: routes.HOME,
//             element: <ProtectedRoute />,
//             children: [
//                 {
//                     path: routes.HOME,
//                     element:
//                         <Suspense
//                             fallback={
//                                 <Loader className="absolute top-1/3 left-1/2" />
//                             }
//                         >
//                             <HomePage />
//                         </Suspense>,
//                 },
//             ]
//         }
//     ];

//     // Combine and conditionally include routes based on authentication status
//     const router = createBrowserRouter([
//         ...routesForPublic,
//         ...(!token ? routesForNotAuthenticatedOnly : []),
//         ...routesForAuthenticatedOnly,
//     ]);

//     // Provide the router configuration using RouterProvider
//     return <RouterProvider router={router} />;
// };

// export default Routes;