import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logout } from "../../actions/auth";


//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";
import { createSelector } from "reselect";

const Logout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());

  }, [dispatch]);

    return <Navigate to="/login" />;


  return <></>;
};


export default Logout;