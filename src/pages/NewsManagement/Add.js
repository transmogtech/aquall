import React, { useEffect, useState, ChangeEvent } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import Select from "react-select";
import PropTypes from 'prop-types';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from 'react-redux';
import { createNews } from '../../actions/news';
import Alert from '../../Components/Common/Alert';
import { useNavigate, Link } from "react-router-dom";
import { getLanguages } from '../../actions/language';
import { slugify } from "../../helpers/common_functions";

const CreateNews = ({ createNews, getLanguages, language: { languages } }) => {

    const [description, setDescription] = useState(null);
    const [url, setUrl] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getLanguages();
    }, [getLanguages]);


    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // setImage(e.target.files[0]);
            // console.log(e.target.files);
            setFormData({ ...formData, imageUrl: e.target.files[0] });
        }
    };


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const onTitleChange = (e) => {
        const slug = slugify(e.target.value);
        setUrl(slug);
        setFormData({ ...formData, [e.target.name]: e.target.value, url: slug });
    };


    const Languages = [];

    languages.forEach(row => Languages.push({ value: row._id, label: row.title }));

    function handleChangeLanguage(language) {
        setFormData({ ...formData, language: language.value });

    }

    const validateForm = () => {

        setErrors({});

        console.log(formData);
        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter news title' });
            return false;

        }


        if (!formData.url) {
            setErrors({ ...errors, url: 'Please enter a url' });
            return false;

        }

        if (!formData.language) {
            setErrors({ ...errors, language: 'Please select news language' });
            return false;
        }

        if (!description) {
            setErrors({ ...errors, description: 'Please enter news description' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {


        if (!validateForm()) {
            return false;
        }


        createNews(formData);

        navigate('/news-management');

    }
    document.title = "Create News | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create News" pageTitle="News Management" />
                    <Alert />

                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create News" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Title <span className='text-danger'>*</span></Label>
                                                        <Input type="text" className="form-control" name="title" onChange={e => onTitleChange(e)} placeholder="Title" />
                                                        {errors && errors.title ? (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug <span className='text-danger'>*</span></Label>
                                                        <Input type="text" className="form-control" name="url" onChange={e => onChange(e)} defaultValue={url} placeholder="URL Slug" />
                                                        {errors && errors.url ? (
                                                            <div className="text-danger">
                                                                {errors.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <label className="form-label">Language <span className='text-danger'>*</span></label>
                                                    <Select name="language" onChange={handleChangeLanguage} options={Languages} />
                                                    {errors && errors.language ? (
                                                        <div className="text-danger">
                                                            {errors.language}
                                                        </div>
                                                    ) : null}
                                                </Col>

                                                <Col lg={6} >
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" name='image' onChange={handleFileChange} className="form-control" id="inputGroupFile02" />

                                                    </div>
                                                </Col>
                                                <Col lg={6} >
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Youtube Video URL</Label>
                                                        <Input type="text" className="form-control" name="videoUrl" onChange={(e) => { onChange(e); }} />

                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>960W x 720H pixels.</p>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Description <span className='text-danger'>*</span></Label>


                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={description}
                                                            onReady={(editor) => {
                                                                // You can store the "editor" and use when it is needed.

                                                            }}
                                                            onChange={(event, editor) => {
                                                                setDescription(editor.getData());
                                                                setFormData({ ...formData, description: editor.getData() })
                                                            }}
                                                        />
                                                        {errors && errors.description ? (
                                                            <div className="text-danger">
                                                                {errors.description}
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
                                                        <Label htmlFor="description" className="form-label">Meta Title</Label>
                                                        <textarea className="form-control" placeholder="Meta Title" id="description" rows="3" name="metaTitle" onChange={e => onChange(e)}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Meta Description</Label>
                                                        <textarea className="form-control" placeholder="Meta Description" id="description" rows="3" name="metaDescription" onChange={e => onChange(e)}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Meta Keywords</Label>
                                                        <textarea className="form-control" placeholder="Meta Keywords" id="description" rows="3" name="metaKeywords" onChange={e => onChange(e)}></textarea>
                                                    </div>
                                                </Col>


                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/news-management" className="btn btn-primary" >Cancel</Link>
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

CreateNews.propTypes = {
    createNews: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    language: state.language,
});

export default connect(mapStateToProps, { createNews, getLanguages })(CreateNews);