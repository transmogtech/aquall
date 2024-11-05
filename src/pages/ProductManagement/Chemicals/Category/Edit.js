import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateChemicalCategory, getChemicalCategory } from '../../../../actions/chemicalCategory';
import Loader from '../../../../Components/Common/Loader';


const EditChemicalCategory = ({ updateChemicalCategory, getChemicalCategory }) => {
    const { id } = useParams();
    const [chemicalcategory, setChemicalCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState();

    useEffect(() => {
        const fetchtData = async () => {
            const response = await getChemicalCategory(id);
            setChemicalCategory(response);
            setFormData({ title: response.title, sequance: response.sequance });
            setLoading(false);

        }
        fetchtData();
    }, []);
    const navigate = useNavigate();


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {

        setErrors({});

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter category name' });
            return false;
        }


        if (!formData.sequance) {
            setErrors({ ...errors, sequance: 'Please enter sequance' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }
        updateChemicalCategory(id, formData);

        navigate('/chemical-categories');
    }


    document.title = "Edit Chemical Category| Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit Chemical Category" pageTitle="Chemical Category Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit Chemical Category" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">


                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                                <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" id="title" placeholder="Name" defaultValue={chemicalcategory.title} />
                                                                {errors && errors.title ? (
                                                                    <div class="text-danger">
                                                                        {errors.title}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} md={6}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Sequance</Label>
                                                                <Input type="number" min="1" onChange={e => onChange(e)} className="form-control" name="sequance" id="sequance" placeholder="Sequance" defaultValue={chemicalcategory.sequance} />
                                                                {errors && errors.sequance ? (
                                                                    <div class="text-danger">
                                                                        {errors.sequance}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                </div>

                                            </CardBody>

                                            <CardFooter>
                                                <div className="d-flex align-items-start gap-3 mt-4">
                                                    <Link to="/chemical-categories" className='btn btn-primary'>Cancel</Link>
                                                    <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Col>

                                </Row>




                            </Form>
                        </Container>

                    </div>

                </Fragment>)}
        </React.Fragment>
    );
}


EditChemicalCategory.propTypes = {
    updateChemicalCategory: PropTypes.func.isRequired,
    getChemicalCategory: PropTypes.func.isRequired,
}



export default connect(null, { updateChemicalCategory, getChemicalCategory })(EditChemicalCategory);

