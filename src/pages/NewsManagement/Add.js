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
import { useNavigate } from "react-router-dom";
import { getLanguages } from '../../actions/language';

const CreateNews = ({ createNews, getLanguages, language: { languages } }) => {

    const [description, setDescription] = useState(null);
    const [language, setLanguage] = useState(null);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getLanguages();
    }, [getLanguages]);


    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            // console.log(e.target.files);
            setFormData({ ...formData, imageUrl: e.target.files[0] });
        }
    };


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const Languages = [];

    languages.forEach(row => Languages.push({ value: row._id, label: row.title }));

    function handleChangeLanguage(language) {
        setLanguage(language.value);
        console.log(language.value);
        setFormData({ ...formData, language: language.value });

    }

    const handleSubmit = () => {


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
                                                        <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                        <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Title" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" className="form-control" name="url" onChange={e => onChange(e)} placeholder="URL Slug" />
                                                    </div>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <label className="form-label">Language: </label>
                                                    <Select name="language" onChange={handleChangeLanguage} options={Languages} />

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
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="description" className="form-label">Description</Label>
                                                        <textarea className="form-control" placeholder="Description" id="description" rows="3" name="description" onChange={e => onChange(e)}></textarea>
                                                        {/* <CKEditor
                                                            editor={ClassicEditor}
                                                            data="<p>Hello from CKEditor 5!</p>"
                                                            onReady={(editor) => {
                                                                // You can store the "editor" and use when it is needed.

                                                            }}

                                                            name="description"
                                                            onChange={(event, editor) => {
                                                               handleChange(editor);
                                                            }}
                                                        /> */}
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