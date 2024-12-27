import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getProducts } from "../../actions/product";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment/moment';

const BestSellingProducts = ({getProducts, product: {products}}) => {

    useEffect(() => {
        getProducts();
    });

    return (
        <React.Fragment>
            <Col xl={6}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Best Selling Products</h4>
                        <div className="flex-shrink-0">
                          
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                        <table className="table table-borderless table-centered align-middle mb-0">
                                <thead className="text-muted table-light">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(products || []).map((item, key) => (key < 10 && <tr key={key}>
                                        <td>
                                            {moment(item.created).format('MMMM Do YYYY')}
                                        </td>
                                        <td><img src={`${process.env.REACT_APP_API_URL}/${item.imageUrl}`} alt="" className="avatar-xs rounded-circle" /></td>
                                        <td>{item.name}</td>
                                        <td>
                                            <span className="text-success">₹ {item.price}</span>
                                        </td>
                                        <td>{item.categoryId?.title}</td>
                                        <td>{item.companyId?.name}</td>
                                       
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



BestSellingProducts.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
   
}

const mapStateToProps = state => ({
    product: state.product,
});

export default connect(mapStateToProps, { getProducts })(BestSellingProducts);

