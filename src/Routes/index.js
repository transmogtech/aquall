import React from 'react';
import { Routes, Route, Router, Navigate } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from './AuthProtected';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Index = ({ isAuthenticated }) => {
const token = localStorage.getItem('token');

return (
        <React.Fragment>
                <Routes>
                    <Route>
                        {publicRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <NonAuthLayout>
                                        {route.component}
                                    </NonAuthLayout>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))}
                    </Route>

                    <Route>
                        {authProtectedRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    token ? <VerticalLayout>{route.component}</VerticalLayout> : <Navigate to='/login'/>
                                        
                                    // </AuthProtected>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))}
                    </Route>
                </Routes>
        </React.Fragment>
    );
};
Index.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Index);
