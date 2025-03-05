import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateCategory, getCategory } from '../../../actions/category';
import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';



const EditCategory = ({ updateCategory, getCategory }) => {
    let { id } = useParams();

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchtData = async () => {
            const response = await getCategory(id);
            setCategory(response);
            setFormData({ title: response.title, image: response.image, order: response.order, url: response.url, metaTitle: response.metaTitle, metaKeywords: response.metaKeywords, metaDescription: response.metaDescription });
        }
        fetchtData();
        setLoading(false);

    }, []); // eslint-disable-line


    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const deleteImage = () => {
        setCategory({ ...category, image: null });
    }


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, image: e.target.files[0] });
        // }

        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                alert('Image file size should not exceed 10MB' );
                return;
            }else{
                setFormData({ ...formData, image: e.target.files[0] });
            }

            
        }

    };

    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter category title' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter url' });
            return false;
        }

        if (!formData.image) {
            setErrors({ ...errors, image: 'Please select a category image' });
            return false;
        }

        if (!formData.order) {
            setErrors({ ...errors, order: 'Please enter a order' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }

        updateCategory(id, formData);

        navigate('/categories');
    }
    document.title = "Edit Category | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Category" pageTitle="Category Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Category" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" id="title" placeholder="Title" defaultValue={category.title} />

                                                                    {errors && errors.title && (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) }
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={category.url} />
                                                                    {errors && errors.url && (
                                                                <div className="text-danger">
                                                                    {errors.url}
                                                                </div>
                                                            ) }
                                                                </div>
                                                            </Col>
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                                    {category.image ? (
                                                                        <div className="img-wrap">
                                                                            <span className="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${category.image}`} width="50" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" accept="image/jpeg, image/png" />}
                                                                     {errors && errors.image && (
                                                            <div className="text-danger">
                                                                {errors.image}
                                                            </div>
                                                        ) }
                                                                </div>
                                                            </Col>
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Order</Label>
                                                                    <Input type="number" className="form-control" onChange={e => onChange(e)} name="order" id="order" placeholder="Order" min="1" defaultValue={category.order} />
                                                                    {errors && errors.order && (
                                                            <div className="text-danger">
                                                                {errors.order}
                                                            </div>
                                                        ) }
                                                                </div>
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
                                                                    <Label htmlFor="metaTitle" className="form-label">Meta Title</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={category.metaTitle}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={category.metaDescription}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={category.metaKeywords}></textarea>
                                                                </div>
                                                            </Col>


                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/categories" className='btn btn-primary'>Cancel</Link>
                                                        <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
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


EditCategory.propTypes = {
    updateCategory: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired,
}

export default connect(null, { updateCategory, getCategory })(EditCategory);