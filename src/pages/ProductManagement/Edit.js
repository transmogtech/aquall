import React, { useEffect, useState, Fragment } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPlStages } from "../../actions/plStages";
import { getSaltPercentages } from "../../actions/saltPercentage";
import { getCompanies } from "../../actions/company";
import { getCategories } from "../../actions/category";
import { getCultureTypes } from "../../actions/cultureType";
import { getFeedTypes } from "../../actions/feedType";
import { getPeddlerTypes } from "../../actions/peddlerType";
import { getHPSizes } from "../../actions/hpSizes";
import { updateProduct, getProduct } from '../../actions/product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../Components/Common/Loader';

const EditProduct = ({ getPlStages, getSaltPercentages, getCompanies, getCategories, getCultureTypes, getFeedTypes, getPeddlerTypes, getHPSizes, updateProduct, getProduct, plStage: { plstages }, saltPercentage: { saltpercentages }, company: { companies }, category: { categories }, cultureType: { culturetypes }, feedType: { feedtypes }, peddlerType: { peddlertypes }, hpSize: { hpsizes } }) => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});

    const [showHideFields, setShowHideFields] = useState(null);
    const [gstFields, setGSTFields] = useState(false);
    useEffect(() => {
        getPlStages();
        getSaltPercentages();
        getCompanies();
        getCategories();
        getCultureTypes();
        getFeedTypes();
        getPeddlerTypes();
        getHPSizes();
        const fetchtData = async () => {
            const response = await getProduct(id);
            setProduct(response);
            setFormData({ name: response.name, price: response.price, description: response.description, imageUrl: response.imageUrl, volume: response.volume, categoryId: response.categoryId._id, companyId: response.companyId._id });
            setShowHideFields(response.categoryId._id);
            setGSTFields(response.gstPercentage ? true : false);
            setLoading(false);

        }
        fetchtData();
    }, []);

    const Categories = [];
    const Companies = [];
    const PlStages = [];
    const SaltPercentages = [];
    const FeedTypes = [];
    const CultureTypes = [];
    const PeddlerTypes = [];
    const HpSizes = [];

    plstages.forEach(row => PlStages.push({ value: row._id, label: row.name }));
    saltpercentages.forEach(row => SaltPercentages.push({ value: row._id, label: row.name }));
    companies.forEach(row => Companies.push({ value: row._id, label: row.name }));
    categories.forEach(row => Categories.push({ value: row._id, label: row.title }));
    culturetypes.forEach(row => CultureTypes.push({ value: row._id, label: row.title }));
    feedtypes.forEach(row => FeedTypes.push({ value: row._id, label: row.name }));
    peddlertypes.forEach(row => PeddlerTypes.push({ value: row._id, label: row.name }));
    hpsizes.forEach(row => HpSizes.push({ value: row._id, label: row.title }));

    const [image, setImage] = useState(null);
    const navigate = useNavigate();


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     setImage(e.target.files[0]);
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, imageUrl: e.target.files[0] });
        // }

        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                setErrors({ ...errors, imageUrl: 'Image file size should not exceed 10MB' });
                return;
            }else{
                setImage(e.target.files[0]);
                setFormData({ ...formData, imageUrl: e.target.files[0] });
            }         
        }
    };

    const deleteImage = () => {
        setProduct({ ...product, imageUrl: null });
        setFormData({ ...formData, imageUrl: null });
    }
    const handleSelectCategory = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.value);

        setShowHideFields(e.target.value);
    };

    function handleGstOptionChange() {
        setGSTFields(!gstFields);
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

        if (!formData.name) {
            setErrors({ ...errors, name: 'Please enter product name' });
            return false;
        }

        if (!formData.imageUrl) {
            setErrors({ ...errors, imageUrl: 'Please select image' });
            return false;
        }

        if (!formData.price) {
            setErrors({ ...errors, price: 'Please enter price' });
            return false;
        }

        if (!formData.volume) {
            setErrors({ ...errors, volume: 'Please enter volume' });
            return false;
        }

        if (!formData.description) {
            setErrors({ ...errors, description: 'Please enter description' });
            return false;
        }

        return true;
    }


    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        } updateProduct(id, formData);

        navigate('/products');
    }

    document.title = "Edit Product | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit Product" pageTitle="Product Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit Product" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                                <select
                                                                    className="form-select"
                                                                    data-choices
                                                                    name="categoryId"
                                                                    onChange={e => handleSelectCategory(e)}
                                                                    defaultValue={product?.categoryId?._id}
                                                                >
                                                                    <option value="">Select Category</option>
                                                                    {
                                                                        Categories.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item.value} selected={item.value == product.categoryId?._id}>{item.label}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                {errors && errors.categoryId ? (
                                                                    <div class="text-danger">
                                                                        {errors.categoryId}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                                <select
                                                                    className="form-select"
                                                                    data-choices
                                                                    name="companyId"
                                                                    onChange={e => onChange(e)}
                                                                >
                                                                    <option value="">Select Company</option>
                                                                    {
                                                                        Companies.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item.value} selected={item.value == product.companyId?._id}>{item.label}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                {errors && errors.companyId ? (
                                                                    <div class="text-danger">
                                                                        {errors.companyId}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        {["6646461c3f25f68d99341a7a"].indexOf(showHideFields) > -1 &&
                                                            <Col xxl={3} md={6} id='saltPercentDiv'>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Hp Size</Label>
                                                                    <select
                                                                        className="form-select"
                                                                        data-choices
                                                                        name="hpsizeId"
                                                                        onChange={e => onChange(e)}
                                                                    >
                                                                        <option value="">Select HP Size</option>
                                                                        {
                                                                            HpSizes.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item.value} selected={item.value == product.hpsizeId?._id}>{item.label}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </Col>}

                                                        {["664645eb3f25f68d99341a71", "664645fb3f25f68d99341a74", "6646460f3f25f68d99341a77"].indexOf(showHideFields) > -1 &&
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                                    <select
                                                                        className="form-select"
                                                                        data-choices
                                                                        name="culturetypeId"
                                                                        onChange={e => onChange(e)}
                                                                    >
                                                                        <option value="">Select Culture Type</option>
                                                                        {
                                                                            CultureTypes.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item.value} selected={item.value == product.culturetypeId?._id}>{item.label}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </Col>
                                                        }

                                                        {showHideFields === '664645fb3f25f68d99341a74' && <Col xxl={3} md={6} >
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">PL Stage</Label>
                                                                <select
                                                                    className="form-select"
                                                                    data-choices
                                                                    name="plstageId"
                                                                    onChange={e => onChange(e)}
                                                                >
                                                                    <option value="">Select PL Stage</option>
                                                                    {
                                                                        PlStages.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item.value} selected={item.value == product.plstageId?._id}>{item.label}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </Col>}


                                                        {showHideFields === '664645fb3f25f68d99341a74' &&
                                                            <Col xxl={3} md={6} id='saltPercentDiv'>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Salt Percentage</Label>
                                                                    <select
                                                                        className="form-select"
                                                                        data-choices
                                                                        name="saltpercentageId"
                                                                        onChange={e => onChange(e)}
                                                                    >
                                                                        <option value="">Select Salt Percentage</option>
                                                                        {
                                                                            SaltPercentages.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item.value} selected={item.value == product.saltpercentageId?._id}>{item.label}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </Col>}

                                                        {showHideFields === '664645eb3f25f68d99341a71' && <Col xxl={3} md={6} id='feedTypeDiv'>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Feed Type</Label>
                                                                <select
                                                                    className="form-select"
                                                                    data-choices
                                                                    name="feedtypeId"
                                                                    onChange={e => onChange(e)}
                                                                >
                                                                    <option value="">Select Feed Type</option>
                                                                    {
                                                                        FeedTypes.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item.value} selected={item.value == product.feedtypeId?._id}>{item.label}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </Col>}

                                                        {showHideFields === '6646461c3f25f68d99341a7a' && <Col xxl={3} md={6} id='peddlerDiv'>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Peddler Type</Label>
                                                                <select
                                                                    className="form-select"
                                                                    data-choices
                                                                    name="peddlertypeId"
                                                                    onChange={e => onChange(e)}
                                                                >
                                                                    <option value="">Select Peddler Type</option>
                                                                    {
                                                                        PeddlerTypes.map((item, index) => {
                                                                            return (
                                                                                <option key={index} value={item.value} selected={item.value == product.peddlertypeId?._id}>{item.label}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </Col>}

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Product Name</Label>
                                                                <Input type="text" className="form-control" onChange={e => onChange(e)} name="name" placeholder="Product Name" defaultValue={product.name} />
                                                                {errors && errors.name ? (
                                                                    <div class="text-danger">
                                                                        {errors.name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                                {
                                                                    product.imageUrl ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${product.imageUrl}`} width="100%" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />

                                                                }
                                                                {errors && errors.imageUrl ? (
                                                                    <div class="text-danger">
                                                                        {errors.imageUrl}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Price</Label>
                                                                <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="price" defaultValue={product.price} />
                                                                {errors && errors.price ? (
                                                                    <div class="text-danger">
                                                                        {errors.price}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Quantity</Label>
                                                                <Input type="text" min="1" className="form-control" onChange={e => onChange(e)} name="volume" defaultValue={product.volume} />
                                                                {errors && errors.volume ? (
                                                                    <div class="text-danger">
                                                                        {errors.volume}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={3} md={6}>
                                                            <div>
                                                                {showHideFields == '664645fb3f25f68d99341a74' ? <Label htmlFor="basiInput" className="form-label">Bonus</Label> : <Label htmlFor="basiInput" className="form-label">Discount %</Label>}
                                                                <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="discount" defaultValue={product.discount} />
                                                            </div>
                                                        </Col>
                                                        {
                                                            showHideFields === '664645fb3f25f68d99341a74' &&
                                                            <Col xxl={6} md={6} id='saltPercentDiv'>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Location</Label>
                                                                    <Input type="text" className="form-control" onChange={e => onChange(e)} name="location" defaultValue={product.location} />
                                                                </div>
                                                            </Col>

                                                        }
                                                        {
                                                            showHideFields === '664645fb3f25f68d99341a74' &&
                                                            <Col xxl={12} md={12} id='saltPercentDiv'>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Broodrs</Label>
                                                                    <textarea name='broodrs' onChange={e => onChange(e)} defaultValue={product.broodrs} className='form-control'></textarea>
                                                                </div>
                                                            </Col>

                                                        }
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Description</Label>
                                                                <textarea name='description' onChange={e => onChange(e)} defaultValue={product.description} className='form-control'></textarea>
                                                                {errors && errors.description ? (
                                                                    <div class="text-danger">
                                                                        {errors.description}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xxl={3} md={3} className='mt-5'>
                                                            <div className='form-check form-switch'>

                                                                <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { handleGstOptionChange(); }} checked={gstFields} />
                                                                <Label className="form-check-label" htmlFor="flexSwitchCheckDefault">GST
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                        {gstFields === true && <Col xxl={9} md={9} id='gstDiv'>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">GST Percentage</Label>
                                                                <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="gstPercentage" defaultValue={product.gstPercentage} />
                                                            </div>
                                                        </Col>}
                                                        <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                            <h4 className='mb-4'>Instructions:</h4>
                                                            <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                            <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                            <p className='mb-1'><strong>Recommended dimensions - </strong>960W x 720H pixels.</p>
                                                        </Col>
                                                    </Row>
                                                </div>

                                            </CardBody>

                                        </Card>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Meta Data" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">

                                                    <Row className="gy-4">

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="description" className="form-label">Meta Title</Label>
                                                                <textarea className="form-control" placeholder="Meta Title" onChange={e => onChange(e)} name="metaTitle" defaultValue={product.metaTitle} rows="3"></textarea>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="description" className="form-label">Meta Description</Label>
                                                                <textarea className="form-control" placeholder="Meta Description" onChange={e => onChange(e)} name="metaKeywords" defaultValue={product.metaKeywords} rows="3"></textarea>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="description" className="form-label">Meta Keywords</Label>
                                                                <textarea className="form-control" placeholder="Meta Keywords" onChange={e => onChange(e)} name="metaDescription" defaultValue={product.metaDescription} rows="3"></textarea>
                                                            </div>
                                                        </Col>


                                                    </Row>

                                                </div>

                                            </CardBody>
                                            <CardFooter>
                                                <div className="d-flex align-items-start gap-3 mt-4">
                                                    <Link to="/products" className='btn btn-primary'>Cancel</Link>
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

                </Fragment>)}
        </React.Fragment>
    );
}

EditProduct.propTypes = {
    updateProduct: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getFeedTypes: PropTypes.func.isRequired,
    getPeddlerTypes: PropTypes.func.isRequired,
    getPlStages: PropTypes.func.isRequired,
    getSaltPercentages: PropTypes.func.isRequired,
    getHPSizes: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    plStage: PropTypes.object.isRequired,
    saltPercentage: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,
    feedType: PropTypes.object.isRequired,
    peddlerType: PropTypes.object.isRequired,
    hpSize: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    company: state.company,
    category: state.category,
    plStage: state.plStage,
    saltPercentage: state.saltPercentage,
    cultureType: state.cultureType,
    feedType: state.feedType,
    peddlerType: state.peddlerType,
    hpSize: state.hpSize,
});



export default connect(mapStateToProps, { updateProduct, getCategories, getCompanies, getCultureTypes, getFeedTypes, getPeddlerTypes, getPlStages, getSaltPercentages, getHPSizes, getProduct })(EditProduct);
