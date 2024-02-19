import React, {useState} from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { Link } from 'react-router-dom';
import Select from "react-select";


const CreateCount = () => {


    
    const [selectedCultureType, setSelectedCultureType] = useState(false);
    const [selectedCountArea, setSelectedCountArea] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    function handleSelectCultureType(selectedCultureType) {
        setSelectedCultureType(selectedCultureType);
    }


    function handleSelectCountArea(selectedCountArea) {
        setSelectedCountArea(selectedCountArea);
    }

    function handleSelectProduct(selectedProduct) {
        setSelectedProduct(selectedProduct);
    }


    const handleSubmit = () => {
    }



    const categories = [
        {value: "01", label: "Seed"},
        {value: "02", label: "Feed"},
        {value: "03", label: "Chemical"},
        {value: "04", label: "Aerators"},
        {value: "05", label: "Test Kit"},
        {value: "06", label: "Other"},
    ];

    const CountArea = [
        {value: "01", label: "ONGOLE"},
        {value: "02", label: "VIZAG"},
        {value: "03", label: "ANDHRAPRDESH"},
    ];
    
    const CountPercent = [20,30,40,50,60,70,80,90,100];

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
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select value={selectedCultureType} onChange={() => { handleSelectCultureType(); }} options={categories} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Count Area</Label>
                                                        <Select value={selectedCountArea} onChange={() => { handleSelectCountArea(); }} options={CountArea} />
                                                    </div>
                                                </Col>
                                            </Row>


                                            <Row className="gy-4 mt-3">

{
  CountPercent.map((count) => (
<Col xxl={4} md={4} className='mt-3'>

  
    <div className="form-check">
                <Input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedRightDisabled" />
                <Label className="form-check-label" for="flexCheckCheckedRightDisabled">
                    {count} Count
                </Label>
            </div>
            <Input name='count' className='form-control' />
</Col>
  ))
}


</Row>
                                        </div>

                                    </CardBody>


                                    <CardFooter>
                                        <div class="d-flex align-items-start gap-3 mt-4">

                                            <Link to="/Counts" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateCount;