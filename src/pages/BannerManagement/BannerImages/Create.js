import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createBannerImage } from '../../../actions/bannerImage';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/category';
import Select from "react-select";

const CreateBannerImage = ({ createBannerImage, getCategories, category: { categories } }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ url: '', image: '', priority: '' });
    const [error, setError] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(false);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        getCategories();
    }, []);

    const Categories = [];
    categories.forEach(row => Categories.push({ value: row._id, label: row.title }));

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, image: e.target.files[0] });
        // }

        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                setError({ ...error, image: 'Image file size should not exceed 10MB' });
                return;
            }else{
                setFormData({ ...formData, image: e.target.files[0] });
            }         
        }
    };

    async function handleSelectCategory(selectedCategory) {
        setFormData({ ...formData, categoryId: selectedCategory.value });
        setSelectedCategory(selectedCategory.label);

    }

    const handleSubmit = () => {

        if (!formData.url) {
            setError({ ...error, url: 'Please enter a url' });
            return false;
        }

        if (!formData.categoryId) {
            setError({ ...error, categoryId: 'Please select category' });
            return false;

        }

        if (!formData.image) {
            setError({ ...error, image: 'Please select an image' });
            return false;
        }

        if (!formData.priority) {
            setError({ ...error, priority: 'Please enter priority number' });
            return false;
        }


        createBannerImage(formData);

        navigate('/banner-images');
    }


    document.title = "Create Banner Image | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Banner Image" pageTitle="Banner Image Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Banner Image" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">
                                            <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={{ label: selectedCategory }} onChange={handleSelectCategory} options={Categories} />
                                                        {error && error.categoryId ? (
                                                            <div className="text-danger">
                                                                {error.categoryId}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" onChange={e => onChange(e)} name="url" id="url" placeholder="URL" />
                                                        {error && error.url ? (
                                                            <div className="text-danger">
                                                                {error.url}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />
                                                        {error && error.image ? (
                                                            <div className="text-danger">
                                                                {error.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" min="1" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" />
                                                        {error && error.priority ? (
                                                            <div className="text-danger">
                                                                {error.priority}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 10MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>1168W x 658H pixels.</p>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/banner-images" className='btn btn-primary'>Cancel</Link>
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

CreateBannerImage.propTypes = {
    createBannerImage: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,

}


const mapStateToProps = state => ({
    category: state.category,
});


export default connect(mapStateToProps, { createBannerImage, getCategories })(CreateBannerImage);