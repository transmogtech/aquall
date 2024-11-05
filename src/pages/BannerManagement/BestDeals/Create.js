import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import Select from "react-select";
import { createBestDeal } from '../../../actions/bestDeal';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import { getProducts } from '../../../actions/product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateBestDeal = ({ createBestDeal, getCategories, getCompanies, getProducts, category: { categories }, company: { companies }, product: { products } }) => {

    useEffect(() => {
        getCategories();
        getCompanies();
        getProducts();

    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState({ categoryId: '', companyId: '', url: '', image: '', priority: '', products: '' });
    const [errors, setErrors] = useState({});
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const Categories = [];
    const Companies = [];
    categories.forEach(row => Categories.push({ value: row._id, label: row.title }));

    companies.forEach(row => Companies.push({ value: row._id, label: row.name }));

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    async function handleSelectCategory(selectedCategory) {
        setFormData({ ...formData, categoryId: selectedCategory.value });
        await getCompanies({ categoryId: selectedCategory.value });

        setSelectedCategory(selectedCategory.label);
    }


    async function handleSelectCompany(selectedCompany) {
        setFormData({ ...formData, companyId: selectedCompany.value });
        await getProducts({ companyId: selectedCompany.value });
        setSelectedCompany(selectedCompany.label);
    }

    const handleProductChange = (e, index) => {

        const values = [...selectedProduct];
        const { value, checked } = e.target;

        if (checked) {

            values.push(e.target.value);
        } else {
            values.splice(values.indexOf(value), 1);
        }
        setSelectedProduct(values);
        console.log(values);
        setFormData({ ...formData, products: values });

    };


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

        if (!formData.discount) {
            setErrors({ ...errors, discount: 'Please enter discount' });
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
        createBestDeal(formData);

        navigate('/best-deals');
    }


    document.title = "Create Best Deal | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Best Deal" pageTitle="Best Deal Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Best Deal" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select onChange={handleSelectCategory} options={Categories} />
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
                                                        <Select onChange={handleSelectCompany} options={Companies} />
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
                                                        <Input type="file" className="form-control" id="title" placeholder="URL Slug" onChange={handleFileChange} />
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
                                                        <Input type="number" min="1" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} />
                                                        {errors && errors.discount ? (
                                                            <div className="text-danger">
                                                                {errors.discount}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} />
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
                                                        <Input type="number" min="1" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} />
                                                        {errors && errors.priority ? (
                                                            <div className="text-danger">
                                                                {errors.priority}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <h6 className="form-label">Products</h6>
                                                    <Row>

                                                        {products.map((prod, index) => (
                                                            <Col xxl={4} md={4} sm={12}>
                                                                <div className="form-check-inline" key={index}>
                                                                    <Input type='checkbox' className='form-check-input' value={prod._id} onChange={e => handleProductChange(e, index)} /> {prod.name}
                                                                </div>
                                                            </Col>
                                                        ))}
                                                        {errors && errors.products ? (
                                                            <div className="text-danger">
                                                                {errors.products}
                                                            </div>
                                                        ) : null}
                                                    </Row>

                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>1168W x 658H pixels.</p>
                                                </Col>


                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/best-deals" className='btn btn-primary'>Cancel</Link>
                                            <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
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

CreateBestDeal.propTypes = {
    createBestDeal: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    company: state.company,
    category: state.category,
    product: state.product,
});

export default connect(mapStateToProps, { createBestDeal, getCategories, getCompanies, getProducts })(CreateBestDeal);
