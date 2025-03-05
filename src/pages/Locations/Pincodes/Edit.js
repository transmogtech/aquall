import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getPincode, updatePincode } from '../../../actions/pincode';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import { getAreas } from '../../../actions/area';
import { getCategories } from '../../../actions/category';
import Loader from '../../../Components/Common/Loader';

const EditPincode = ({ updatePincode, getStates, getDistricts, getAreas, getPincode, getCategories, state: { states }, district: { districts }, area: { areas }, category: { categories } }) => {
    let { id } = useParams();

    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [pincode, setPincode] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const Districts = useState([]);
    const Areas = [];
    const States = [];
    const Cateogry = [];
    const [delivery, setDelivery] = useState(Cateogry);

    useEffect(() => {
        getStates();
        getCategories();

        const fetchtData = async () => {
            const response = await getPincode(id);
            setPincode(response);
            setSelectedState(response.stateId?.title);
            setSelectedDistrict(response.districtId?.title);
            setSelectedArea(response.areaId?.title);
            getDistricts({ stateId: response.stateId });
            getAreas({ districtId: response.districtId });
            categories.forEach((category, index) => {
                Cateogry.push({ _id: category._id, title: category.title, charge: response.delivery[index].charge, days: response.delivery[index].days });
            });
            setDelivery(Cateogry);
            setFormData({
                stateId: response.stateId?._id,
                districtId: response.districtId?._id,
                areaId: response.areaId?._id,
                title: response.title,
               delivery: Cateogry
            });
            setLoading(false);
        }

        fetchtData();

    }, [getCategories]); // eslint-disable-line



    states.forEach(row => States.push({ value: row._id, label: row.title }));
    districts.forEach(district => { Districts.push({ value: district._id, label: district.title }); });
    areas.forEach(area => { Areas.push({ value: area._id, label: area.title }); });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    async function handleSelectState(selectedState) {

        setFormData({ ...formData, stateId: selectedState.value });
        await getDistricts({ stateId: selectedState.value });
        setSelectedState(selectedState.label);


    }

    async function handleSelectDistrict(selectedDistrict) {
        setFormData({ ...formData, districtId: selectedDistrict.value });
        await getAreas({ districtId: selectedDistrict.value });
        setSelectedDistrict(selectedDistrict.label);


    }


    function handleSelectArea(selectedArea) {
        setFormData({ ...formData, areaId: selectedArea.value });

        setSelectedArea(selectedArea.label);
    }




    const handleDeliveryChange = (e, index) => {

        const values = [...delivery];
        const updatedValue = e.target.name;
        values[index][updatedValue] = e.target.value;
        setDelivery(values);

        setFormData({ ...formData, delivery: delivery });

    };

    const validateForm = () => {

        setErrors({});

        if (!formData.stateId) {
            setErrors({ ...errors, stateId: 'Please select a state' });
            return false;
        }

        if (!formData.districtId) {
            setErrors({ ...errors, districtId: 'Please select a district' });
            return false;
        }

        if (!formData.areaId) {
            setErrors({ ...errors, areaId: 'Please select a area' });
            return false;
        }

        if (!formData.title) {
            setErrors({ ...errors, title: 'Please enter a title' });
            return false;
        }

       

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }
        updatePincode(id, formData);

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
                                                                    {errors && errors.stateId && (
                                                            <div className="text-danger">
                                                                {errors.stateId}
                                                            </div>
                                                        ) }
                                                                </div>
                                                            </Col>


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">District</Label>
                                                                    <Select value={{ label: selectedDistrict }} onChange={handleSelectDistrict} options={Districts} />
                                                                    {errors && errors.districtId && (
                                                            <div className="text-danger">
                                                                {errors.districtId}
                                                            </div>
                                                        ) }
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Area</Label>
                                                                    <Select value={{ label: selectedArea }} onChange={handleSelectArea} options={Areas} />
                                                                    {errors && errors.areaId && (
                                                            <div className="text-danger">
                                                                {errors.areaId}
                                                            </div>
                                                        ) }
                                                                </div>
                                                            </Col>
                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Pincode</Label>
                                                                    <Input type="text" className="form-control" name="title" onChange={e => onChange(e)} placeholder="Pincode" defaultValue={pincode.title} />
                                                                    {errors && errors.title && (
                                                            <div className="text-danger">
                                                                {errors.title}
                                                            </div>
                                                        ) }
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
                                                            <Row className="gy-4" key={index}>
                                                                <Col xxl={3} md={6}>
                                                                    <div>
                                                                        <Label htmlFor="basiInput" className="form-label">Delivery Charges - {category.title}</Label>
                                                                        <Input type="number" className="form-control" id="charge" name='charge' onChange={e => handleDeliveryChange(e, index)} placeholder="Delivery Charges" defaultValue={pincode.delivery[index].charge} />
                                                                    </div>
                                                                </Col>

                                                                <Col xxl={3} md={6}>
                                                                    <div>
                                                                        <Label htmlFor="basiInput" className="form-label">Delivery Days - {category.title}</Label>
                                                                        <Input type="number" className="form-control" name='days' id="days" onChange={e => handleDeliveryChange(e, index)} placeholder="Delivery Days" defaultValue={pincode.delivery[index].days} />
                                                                    </div>

                                                                </Col>
                                                            </Row>
                                                        ))}


                                                    </div>

                                                </CardBody>
                                                <CardFooter>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <Link to="/pincodes" className="btn btn-primary" >Cancel</Link>
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


EditPincode.propTypes = {
    updatePincode: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getPincode: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    district: PropTypes.object.isRequired,
    area: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    state: state.state,
    district: state.district,
    area: state.area,
    category: state.category,
});


export default connect(mapStateToProps, { updatePincode, getStates, getDistricts, getAreas, getPincode, getCategories })(EditPincode);
