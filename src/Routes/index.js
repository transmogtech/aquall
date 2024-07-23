import React, { useEffect, useState } from 'react';
import { Routes, Route, Router, Navigate } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { loadUser } from '../actions/auth';
const Index = ({ isAuthenticated, loadUser }) => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const response = await loadUser();
            // console.log(response);
            if (response._id) { setActive(true) };
        }
        fetchUser();

    }, []);

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
                                active ? <VerticalLayout>{route.component}</VerticalLayout> : <Navigate to='/login' />

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
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(Index);
