import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import DeparmentList from "./DepartmentComponent";
import DepartmentStaffDetail from "./DepartmentDetailComponent";
import SalaryList from "./SalaryComponent";
import "../App.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchStaffsSalary,
  postStaff,
  deleteStaff,
  patchStaff,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (
    id,
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image,
    salary
  ) =>
    dispatch(
      postStaff(
        id,
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime,
        image,
        salary
      )
    ),
  patchStaff: (
    id,
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image,
    salary
  ) =>
    dispatch(
      patchStaff(
        id,
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime,
        image,
        salary
      )
    ),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffsSalary: () => {
    dispatch(fetchStaffsSalary());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
});

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          patchStaff={this.props.patchStaff}
          // postStaff={this.props.postStaff}
        />
      );
    };

    const DepartmentWithId = ({ match }) => {
      return (
        <DepartmentStaffDetail
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.deptId
          )}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                exact
                path="/staff"
                component={() => (
                  <StaffList
                    postStaff={this.props.postStaff}
                    staffs={this.props.staffs}
                    deleteStaff={this.props.deleteStaff}
                    patchStaff={this.props.patchStaff}
                  />
                )}
              />
              <Route path="/staff/:staffId" component={StaffWithId} />
              <Route
                exact
                path="/department"
                component={() => (
                  <DeparmentList
                    departments={this.props.departments}
                    staffs={this.props.staffs}
                  />
                )}
              />
              <Route path="/department/:deptId" component={DepartmentWithId} />
              <Route
                exact
                path="/salary"
                component={() => (
                  <SalaryList staffsSalary={this.props.staffsSalary} />
                )}
              />
              <Redirect to="/staff" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
