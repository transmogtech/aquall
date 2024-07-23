import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { updateUser, getUser } from '../../../actions/user';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import { getDistricts } from '../../../actions/district';
import { getAreas } from '../../../actions/area';
import { getPincodes } from '../../../actions/pincode';
import { getUserRoles } from '../../../actions/userRole';
import Loader from '../../../Components/Common/Loader';

const EditUser = ({ updateUser, getStates, getDistricts, getAreas, getPincodes, getUserRoles, getUser }) => {

    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedState, setSelectedState] = useState(null);
    const [options, setOptions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [pincodes, setPincodes] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedPincode, setSelectedPincode] = useState(null);
    const [selectedUserRole, setSelectedUserRole] = useState(null);


    const Districts = [];
    const Areas = [];
    const Pincodes = [];
    const States = [];
    const UserRoles = [];




    const districtsData = useSelector(state => state.district.districts);
    const areaData = useSelector(state => state.area.areas);
    const states = useSelector(state => state.state.states);
    const pincodeData = useSelector(state => state.pincode.pincodes);
    const userroles = useSelector(state => state.userRole.userroles);

    useEffect(() => {
        getStates();
        getDistricts();
        getAreas();
        getPincodes();
        getUserRoles();
        const userData = async () => {
            const response = await getUser(id);
            console.log(response);
            setUser(response);
            setSelectedState(response.stateId.title);
            setSelectedDistrict(response.districtId.title);
            setSelectedArea(response.areaId.title);
            setSelectedPincode(response.pincodeId?.title);
            setSelectedUserRole(response.userroleId.title);
        }
        userData();
        setLoading(false);
    }, []);



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

        pincodeData.forEach(pincode => {
            if (pincode.areaId._id === selectedArea.value) {
                Pincodes.push({ value: pincode._id, label: pincode.title });
            }
        });

        setPincodes(Pincodes);

    }

    function handleSelectPincode(selectedPincode) {
        setFormData({ ...formData, pincodeId: selectedPincode.value });

        setSelectedPincode(selectedPincode.label);
    }



    function handleSelectUserRole(selectedUserRole) {
        setFormData({ ...formData, userroleId: selectedUserRole.value });

        setSelectedUserRole(selectedUserRole.label);
    }



    states.forEach(row => States.push({ value: row._id, label: row.title }));
    userroles.forEach(row => UserRoles.push({ value: row._id, label: row.title }));


    const handleSubmit = () => {


        updateUser(id, formData);

        navigate('/users');
    }

    document.title = "Create User | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Create User" pageTitle="User Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Create User" />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                                    <Input type="text" className="form-control" name="name" onChange={e => onChange(e)} placeholder="Name" defaultValue={user.name} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Email Address</Label>
                                                                    <Input type="email" className="form-control" name="email" onChange={e => onChange(e)} placeholder="Email Address" readOnly defaultValue={user.email} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Mobile Number</Label>
                                                                    <Input type="number" className="form-control" name="mobile" onChange={e => onChange(e)} placeholder="Mobile Number" readOnly defaultValue={user.mobile} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">User Role</Label>
                                                                    <Select value={{ label: selectedUserRole }} onChange={handleSelectUserRole} options={UserRoles} placeholder="User Role" />

                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                                    <Select value={{ label: selectedState }} onChange={handleSelectState} options={States} />
                                                                </div>
                                                            </Col>


                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">District</Label>
                                                                    <Select value={{ label: selectedDistrict }} onChange={handleSelectDistrict} options={options} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Area</Label>
                                                                    <Select value={{ label: selectedArea }} onChange={handleSelectArea} options={areas} />
                                                                </div>
                                                            </Col>
                                                            <Col xxl={4} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Pincode</Label>
                                                                    <Select value={{ label: selectedPincode }} onChange={handleSelectPincode} options={pincodes} />
                                                                </div>
                                                            </Col>




                                                        </Row>

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
                    </>
                )
            }
        </React.Fragment>
    );
}


EditUser.propTypes = {
    updateUser: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    getDistricts: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getPincodes: PropTypes.func.isRequired,
    getUserRoles: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    state: state.state,
});


export default connect(mapStateToProps, { updateUser, getStates, getDistricts, getAreas, getPincodes, getUserRoles, getUser })(EditUser);
