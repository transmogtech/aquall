import React, { useEffect, useState, Fragment } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useParams, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { updateBestDeal, getBestDeal } from '../../../actions/bestDeal';
import { getCategories } from '../../../actions/category';
import { getCompanies } from '../../../actions/company';
import { getProducts } from '../../../actions/product';

import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
const EditBestDeal = ({ updateBestDeal, getCategories, getCompanies, getProducts, getBestDeal, category: { categories }, company: { companies }, product: { products } }) => {

    const { id } = useParams();
    const [bestdeal, setBestDeal] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getCategories();
        const fetchtData = async () => {
            const response = await getBestDeal(id);
            setBestDeal(response);
            setSelectedProduct(response.products);
            setSelectedCompany(response.companyId);
            setSelectedCategory(response.categoryId);
            await getCompanies({ categoryId: response.categoryId });
            await getProducts({ companyId: response.companyId });
            setLoading(false);

        }
        fetchtData();
    }, []);

    const deleteImage = () => {
        setBestDeal({ ...bestdeal, image: null });
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

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
        console.log(values);
        setFormData({ ...formData, products: values });

    };


    const handleSubmit = () => {

        updateBestDeal(id, formData);

        navigate('/best-deals');
    }


    document.title = "Edit Best Deal | Aquall Admin";
    return (
        <React.Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <UiContent />
                <div className="page-content">

                    <Container fluid>
                        <BreadCrumb title="Edit Best Deal" pageTitle="App Banner Image Management" />
                        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <PreviewCardHeader title="Edit Best Deal" />

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
                                                        </div>
                                                    </Col>


                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                            {
                                                                bestdeal.image ? (
                                                                    <div className="img-wrap">
                                                                        <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                        <img src={`${process.env.REACT_APP_API_URL}/${bestdeal.image}`} width="100%" />
                                                                    </div>
                                                                ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                            <Input type="number" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} defaultValue={bestdeal.discount} />
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                            <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} defaultValue={bestdeal.url} />
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} md={6}>
                                                        <div>
                                                            <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                            <Input type="text" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} defaultValue={bestdeal.priority} />
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
            </Fragment>)}

        </React.Fragment>
    );
}

EditBestDeal.propTypes = {
    updateBestDeal: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    getBestDeal: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    company: state.company,
    category: state.category,
    product: state.product,
});

export default connect(mapStateToProps, { updateBestDeal, getCategories, getCompanies, getBestDeal, getProducts })(EditBestDeal);
