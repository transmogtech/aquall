import React, { useState, useEffect } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import Select from "react-select";
import { createCompany } from '../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';


const CreateCompany = ({ getCategories, createCompany, category: { categories } }) => {


    useEffect(() => {
        getCategories();
    }, []);



    const [selectedCategory, setSelectedCategory] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({categoryId: "", name: "", logo: ""});
    const [errors, setErrors] = useState({});

    function handleSelectCategory(selectedCategory) {

        setFormData({ ...formData, categoryId: selectedCategory.value });

        setSelectedCategory(selectedCategory.label);

    }
    const Categories = [];

    categories.forEach(row => Categories.push({ value: row._id, label: row.title }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     setFormData({ ...formData, logo: e.target.files[0] });
        // }

        if (e.target.files) {
            let file_size = e.target.files[0].size;

            if (file_size > 10e6) {
                alert('Image file size should not exceed 10MB');
                return;
            }else{
                setFormData({ ...formData, logo: e.target.files[0] });
            }         
        }
    };

    const validateForm = () => {

        setErrors({});

        if (!formData.name) {
            setErrors({ ...errors, name: 'Please enter company name' });
            return false;
        }

        if (!formData.categoryId) {
            setErrors({ ...errors, categoryId: 'Please select a category' });
            return false;
        }

        if (!formData.logo) {
            setErrors({ ...errors, logo: 'Please select a logo' });
            return false;
        }

        return true;
    }


    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }

        createCompany(formData);

        navigate('/companies');
    }


    document.title = "Create Company | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Company" pageTitle="Company Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Company" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company Name</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Name" />
                                                        {errors && errors.name && (
                                                            <div className="text-danger">
                                                                {errors.name}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={{ label: selectedCategory }} onChange={handleSelectCategory} options={Categories} />
                                                        {errors && errors.categoryId && (
                                                            <div className="text-danger">
                                                                {errors.categoryId}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>


                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company Logo</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />
                                                        {errors && errors.logo && (
                                                            <div className="text-danger">
                                                                {errors.logo}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>


                                            </Row>

                                        </div>

                                    </CardBody>

                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/companies" className="btn btn-primary" >Cancel</Link>
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


CreateCompany.propTypes = {
    createCompany: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    category: state.category,
});

export default connect(mapStateToProps, { createCompany, getCategories })(CreateCompany);

