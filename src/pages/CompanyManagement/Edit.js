import React, { useState, useEffect } from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { updateCompany } from '../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import { useSelector } from 'react-redux';


const EditCompany = ({ getCategories, updateCompany, category: { categories } }) => {
    const { id } = useParams();


    useEffect(() => {
        getCategories();
    }, []);


    const companies = useSelector(state => state.company.companies);
    const company = companies.find(company => company._id === id);
    const [selectedCategory, setSelectedCategory] = useState(company.categoryId.title);
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    function handleSelectCategory(selectedCategory) {

        setFormData({ ...formData, categoryId: selectedCategory.value });

        setSelectedCategory(selectedCategory.label);

    }
    const Categories   = [];

    categories.forEach(row => Categories.push({ value: row._id, label: row.title}));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData, logo: e.target.files[0] });
        }
      };
    
    const handleSubmit = () => {

       updateCompany(id, formData);

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
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={{ label: selectedCategory }} onChange={handleSelectCategory} options={Categories} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" defaultValue={company.name} />
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Logo</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
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


EditCompany.propTypes = {
    updateCompany: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    category: state.category,
  });

export default connect(mapStateToProps, { updateCompany, getCategories })(EditCompany);

