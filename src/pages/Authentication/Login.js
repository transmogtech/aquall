import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { setAlert } from '../../actions/alert';

import { login } from "../../actions/auth";
//redux
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, Navigate } from "react-router-dom";
// import withRouter from "../../Components/Common/withRouter";
import Alert from "../../Components/Common/Alert";


// actions
// import { loginUser, socialLogin, resetLoginFlag } from "../../slices/thunks";

import logoLight from "../../assets/images/aquall_logo.png";
//import images

const Login = ({ setAlert, login, isAuthenticated }) => {
    const [passwordShow, setPasswordShow] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const token = localStorage.getItem('token');

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === "") {
            setAlert("Please enter email address", "danger");
        }
        else if (password === "") {
            setAlert("Please enter password", "danger");
        } else {
            login(email, password);
        }

    }

    if (isAuthenticated && token) {
        return <Navigate to="/dashboard" />
    }

    document.title = "Login | Aquall -  Admin";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <Link to="/" className="d-inline-block auth-logo">
                                                <img src={logoLight} alt="" height="120" />
                                            </Link>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    onSubmit(e);
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Mobile number</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter mobile number"
                                                        type="number"
                                                        onChange={onChange}
                                                    // onBlur={validation.handleBlur}
                                                    // value={validation.values.email || ""}
                                                    // invalid={
                                                    //     validation.touched.email && validation.errors.email ? true : false
                                                    // }
                                                    />
                                                    {/* {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null} */}
                                                </div>

                                                <div className="mb-3">
                                                    {/* <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div> */}
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            // value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={onChange}
                                                        // onChange={validation.handleChange}
                                                        // onBlur={validation.handleBlur}
                                                        // invalid={
                                                        //     validation.touched.password && validation.errors.password ? true : false
                                                        // }
                                                        />
                                                        {/* {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null} */}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>


                                                <div className="mt-4">
                                                    <Button color="success" className="btn btn-success w-100" type="submit">
                                                        {/* {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null} */}
                                                        Sign In
                                                    </Button>
                                                </div>

                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>


                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};
Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, login })(Login);