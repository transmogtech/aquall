import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Common/Loader';

import { createPincode } from '../../../actions/pincode';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import { getAreas } from '../../../actions/area';
import { getCategories } from '../../../actions/category';

const CreatePincode = ({ createPincode, getStates, getDistricts, getAreas, getCategories, category: { categories } }) => {
    const [delivery, setDelivery] = useState([]);
    const categoryData = [];

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getStates();
        getDistricts();
        getAreas();
        getCategories();
        categories.forEach(category => {
            categoryData.push({ _id: category._id, title: category.title, charge: "", days: "" });

        });
        setDelivery(categoryData);
        setLoading(false);

    }, [getCategories]);




    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedState, setSelectedState] = useState(null);
    const [options, setOptions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(['']);
    const [selectedArea, setSelectedArea] = useState(['']);
    const Districts = [];
    const Areas = [];



    const districtsData = useSelector(state => state.district.districts);
    const areaData = useSelector(state => state.area.areas);
    const states = useSelector(state => state.state.states);


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });

        setSelectedState(selectedState.label);


        districtsData.forEach(district => {
            if (district.stateId._id === selectedState.value) {
                Districts.push({ value: district._id, label: district.title });
            }
        });

        setOptions(Districts);


    }

    function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });

        setSelectedDistrict(selectedDistrict.label);


        areaData.forEach(area => {
            if (area.districtId._id === selectedDistrict.value) {
                Areas.push({ value: area._id, label: area.title });
            }
        });

        setAreas(Areas);
    }


    function handleSelectArea(selectedArea) {
        setFormData({ ...formData, areaId: selectedArea.value });

        setSelectedArea(selectedArea.label);
    }


    const States = [];

    states.forEach(row => States.push({ value: row._id, label: row.title }));

    const handleDeliveryChargeChange = (e, index) => {

        const values = delivery;
        values[index].charge = e.target.value;
        setDelivery(values);

        setFormData({ ...formData, delivery: delivery });

    };

    const handleDeliveryDaysChange = (e, index) => {

        const values = delivery;
        values[index].days = e.target.value;
        setDelivery(values);

        setFormData({ ...formData, delivery: delivery });

    };

    const handleSubmit = () => {


        createPincode(formData);

        navigate('/pincodes');
    }

    document.title = "Create Pincode | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Create Pincode" pageTitle="Pincode Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Create Pincode" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                                    <Select value={{ label: selectedState }} onChange={handleSelectState} options={States} />
                                                                </div>
                                                            </Col>


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">District</Label>
                                                                    <Select value={{ label: selectedDistrict }} onChange={handleSelectDistrict} options={options} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Area</Label>
                                                                    <Select value={{ label: selectedArea }} onChange={handleSelectArea} options={areas} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Pincode</Label>
                                                                    <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Name" />
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
                                                <PreviewCardHeader title="Delivery Details" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">

                                                        {delivery.map((category, index) => (
                                                            <Row className="gy-4">                                                     <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Delivery Charges - {category.title}</Label>
                                                                    <Input type="number" className="form-control" id="charge" name='charge' onChange={e => handleDeliveryChargeChange(e, index)} placeholder="Delivery Charges" />
                                                                </div>
                                                            </Col>

                                                                <Col xxl={3} md={6}>
                                                                    <div>
                                                                        <Label htmlFor="basiInput" className="form-label">Delivery Days - {category.title}</Label>
                                                                        <Input type="text" className="form-control" name='days' id="days" onChange={e => handleDeliveryDaysChange(e, index)} placeholder="Delivery Days" />
                                                                    </div>

                                                                </Col>
                                                            </Row>
                                                        ))}


                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">

                                                        <Button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Button>
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


CreatePincode.propTypes = {
    createPincode: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    state: state.state,
    category: state.category,
});


export default connect(mapStateToProps, { createPincode, getStates, getDistricts, getAreas, getCategories })(CreatePincode);
