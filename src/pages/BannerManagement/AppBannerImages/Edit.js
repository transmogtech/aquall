import React, { useEffect, useState, Fragment } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateAppBannerImage, getAppBannerImage } from '../../../actions/appBannerImage';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import { getProducts } from '../../../actions/product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';

const EditAppBannerImage = ({ updateAppBannerImage, getAppBannerImage, getCategories, getCompanies, getProducts, category: { categories }, company: { companies }, product: { products } }) => {

    const { id } = useParams();
    const [appbannerimage, setAppBannerImage] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCategories();

        const fetchtData = async () => {
            const response = await getAppBannerImage(id);
            setAppBannerImage(response);
            setSelectedProduct(response.products);
            await getCompanies({ categoryId: response.categoryId });
            await getProducts({ companyId: response.companyId });

            setSelectedCompany(response.companyId);
            setSelectedCategory(response.categoryId);
            setFormData({ categoryId: response.categoryId, companyId: response.companyId, url: response.url, image: response.image, priority: response.priority, products: response.products });
            setLoading(false);

        }
        fetchtData();
    }, []);

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSelectCategory = async (e) => {
        const companyArr = await getCompanies({ categoryId: e.target.value });
        setFormData({ ...formData, categoryId: e.target.value });
        // console.log(companyArr);
    };

    const handleSelectCompany = async (e) => {
        const productArr = await getProducts({ companyId: e.target.value });
        setFormData({ ...formData, companyId: e.target.value });
        // console.log(companyArr);
    };


    const handleProductChange = (e, index) => {

        const values = [...selectedProduct];
        const { value, checked } = e.target;

        if (checked) {

            values.push(e.target.value);
        } else {
            values.splice(values.indexOf(value), 1);
        }
        setSelectedProduct(values);
        // console.log(values);
        setFormData({ ...formData, products: values });

    };

    const deleteImage = () => {
        setAppBannerImage({ ...appbannerimage, image: null });
    }



    const validateForm = () => {

        setErrors({});

        if (!formData.categoryId) {
            setErrors({ ...errors, categoryId: 'Please select category' });
            return false;
        }


        if (!formData.companyId) {
            setErrors({ ...errors, companyId: 'Please select company' });
            return false;
        }

        if (!formData.image) {
            setErrors({ ...errors, image: 'Please select image' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter url' });
            return false;
        }

        if (!formData.priority) {
            setErrors({ ...errors, priority: 'Please enter priority' });
            return false;
        }

        if (!formData.products) {
            setErrors({ ...errors, products: 'Please select at least one product' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }
        updateAppBannerImage(id, formData);

        navigate('/app-banner-images');
    }


    document.title = "Edit App Banner Image | Aquall Admin";
    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <UiContent />
                <div className="page-content">

                    <Container fluid>
                        <BreadCrumb title="Edit App Banner Image" pageTitle="App Banner Image Management" />
                        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <PreviewCardHeader title="Edit App Banner Image" />

                                        <CardBody className="card-body">
                                            <div className="live-preview">
                                                <Row className="gy-4">

                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                            <select
                                                                className="form-select"
                                                                defaultValue={selectedCategory}
                                                                name="categoryId"
                                                                onChange={e => handleSelectCategory(e)}>
                                                                <option value="">Select Category</option>
                                                                {
                                                                    categories.map((item, index) => {
                                                                        return (
                                                                            <option key={index} value={item._id} >{item.title}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            {errors && errors.categoryId ? (
                                                                <div className="text-danger">
                                                                    {errors.categoryId}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                            <select
                                                                className="form-select"
                                                                defaultValue={selectedCompany}
                                                                name="companyId"
                                                                onChange={e => handleSelectCompany(e)}>
                                                                <option value="">Select Company</option>
                                                                {
                                                                    companies.map((item, index) => {
                                                                        return (
                                                                            <option key={index} value={item._id} >{item.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            {errors && errors.companyId ? (
                                                                <div className="text-danger">
                                                                    {errors.companyId}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>


                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                            {appbannerimage.image ? (
                                                                <div className="img-wrap">
                                                                    <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                    <img src={`${process.env.REACT_APP_API_URL}/${appbannerimage.image}`} width="100%" />
                                                                </div>
                                                            ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />}
                                                            {errors && errors.image ? (
                                                                <div className="text-danger">
                                                                    {errors.image}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                            <Input type="number" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} defaultValue={appbannerimage.discount} />

                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                            <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} defaultValue={appbannerimage.url} />
                                                            {errors && errors.url ? (
                                                                <div className="text-danger">
                                                                    {errors.url}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                            <Input type="text" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} defaultValue={appbannerimage.priority} />
                                                            {errors && errors.priority ? (
                                                                <div className="text-danger">
                                                                    {errors.priority}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6 className="form-label">Products</h6>
                                                        {products.map((prod, index) => (
                                                            <div className="form-check-inline" key={index}>
                                                                <Input type='checkbox' className='form-check-input' value={prod._id}
                                                                    defaultChecked={selectedProduct.includes(prod._id)}
                                                                    onChange={e => handleProductChange(e, index)} /> {prod.name}
                                                            </div>
                                                        ))}
                                                        {errors && errors.products ? (
                                                            <div className="text-danger">
                                                                {errors.products}
                                                            </div>
                                                        ) : null}
                                                    </Col>



                                                </Row>

                                            </div>

                                        </CardBody>
                                        <CardFooter>
                                            <div className="d-flex align-items-start gap-3 mt-4">
                                                <Link to="/app-banner-images" className='btn btn-primary'>Cancel</Link>
                                                <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>

                            </Row>

                        </Form>
                    </Container>

                </div>
            </Fragment>)}

        </React.Fragment>
    );
}

EditAppBannerImage.propTypes = {
    updateAppBannerImage: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getAppBannerImage: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    company: state.company,
    category: state.category,
    product: state.product

});

export default connect(mapStateToProps, { updateAppBannerImage, getCategories, getCompanies, getAppBannerImage, getProducts })(EditAppBannerImage);
