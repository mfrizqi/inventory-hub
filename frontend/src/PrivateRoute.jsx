import { Outlet, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ 
  isAuthenticated
}) => (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
