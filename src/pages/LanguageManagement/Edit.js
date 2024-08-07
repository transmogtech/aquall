import React, { useState, useEffect } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateLanguage, getLanguage } from '../../actions/language';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../Components/Common/Loader';
import { slugify } from "../../helpers/common_functions";


const EditLanguage = ({ updateLanguage, getLanguage }) => {

    let { id } = useParams();

    const [language, setLanguage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getLanguage(id);
            setLanguage(response);
            setUrl(response.url);
            setLoading(false);

        }
        fetchtData();

    }, []); // eslint-disable-line

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const onTitleChange = (e) => {
        const slug = slugify(e.target.value);
        setUrl(slug);
        setFormData({ ...formData, [e.target.name]: e.target.value, url: slug });
    };
    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter a title' });
            return false;
        }

        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter a url' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }

        updateLanguage(id, formData);

        navigate('/language-management');
    }


    document.title = "Edit Language | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Language" pageTitle="Language Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Language" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                                    <Input type="text" onChange={e => onTitleChange(e)} className="form-control" name="title" id="title" placeholder="Title" defaultValue={language.title} />
                                                                    {errors && errors.title ? (
                                                                        <div className="text-danger">
                                                                            {errors.title}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                                    <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={url} />
                                                                    {errors && errors.url ? (
                                                                        <div className="text-danger">
                                                                            {errors.url}
                                                                        </div>
                                                                    ) : null}
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
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={language.metaTitle}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={language.metaDescription}></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                                    <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={language.metaKeywords}></textarea>
                                                                </div>
                                                            </Col>


                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">

                                                        <Link to="/language-management" className="btn btn-primary" >Cancel</Link>
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


EditLanguage.propTypes = {
    updateLanguage: PropTypes.func.isRequired,
    getLanguage: PropTypes.func.isRequired,
}

export default connect(null, { updateLanguage, getLanguage })(EditLanguage);