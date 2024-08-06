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

import PropTypes from 'prop-types';
import { getLanguages } from '../../actions/language';


const EditNews = ({ updateNews, getNews, getLanguages, language: { languages } }) => {

    let { id } = useParams();

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        getLanguages();
        const fetchtData = async () => {
            const response = await getNews(id);
            setNews(response);
            setLanguage(response.language.title);
        }
        fetchtData();
        setLoading(false);

    }, [getLanguages]);

    const [formData, setFormData] = useState();

    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, imageUrl: e.target.files[0] });
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const Languages = [];

    languages.forEach(row => Languages.push({ value: row._id, label: row.title }));

    function handleChangeLanguage(language) {
        setLanguage(language.label);
        setFormData({ ...formData, language: language.value });

    }

    const deleteImage = () => {
        setNews({ ...news, imageUrl: null });
    }

    const handleSubmit = () => {

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
                                                                    <Input type="text" className="form-control" id="title" placeholder="Title" name="title" onChange={e => onChange(e)} defaultValue={news.title} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                                    <Input type="text" className="form-control" id="title" placeholder="URL Slug" name="url" onChange={e => onChange(e)} defaultValue={news.url} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={6} md={6}>
                                                                <label className="form-label">Language: </label>
                                                                <Select value={{ label: language }} onChange={handleChangeLanguage} options={Languages} />



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
                                                                    <textarea className="form-control" placeholder="Description" id="description" rows="3" name="description" onChange={e => onChange(e)} defaultValue={news.description}></textarea>
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