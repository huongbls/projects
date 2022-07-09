import React, { useState, useRef } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Label,
  Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

function RenderStaffList({ staff }) {
  return (
    <Card className="bg-light">
      <Link to={`/staff/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle className="text-center">{staff.name}</CardTitle>
      </Link>
    </Card>
  );
}

function AddStaff(props) {
  const [newId, setNewId] = useState(props.staffs.length);
  const handleSubmit = (values) => {
    setNewId(newId + 1);
    props.postStaff(
      newId,
      values.fullname,
      values.dateofbirth,
      values.salaryscale,
      values.startdate,
      values.department === "Sale"
        ? "Dept01"
        : values.department === "HR"
        ? "Dept02"
        : values.department === "Marketing"
        ? "Dept03"
        : values.department === "IT"
        ? "Dept04"
        : "Dept05",
      values.annualleave,
      values.overtime,
      "/assets/images/alberto.png",
      values.salaryscale * 3e6 + values.overtime * 2e5
    );
    props.toggleModal();
  };

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  return (
    <LocalForm onSubmit={(values) => handleSubmit(values)}>
      <Row className="form-group">
        <Label htmlFor="fullname" className="col-sm-12 col-md-4 col-form-label">
          Tên
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".fullname"
            id="fullname"
            type="text"
            name="fullname"
            className="form-control"
            placeholder="Họ và tên"
            validators={{
              required,
              minLength: minLength(2),
              maxLength: maxLength(30),
            }}
          />
          <Errors
            className="text-danger"
            model=".fullname"
            show={{ touched: true, focus: false }}
            messages={{
              required: "Yêu cầu nhập",
            }}
          />
          <Errors
            className="text-danger"
            model=".fullname"
            show="touched"
            messages={{
              minLength: "Yêu cầu nhiều hơn 2 ký tự",
              maxLength: "Yêu cầu ít hơn 30 ký tự",
            }}
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Label
          htmlFor="dateofbirth"
          className="col-sm-12 col-md-4 col-form-label"
        >
          Ngày Sinh
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".dateofbirth"
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            // value={this.state.dateofbirth}
            className="form-control"
            validators={{
              required,
            }}
          />
          <Errors
            className="text-danger"
            model=".dateofbirth"
            show="touched"
            messages={{
              required: "Yêu cầu nhập",
            }}
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Label
          htmlFor="startdate"
          className="col-sm-12 col-md-4 col-form-label"
        >
          Ngày vào công ty
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".startdate"
            type="date"
            id="startdate"
            staff
            // value={this.state.tenState}
            name="startdate"
            className="form-control"
            validators={{
              required,
            }}
          />
          <Errors
            className="text-danger"
            model=".startdate"
            show="touched"
            messages={{
              required: "Yêu cầu nhập",
            }}
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Label
          htmlFor="department"
          className="col-sm-12 col-md-4 col-form-label"
        >
          Phòng Ban
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.select
            model=".department"
            type="select"
            name="department"
            className="form-control"
            defaultValue="Sale"
          >
            <option>Sale</option>
            <option>HR</option>
            <option>Marketing</option>
            <option>IT</option>
            <option>Finance</option>
          </Control.select>
        </Col>
      </Row>
      <Row className="form-group">
        <Label
          htmlFor="salaryscale"
          className="col-sm-12 col-md-4 col-form-label"
        >
          Hệ số lương
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".salaryscale"
            type="number"
            id="salaryscale"
            name="salaryscale"
            className="form-control"
            defaultValue="1"
            min="0"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label
          htmlFor="annualleave"
          className="col-sm-12 col-md-4 col-form-label"
        >
          Số ngày nghỉ còn lại
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".annualleave"
            type="number"
            id="annualleave"
            name="annualleave"
            className="form-control"
            defaultValue="0"
            min="0"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Label htmlFor="overtime" className="col-sm-12 col-md-4 col-form-label">
          Số ngày đã làm thêm
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.text
            model=".overtime"
            type="number"
            id="overtime"
            name="overtime"
            className="form-control"
            min="0"
            defaultValue="0"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={{ size: 10, offset: 0 }}>
          <Button type="submit" color="primary">
            Thêm
          </Button>
        </Col>
      </Row>
    </LocalForm>
  );
}

function StaffList(props) {
  const staffs = props.staffs.staffs
    .sort((a, b) => {
      return a.id - b.id;
    })
    .map((staff) => {
      return (
        <div key={staff.id} className="col-6 col-md-4 col-lg-2 p-3">
          <RenderStaffList staff={staff} />
          <Button onClick={() => props.deleteStaff(staff.id)}>X</Button>
        </div>
      );
    });

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const [searchValue, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const nameStaff = React.createRef();
  const nameStaff = useRef(null);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setSearch(nameStaff.current.value.toUpperCase());
  };

  const searchStaff = props.staffs.staffs
    .filter((staff) => staff.name.toUpperCase().includes(searchValue))
    .map((staff) => {
      return (
        <div key={staff.id} className="col-6 col-md-4 col-lg-2 p-3">
          <RenderStaffList staff={staff} />
          <Button onClick={() => props.deleteStaff(staff.id)}>X</Button>
        </div>
      );
    });

  if (props.staffs.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.staffs.errMess) {
    <div className="container">
      <div className="row">
        <h4>{props.staffs.errMess}</h4>
      </div>
    </div>;
  } else {
    return (
      <div className="container p-3">
        <div className="row justify-content-between">
          <div>
            <h3 className="pl-3">Nhân Viên</h3>
          </div>
          <div>
            <Button
              type="submit"
              className="bg-dark text-white"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              <span className="fa fa-plus fa-2xl"></span>
            </Button>
          </div>
          <div>
            <Form onSubmit={submitFormHandler}>
              <FormGroup className="d-inline-block pr-3">
                <Input
                  type="text"
                  id="nameStaff"
                  name="nameStaff"
                  placeholder="Search Name"
                  defaultValue=""
                  // value={searchValue}
                  // onChange={(e) => setSearch(e.target.value.toUpperCase())}
                  innerRef={nameStaff}
                />
              </FormGroup>
              <FormGroup className="d-inline-block">
                <Button
                  type="submit"
                  value="submit"
                  color="primary"
                  className="mb-1"
                >
                  Tìm
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
        <hr></hr>
        <div className="row">{searchValue ? searchStaff : staffs}</div>
        {/* <div className="row">{staffs}</div> */}

        <Modal
          isOpen={modalIsOpen}
          toggle={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          <ModalHeader
            toggle={() => {
              setModalIsOpen(!modalIsOpen);
            }}
          >
            Thêm nhân viên
          </ModalHeader>
          <ModalBody>
            <AddStaff
              staffs={props.staffs}
              toggleModal={toggleModal}
              postStaff={props.postStaff}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;
