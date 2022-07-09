import React, { useState } from "react";
import {
  Card,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import dateFormat from "dateformat";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function ReviseStaff({ staff, patchStaff, toggleModal }) {
  const handleSubmit = (values) => {
    patchStaff(
      staff.id,
      values.fullname,
      values.dateofbirth === "" ? staff.doB : values.dateofbirth,
      values.salaryscale,
      values.startdate === "" ? staff.startDate : values.startdate,
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
    toggleModal();
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
          <Control.Text
            model=".fullname"
            id="fullname"
            type="text"
            name="fullname"
            className="form-control"
            defaultValue={staff.name}
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
          <Control.Text
            model=".dateofbirth"
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            className="form-control"
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
          <Control.Text
            model=".startdate"
            type="date"
            id="startdate"
            name="startdate"
            className="form-control"
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
          <Control.Select
            model=".department"
            type="select"
            name="department"
            className="form-control"
            defaultValue={
              staff.departmentId === "Dept01"
                ? "Sale"
                : staff.departmentId === "Dept02"
                ? "HR"
                : staff.departmentId === "Dept03"
                ? "Marketing"
                : staff.departmentId === "Dept04"
                ? "IT"
                : "Finance"
            }
          >
            <option>Sale</option>
            <option>HR</option>
            <option>Marketing</option>
            <option>IT</option>
            <option>Finance</option>
          </Control.Select>
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
          <Control.Text
            model=".salaryscale"
            type="number"
            step="0.1"
            id="salaryscale"
            name="salaryscale"
            className="form-control"
            defaultValue={staff.salaryScale}
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
          <Control.Text
            model=".annualleave"
            type="number"
            id="annualleave"
            name="annualleave"
            className="form-control"
            defaultValue={staff.annualLeave}
            min="0"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Label htmlFor="overtime" className="col-sm-12 col-md-4 col-form-label">
          Số ngày đã làm thêm
        </Label>
        <Col className="col-sm-12 col-md-8">
          <Control.Text
            model=".overtime"
            type="number"
            id="overtime"
            name="overtime"
            className="form-control"
            min="0"
            defaultValue={staff.overTime}
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={{ size: 10, offset: 0 }}>
          <Button type="submit" color="primary">
            Cập nhập
          </Button>
        </Col>
      </Row>
    </LocalForm>
  );
}

function RenderStaffImg({ staff }) {
  return (
    <div className="col-12 col-md-4 col-lg-3 pb-3">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.8) translateY(50%)",
        }}
      >
        <Card>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
        </Card>
      </FadeTransform>
    </div>
  );
}
function RenderStaffInfo({ staff }) {
  if (staff != null) {
    return (
      <div className="col-12 col-md-8 col-lg-9 pb-3">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.8) translateY(50%)",
          }}
        >
          <h4>Họ và tên: {staff.name}</h4>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>
            Phòng ban:{" "}
            {staff.departmentId === "Dept01"
              ? "Sale"
              : staff.departmentId === "Dept02"
              ? "HR"
              : staff.departmentId === "Dept03"
              ? "Marketing"
              : staff.departmentId === "Dept04"
              ? "IT"
              : "Finance"}
          </p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày nghỉ làm thêm: {staff.overTime}</p>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân Viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderStaffImg staff={props.staff} />
          <RenderStaffInfo staff={props.staff} />
          <div className="col-12 col-md-8 col-lg-9 pb-3">
            <FadeTransform
              in
              transformProps={{
                exitTransform: "scale(0.8) translateY(50%)",
              }}
            >
              <Button
                type="submit"
                className="bg-gray text-white border-0"
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                <span className="fa fa-pencil fa-lg"> Chỉnh sửa thông tin</span>
              </Button>
            </FadeTransform>
          </div>
        </div>
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
            Chỉnh sửa thông tin
          </ModalHeader>
          <ModalBody>
            <ReviseStaff
              staff={props.staff}
              toggleModal={toggleModal}
              patchStaff={props.patchStaff}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
