import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { createAppSliderImage } from '../../../actions/appSliderImage';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/product';

const CreateAppSliderImage = ({ createAppSliderImage, getCategories, getCompanies, getProducts, category: { categories }, company: { companies }, product: { products } }) => {

    useEffect(() => {
        getCategories();
        getCompanies();
        getProducts();
    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();

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


    const handleSubmit = () => {

        createAppSliderImage(formData);

        navigate('/app-slider-images');
    }


    document.title = "Create App Slider Image | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create App Slider Image" pageTitle="App Slider Image Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create App Slider Image" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={{ label: selectedCategory }} onChange={handleSelectCategory} options={Categories} />
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <Select value={{ label: selectedCompany }} onChange={handleSelectCompany} options={Companies} />
                                                    </div>
                                                </Col>


                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" id="title" placeholder="URL Slug" onChange={handleFileChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                        <Input type="number" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="text" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <h6 className="form-label">Products</h6>
                                                    {products.map((prod, index) => (
                                                        <div className="form-check-inline" key={index}>
                                                            <Input type='checkbox' className='form-check-input' value={prod._id} onChange={e => handleProductChange(e, index)} /> {prod.name}
                                                        </div>
                                                    ))}

                                                </Col>



                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
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

CreateAppSliderImage.propTypes = {
    createAppSliderImage: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { createAppSliderImage, getCategories, getCompanies, getProducts })(CreateAppSliderImage);
