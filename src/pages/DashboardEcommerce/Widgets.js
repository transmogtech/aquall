import React, { useEffect } from 'react';
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { ecomWidgets } from "../../common/data";
import { getProducts } from "../../actions/product";
import { connect } from 'react-redux';
import { getJobs } from "../../actions/job";
import { getOrders } from "../../actions/order";
import { getUsers } from "../../actions/user";
import PropTypes from 'prop-types';

const Widgets = ({ getProducts, product: { products }, getJobs, job: { jobs },getOrders, order: { orders },getUsers, user: { users } }) => {


    useEffect(() => {
        getProducts();
        getJobs();
        getOrders();
        getUsers();
    }, []);

    return (
        <React.Fragment>
         

                <Col xl={3} md={6} key={1}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Products</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix=""
                                            suffix=""
                                            separator=","
                                            end={products.length}
                                            decimals="0"
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="/products" className="text-decoration-underline text-muted">View all products</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded fs-3 bg-success-subtle">
                                        <i className="text-success las la-box"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={3} md={6} key={2}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Orders</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix=""
                                            suffix=""
                                            separator=","
                                            end={orders.length}
                                            decimals="0"
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="/orders" className="text-decoration-underline text-muted">View all orders</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded fs-3 bg-danger-subtle">
                                        <i className="text-danger las la-box"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={3} md={6} key={3}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Customers</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix=""
                                            suffix=""
                                            separator=","
                                            end={users.length}
                                            decimals="0"
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="/users" className="text-decoration-underline text-muted">View all customers</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded fs-3 bg-info-subtle">
                                        <i className="text-info las la-box"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={3} md={6} key={4}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Jobs</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix=""
                                            suffix=""
                                            separator=","
                                            end={jobs.length}
                                            decimals="0"
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="/jobs" className="text-decoration-underline text-muted">View all jobs</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded fs-3 bg-warning-subtle">
                                        <i className="text-warning las la-box"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
        </React.Fragment>
    );
};

Widgets.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    getJobs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    user: state.user,
    order: state.order,
    job: state.job,
});

export default connect(mapStateToProps, { getProducts, getJobs, getOrders, getUsers })(Widgets);