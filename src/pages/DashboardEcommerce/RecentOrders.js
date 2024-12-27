import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { recentOrders } from '../../common/data';

import { getOrders } from "../../actions/order";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment/moment';
const RecentOrders = ({getOrders, order: { orders}}) => {

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <React.Fragment>
            <Col xl={12}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
                      
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                                <thead className="text-muted table-light">
                                    <tr>
                                    <th scope="col">Created</th>

                                        <th scope="col">Order ID</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(orders || []).map((item, key) => (key < 10 && <tr key={key}>
                                        <td> {moment(item.created).format('MMMM Do YYYY')}</td>

                                        <td>
                                            <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">#{item.orderId}</Link>
                                        </td>
                                        <td>{item.userId?.name}</td>
                                        <td>
                                            <span className="text-success">₹ {item.totalPrice}</span>
                                        </td>
                                        <td>{item.paymentMethod}</td>
                                        <td>
                                        {item.status}
                                        </td>
                                      
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};



RecentOrders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
   
}

const mapStateToProps = state => ({
    order: state.order,
});

export default connect(mapStateToProps, { getOrders })(RecentOrders);

