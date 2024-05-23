import React, {useState}  from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateCategory } from '../../../actions/category';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';



const EditCategory = ({updateCategory}) => {
    let {id } = useParams();

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const categories = useSelector(state => state.category.categories);
    const category = categories.find(category => category._id === id);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        updateCategory(id, formData);

        navigate('/categories');
    }
    document.title = "Edit Category | Aquall Admin";
    return (
        <React.Fragment>
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
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={category.url} />
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


EditCategory.propTypes = {
    updateCategory: PropTypes.func.isRequired,
}

export default connect(null, {updateCategory})(EditCategory);