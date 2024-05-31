import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { getCountTypes } from '../../../actions/countType';
import { getCultureTypes } from '../../../actions/cultureType';
import { getCountAreas } from '../../../actions/countArea';
import { createCount } from '../../../actions/count';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const CreateCount = ({ getCountTypes, getCultureTypes, getCountAreas, createCount, countType: { counttypes }, cultureType: { culturetypes }, countArea: { countareas } }) => {


    useEffect(() => {
        getCountTypes();
        getCultureTypes();
        getCountAreas();
    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const [selectedCultureType, setSelectedCultureType] = useState(false);
    const [selectedCountArea, setSelectedCountArea] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const CountType = [];
    const CountArea = [];
    const CultuteType = [];
    counttypes.forEach(row => CountType.push({ value: row._id, label: row.title }));
    countareas.forEach(row => CountArea.push({ value: row._id, label: row.title }));
    culturetypes.forEach(row => CultuteType.push({ value: row._id, label: row.title }));

    function handleSelectCultureType(selectedCultureType) {
        setFormData({ ...formData, culturetypeId: selectedCultureType.value });

        setSelectedCultureType(selectedCultureType.label);
    }


    function handleSelectCountArea(selectedCountArea) {
        setFormData({ ...formData, countareaId: selectedCountArea.value });

        setSelectedCountArea(selectedCountArea.label);
    }

    function handleSelectedCategory(selectedCategory) {
        setFormData({ ...formData, categoryId: selectedCategory.value });

        setSelectedCategory(selectedCategory.label);
    }


    // const categories = [
    //     { value: "01", label: "Seed" },
    //     { value: "02", label: "Feed" },
    //     { value: "03", label: "Chemical" },
    //     { value: "04", label: "Aerators" },
    //     { value: "05", label: "Test Kit" },
    //     { value: "06", label: "Other" },
    // ];

    // const CountArea = [
    //     { value: "01", label: "ONGOLE" },
    //     { value: "02", label: "VIZAG" },
    //     { value: "03", label: "ANDHRAPRDESH" },
    // ];


    // const cats = [
    //     { value: "01", label: "Shrimp" },
    //     { value: "02", label: "Fish" },
    // ];

    const CountPercent = [
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" },
        {count: '', volume: "" }
    ];

    const [counter, setCounter] = useState(CountPercent);

    const handleCounterChange = (e, index) => {

        const values = [...counter];
        const updatedValue = e.target.name;
        values[index][updatedValue] = e.target.value;
        setCounter(values);
        console.log(counter);
        setFormData({ ...formData, counts: counter });

    };

    const handleSubmit = () => {


        createCount(formData);

        navigate('/counts');
    }



    document.title = "Create Count | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Count" pageTitle="Count Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Count" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Category</Label>
                                                        <Select value={{label: selectedCategory}} onChange={handleSelectedCategory} options={CountType} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select value={{label: selectedCultureType}} onChange={handleSelectCultureType} options={CultuteType} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Count Area</Label>
                                                        <Select value={{label: selectedCountArea}} onChange={handleSelectCountArea} options={CountArea} />
                                                    </div>
                                                </Col>
                                            </Row>


                                            <Row className="gy-4 mt-3">

                                                {
                                                    CountPercent.map((count, index) => (

                                                        <Col xxl={6} md={6} className='mt-3' key={index}>
                                                            <h6 className=''>Count {index + 1}</h6>
                                                            <Row className="gy-4 mt-3 border-top">
                                                                <Col xxl={6} md={6} className='mt-3 mb-3 '>

                                                                    <Input name='count' className='form-control' placeholder={`Count${count.count}`} onChange={e => handleCounterChange(e, index)}  />
                                                                </Col>

                                                                <Col xxl={6} md={6} className='mt-3 mb-3'>

                                                                    <Input name='volume' className='form-control' placeholder={`Volume${count.volume}`} onChange={e => handleCounterChange(e, index)}  />
                                                                </Col>

                                                            </Row>
                                                        </Col>

                                                    ))
                                                }
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


        </React.Fragment>
    );
}


CreateCount.propTypes = {
    createCount: PropTypes.func.isRequired,
    getCountAreas: PropTypes.func.isRequired,
    getCountTypes: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    countType: PropTypes.object.isRequired,
    countArea: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    countType: state.countType,
    countArea: state.countArea,
    cultureType: state.cultureType,
  });
  

export default connect(mapStateToProps, {createCount, getCountAreas, getCountTypes, getCultureTypes})(CreateCount);