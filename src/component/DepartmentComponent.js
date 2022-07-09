import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

function RenderDepartment({ dep, staffNo }) {
  return (
    <div>
      <Card className="bg-light text-dark">
        <Link to={`/department/${dep.id}`}>
          <CardTitle className="text-left p-1">{dep.name}</CardTitle>
          <CardText className="text-left p-3">
            Số lượng nhân viên: {staffNo}
            {/* Số lượng nhân viên:{" "}
          {localStorage.staffs
            ? JSON.parse(localStorage.getItem("staffs")).filter(
                (x) => x.department.name === dep.name
              ).length
            : dep.numberOfStaff} */}
          </CardText>
        </Link>
      </Card>
    </div>
  );
}

function DeparmentList(props) {
  const countStaff = (depId) =>
    props.staffs.staffs.filter((staff) => staff.departmentId === depId).length;
  const deps = props.departments.departments.map((dep) => {
    return (
      <div key={dep.id} className="col-12 col-md-6 col-lg-4 p-3">
        <RenderDepartment
          dep={dep}
          staffNo={countStaff(dep.id) ? countStaff(dep.id) : 0}
        />
      </div>
    );
  });

  if (props.departments.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.departments.errMess) {
    <div className="container">
      <div className="row">
        <h4>{props.departments.errMess}</h4>
      </div>
    </div>;
  } else {
    return (
      <div className="container p-3">
        <div className="row justify-content-between">
          <div>
            <h3 className="pl-3">Phòng Ban</h3>
          </div>
        </div>
        <hr></hr>
        <div className="row">{deps}</div>
      </div>
    );
  }
}

export default DeparmentList;
