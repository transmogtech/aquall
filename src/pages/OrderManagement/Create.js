import React, { useEffect, useState } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useNavigate } from 'react-router-dom';
import { getProducts } from "../../actions/product";
import { getUsers } from "../../actions/user";
import { createOrder } from '../../actions/order';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from "uuid";

const CreateOrder = ({ getProducts, getUsers, createOrder, product: { products }, user: { users } }) => {

    useEffect(() => {
        getProducts();
        getUsers();
    }, []);

    const Products = [];
    const Customers = [];

    products.forEach(row => Products.push({ value: row._id, label: row.name }));
    users.forEach(row => Customers.push({ value: row._id, label: row.name }));


    const statusOptions = [
        { label: "Status", value: "" },
        { label: "Pending", value: "Pending" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Pickups", value: "Pickups" },
        { label: "Returns", value: "Returns" },
        { label: "Delivered", value: "Delivered" },
    ];


    const orderpayement = [
        { label: "Mastercard", value: "Mastercard" },
        { label: "Paypal", value: "Paypal" },
        { label: "Visa", value: "Visa" },
        { label: "COD", value: "COD" },

    ];
    const unique_id = uuid();

    const [formData, setFormData] = useState({ orderId: unique_id });
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);

    };

    const handleSubmit = () => {
        setFormData({ ...formData, orderId: unique_id });


        createOrder(formData);

        navigate('/orders');
    }

    document.title = "Create Order | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Order" pageTitle="Order Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Order" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Product</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="productId"
                                                            onChange={e => onChange(e)}
                                                        >
                                                            <option value="">Select Product</option>
                                                            {
                                                                Products.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.value}>{item.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Customer</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="userId"
                                                            onChange={e => onChange(e)}
                                                        >
                                                            <option value="">Select Customer</option>
                                                            {
                                                                Customers.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.value}>{item.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Amount</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="amount" placeholder="Order Name" />
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Payment Method</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="paymentMethod"
                                                            onChange={e => onChange(e)}
                                                        >
                                                            <option value="">Select Payment Method</option>
                                                            {
                                                                orderpayement.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.value}>{item.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Status</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="status"
                                                            onChange={e => onChange(e)}
                                                        >
                                                            <option value="">Select Status</option>
                                                            {
                                                                statusOptions.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item.value}>{item.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>


                                            </Row>


                                        </div>

                                    </CardBody>

                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                            <button type="submit" className="btn btn-secondary">
                                                Save
                                            </button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>

                        </Row>
                    </Form>
                </Container>

            </div>


        </React.Fragment>
    );
}

CreateOrder.propTypes = {
    createOrder: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    product: state.product,
    user: state.user,
});



export default connect(mapStateToProps, { createOrder, getProducts, getUsers })(CreateOrder);
