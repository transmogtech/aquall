import React, { useState, useEffect } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useParams, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { connect } from 'react-redux';
import { updateNews, getNews } from '../../actions/news';
import Loader from '../../Components/Common/Loader';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from 'prop-types';
import { getLanguages } from '../../actions/language';
import { slugify } from "../../helpers/common_functions";


const EditNews = ({ updateNews, getNews, getLanguages, language: { languages } }) => {

    let { id } = useParams();

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState();
    const [description, setDescription] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        getLanguages();
        const fetchtData = async () => {
            const response = await getNews(id);
            setNews(response);
            setLanguage(response.language.title);
            setUrl(response.url);
            setFormData({ title: response.title, description: response.description, language: response.language._id, url: response.url, imageUrl: response.imageUrl, metaTitle: response.metaTitle, metaDescription: response.metaDescription, metaKeywords: response.metaKeywords });
            setLoading(false);

        }
        fetchtData();

    }, [getLanguages]);


    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
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
        setLanguage(language.value);
        setFormData({ ...formData, language: language.value });

    }

    const deleteImage = () => {
        setNews({ ...news, imageUrl: null });
    }

    const validateForm = () => {

        setErrors({});

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


        updateNews(id, formData);

        navigate('/news-management');

    }
    document.title = "Edit News | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit News" pageTitle="News Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit News" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                                    <Input type="text" className="form-control" id="title" placeholder="Title" name="title" onChange={e => onTitleChange(e)} defaultValue={news.title} />
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
                                                                    <Input type="text" className="form-control" id="title" placeholder="URL Slug" name="url" onChange={e => onChange(e)} defaultValue={url} />
                                                                    {errors && errors.url ? (
                                                                        <div className="text-danger">
                                                                            {errors.url}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </Col>
                                                            <Col xxl={6} md={6}>
                                                                <label className="form-label">Language: </label>
                                                                <Select value={{ label: language }} onChange={handleChangeLanguage} options={Languages} />

                                                                {errors && errors.language ? (
                                                                    <div className="text-danger">
                                                                        {errors.language}
                                                                    </div>
                                                                ) : null}

                                                            </Col>

                                                            <Col lg={6} >
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>

                                                                    {news.imageUrl ? (
                                                                        <div class="img-wrap">
                                                                            <span class="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${news.imageUrl}`} width="50" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} id="inputGroupFile02" />}

                                                                </div>
                                                            </Col>
                                                            <Col lg={6} >
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Youtube Video URL</Label>
                                                                    <Input type="text" className="form-control" defaultValue={news.videoUrl} name="videoUrl" onChange={e => onChange(e)} id="inputGroupFile02" />

                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="description" className="form-label">Description</Label>

                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data={news.description}
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
                                                                    <textarea className="form-control" placeholder="Meta Title" id="description" name="metaTitle" onChange={e => onChange(e)} rows="3" defaultValue={news.metaTitle} ></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="description" className="form-label">Meta Description</Label>
                                                                    <textarea className="form-control" placeholder="Meta Description" name="metaDescription" onChange={e => onChange(e)} id="description" rows="3" defaultValue={news.metaDescription} ></textarea>
                                                                </div>
                                                            </Col>
                                                            <Col xxl={12} md={12}>
                                                                <div>
                                                                    <Label htmlFor="description" className="form-label">Meta Keywords</Label>
                                                                    <textarea className="form-control" placeholder="Meta Keywords" id="description" name="metaKeywords" onChange={e => onChange(e)} rows="3" defaultValue={news.metaKeywords}></textarea>
                                                                </div>
                                                            </Col>


                                                        </Row>

                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
                                                        {/* <Link to="/news-management" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link> */}
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




EditNews.propTypes = {
    updateNews: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    getNews: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    language: state.language,
});

export default connect(mapStateToProps, { updateNews, getLanguages, getNews })(EditNews);