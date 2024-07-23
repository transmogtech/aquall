import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNotification, getNotification } from '../../../actions/notification';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import { getProducts } from '../../../actions/product';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditNotification = ({ updateNotification, getCategories, getCompanies, getProducts, getNotification, category: { categories }, company: { companies }, product: { products } }) => {

    const { id } = useParams();
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(false);
    const [companyId, setCompanyId] = useState(false);
    const [productId, setProductId] = useState(false);

    useEffect(() => {
        getCategories();
        // getCompanies();
        // getProducts();
        const fetchtData = async () => {
            const response = await getNotification(id);
            setNotification(response);
            const companyArr = await getCompanies({ categoryId: response.categoryId._id });
            const productArr = await getProducts({ companyId: response.companyId._id });
            setCategoryId(response.categoryId._id);
            setCompanyId(response.companyId._id);
            setProductId(response.productId._id);
            setLoading(false);

        }
        fetchtData();
    }, []); //eslint-disable-line




    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const onCategoryChange = async (e) => {
        const companyArr = await getCompanies({ categoryId: e.target.value });
        setFormData({ ...formData, categoryId: e.target.value });
        // console.log(companyArr);
    };

    const onCompanyChange = async (e) => {
        const productArr = await getProducts({ companyId: e.target.value });
        setFormData({ ...formData, companyId: e.target.value });
        // console.log(companyArr);
    };


    const handleSubmit = () => {
        updateNotification(id, formData);

        navigate('/notifications');
    }


    document.title = "Create Notification | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
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


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                                    <select
                                                                        className="form-select"
                                                                        defaultValue={categoryId} name="categoryId"
                                                                        onChange={e => onCategoryChange(e)}


                                                                    >
                                                                        <option value="">Select Category</option>
                                                                        {
                                                                            categories.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item._id} >{item.title}</option>
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
                                                                        defaultValue={companyId}
                                                                        name="companyId"
                                                                        onChange={e => onCompanyChange(e)}
                                                                    >
                                                                        <option value="">Select Company</option>
                                                                        {
                                                                            companies.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item._id} >{item.name}</option>
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
                                                                        defaultValue={productId}
                                                                        name="productId"
                                                                        onChange={e => onChange(e)}
                                                                    >
                                                                        <option value="">Select Product</option>
                                                                        {
                                                                            products.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item._id} >{item.name}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                                    <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Title" defaultValue={notification.title} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="description" className="form-label">Description</Label>
                                                                    <textarea className="form-control" placeholder="Meta Keywords" onChange={e => onChange(e)} name="description" defaultValue={notification.description} rows="3"></textarea>
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
                    </>)}

        </React.Fragment>
    );
}

EditNotification.propTypes = {
    updateNotification: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getNotification: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    product: state.product,
    category: state.category,
    company: state.company,
});



export default connect(mapStateToProps, { updateNotification, getProducts, getCategories, getCompanies, getNotification })(EditNotification);
