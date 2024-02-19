import React, { useState} from 'react'
import PrismCode from "../../Components/Common/Prism";

const ChangeStatus = () => {

  
// Grids in Modals
const gridsModalCode =
`
<!-- Grids in modals -->

const [modal_grid, setmodal_grid] = useState(false);

function tog_grid() {
    setmodal_grid(!modal_grid);
}

<Button color="primary" onClick={() => setmodal_grid(true)}>
Launch Demo Modal
</Button>

<Modal
isOpen={modal_grid}
toggle={() => {
    tog_grid();
}}
>
<ModalHeader>
    <h5 className="modal-title">
        Grid Modals
    </h5>
    <Button
        type="button"
        onClick={() => {
            setmodal_grid(false);
        }}
        className="btn-close"
        aria-label="Close"
    >
    </Button>
</ModalHeader>
<ModalBody>
    <form action="#">
        <div className="row g-3">
            <Col xxl={6}>
                <div>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <Input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                </div>
            </Col>
            <Col xxl={6}>
                <div>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <Input type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
                </div>
            </Col>
            <div className="col-lg-12">
                <label className="form-label">Gender</label>
                <div>
                    <div className="form-check form-check-inline">
                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                        <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                    </div>
                </div>
            </div>
            <Col xxl={6}>
                <label htmlFor="emailInput" className="form-label">Email</label>
                <Input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
            </Col>
            <Col xxl={6}>
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <Input type="password" className="form-control" id="passwordInput" value="451326546" />
            </Col>
            <div className="col-lg-12">
                <div className="hstack gap-2 justify-content-end">
                    <Button color="light" onClick={() => setmodal_grid(false)}>Close</Button>
                    <Button color="primary">Submit</Button>
                </div>
            </div>
        </div>
    </form>
</ModalBody>
</Modal>
`;




  return (
   
<PrismCode
    code={gridsModalCode}
    language={("js", "css", "html")}
    plugins={["line-numbers"]}
/>
  )
}

export default ChangeStatus