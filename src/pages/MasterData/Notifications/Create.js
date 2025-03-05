import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import { createNotification } from '../../../actions/notification';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import { getProducts } from '../../../actions/product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateNotification = ({ createNotification }) => {



    // useEffect(() => {
    //     getCategories();
    //     // getCompanies();
    //     // getProducts();
    // }, []); // eslint-disable-line
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const onCategoryChange = async (e) => {
    //     const companyArr = await getCompanies({ categoryId: e.target.value });
    //     setFormData({ ...formData, categoryId: e.target.value });
    //     // console.log(companyArr);
    // };

    // const onCompanyChange = async (e) => {
    //     const productArr = await getProducts({ companyId: e.target.value });
    //     setFormData({ ...formData, companyId: e.target.value });
    //     // console.log(companyArr);
    // };

    const handleSubmit = () => {
        createNotification(formData);

        navigate('/notifications');
    }


    document.title = "Create Notification | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Notification" pageTitle="Notification Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Notification" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                {/* <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="categoryId"
                                                            onChange={e => onCategoryChange(e)}
                                                        >
                                                            <option value="">Select Category</option>
                                                            {
                                                                categories.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item._id}>{item.title}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <select
                                                            className="form-select"
                                                            data-choices
                                                            name="companyId"
                                                            onChange={e => onCompanyChange(e)}
                                                        >
                                                            <option value="">Select Company</option>
                                                            {
                                                                companies.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item._id}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
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
                                                                products.map((item, index) => {
                                                                    return (
                                                                        <option key={index} value={item._id}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Col> */}
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                        <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Title" />
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Description</Label>
                                                        <textarea className="form-control" placeholder="Meta Keywords" onChange={e => onChange(e)} name="description" rows="3"></textarea>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>


                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/notifications" className='btn btn-primary'>Cancel</Link>
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

CreateNotification.propTypes = {
    createNotification: PropTypes.func.isRequired,
    // getProducts: PropTypes.func.isRequired,
    // getCategories: PropTypes.func.isRequired,
    // getCompanies: PropTypes.func.isRequired,
    // product: PropTypes.object.isRequired,
    // category: PropTypes.object.isRequired,
    // company: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    // product: state.product,
    // category: state.category,
    // company: state.company,
});



export default connect(mapStateToProps, { createNotification })(CreateNotification);
