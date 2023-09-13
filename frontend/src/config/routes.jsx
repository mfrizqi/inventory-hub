import React, { useEffect, useState } from "react";
// import Axios from 'axios';
// import jwtDecode from 'jwt-decode';
import {
  Route,
  Navigate,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
// import { useQueryClient } from '@tanstack/react-query';
// import { useRefresh } from '../store/auth/mutations';
// // layouts

// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";

// Pages
import DashboardAppPage from "./pages/DashboardAppPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import UserPage from "./pages/UserPage";
import ProductsPage from "./pages/ProductsPage";

// ----------------------------------------------------------------------

const Router = () => {
  // // ** ROUTE HANDLING
  // const queryClient = useQueryClient();
  // const token = queryClient.getQueryData(['accessToken']);
  // const refresh = useRefresh();
  const localFlag = localStorage.getItem("isAuthenticated");
  const [statePermission, setStatePermission] = useState(undefined);
  const [isRefreshDone, setIsRefreshDone] = useState(false);
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token && localFlag) {
  //     refresh.mutate(null, {
  //       onSuccess: (e) => {
  //         setIsRefreshDone(true)
  //         const { accessToken } = e.data.data
  //         Axios.defaults.headers.common = {
  //           Authorization: `Bearer ${accessToken}`,
  //         };
  //         // localStorage.setItem('isAuthenticated', '1');
  //         // const decoded = jwtDecode(accessToken);
  //         // queryClient.setQueryData(['userPermission'], decoded);
  //         // setStatePermission(decoded);
  //       },
  //       onError: () => {
  //         navigate('/login');
  //         localStorage.removeItem('isAuthenticated');
  //       },
  //     });
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (token && localFlag === '1') {
  //     Axios.defaults.headers.common = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     localStorage.setItem('isAuthenticated', '1');
  //     const decoded = jwtDecode(token);
  //     queryClient.setQueryData(['userPermission'], decoded);
  //     setStatePermission(decoded);
  //     setIsRefreshDone(true)
  //   }
  // }, [token, localFlag]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Protected = () => {
    if (!token && !localFlag) return <Navigate to="/" replace />;
    if (pathname === "/docs") return <Outlet />;
    if (pathname === "/setting")
      return <Navigate to="/setting/profile" replace />;
    if (pathname === "/console")
      return <Navigate to="/console/dashboard" replace />;
    return <DashboardLayout />;
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Public = () => {
    if (token) return <Navigate to="/console/dashboard" replace />;
    if (!token && pathname === "/") return <Navigate to="/login" replace />;
    return <Outlet />;
  };

  const checkPermission = (element, key) => {
    if (statePermission?.roles?.includes("super-admin")) return element;
    if (isRefreshDone && key === "public") return element;
    if (
      !statePermission?.roles?.includes("super-admin") &&
      statePermission?.permissions?.includes(key)
    )
      return element;
    return (
      <div className="flex text-center flex-col mt-24">
        {statePermission !== undefined && (
          <>
            <h2 className="mb-0">Access Denied.</h2>
            <p>Sorry, you don&apos;t have permission to access this page</p>
          </>
        )}
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Public />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="" element={<Protected />}>
        <Route path="dashboard" element={<DashboardAppPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<UserPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="404" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
