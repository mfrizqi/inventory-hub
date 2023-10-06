import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
// layouts
import DashboardLayout from "../material-kit/layouts/dashboard";
// import SimpleLayout from "./layouts/simple";
// private route
// import PrivateRoute from "./PrivateRoute";
// import BlogPage from "./pages/BlogPage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import Page404 from "../pages/Page404";
import ProductsPage from "../pages/ProductsPage";
import DashboardAppPage from "../pages/DashboardAppPage";

// ----------------------------------------------------------------------
// const isTokenValid = (token) => {
//   try {
//     // Your token validation logic here
//     const decodedToken = jwt.verify(token, 'your-secret-key');
//     // Additional validation checks, if needed
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// const isAuthenticated = false

const Router = () => {
  const { pathname } = useLocation();

  const Public = () => {
    const account = window.localStorage.getItem("account");
    if (!account && pathname === "/") return <Navigate to="/login" replace />;
    return <Outlet />;
  };

  const Protected = () => {
    // if (!token && !localFlag) return <Navigate to="/" replace />;
    // if (pathname === "/docs") return <Outlet />;
    // if (pathname === "/setting")
    //   return <Navigate to="/setting/profile" replace />;
    // if (pathname === "/console")
    //   return <Navigate to="/console/dashboard" replace />;
    const account = window.localStorage.getItem("roles");
    console.log(account);
    if (!account) return <Navigate to="/login" replace />;
    return <DashboardLayout />;
  };

  const CheckRoles = (element, roles) => {
    const account = window.localStorage.getItem("roles");
    if (!roles.includes(account)) return <Navigate to="/overview" replace/>;
    return element
  };

  return (
    <Routes>
      <Route path="/" element={<Public />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="" element={<Protected />}>
        <Route path="overview" element={CheckRoles(<DashboardAppPage />, ['admin','user'])} />
        <Route path="products" element={CheckRoles(<ProductsPage />, ['admin','user'])} />
        <Route path="users" element={CheckRoles(<UserPage />, ['admin'])} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="404" element={<Page404 />} />
    </Routes>
  );

  // Old Routes
  // const routes = useRoutes([
  //   {
  //     path: "/",
  //     element: <DashboardLayout/>,
  //     children: [
  //       { element: <Navigate to="/overview" />, index: true },
  //       { path: "overview", element: <DashboardAppPage /> },
  //       { path: "users", element: <UserPage /> },
  //       { path: "products", element: <ProductsPage /> },
  //       // { path: "blog", element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: "login",
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: "404", element: <Page404 /> },
  //       { path: "*", element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);
  // return routes;
};

export default Router;
