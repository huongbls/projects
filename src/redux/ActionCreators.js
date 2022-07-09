import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchStaffsSalary = () => (dispatch) => {
  dispatch(staffsSalaryLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((staffsSalary) => dispatch(addStaffsSalary(staffsSalary)))
    .catch((error) => dispatch(staffsSalaryFailed(error.message)));
};

export const staffsSalaryLoading = () => ({
  type: ActionTypes.STAFFSSALARY_LOADING,
});

export const staffsSalaryFailed = (errmess) => ({
  type: ActionTypes.STAFFSSALARY_FAILED,
  payload: errmess,
});

export const addStaffsSalary = (staffsSalary) => ({
  type: ActionTypes.ADD_STAFFSSALARY,
  payload: staffsSalary,
});

export const addStaff = (newStaff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: newStaff,
});

export const postStaff =
  (
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
  (dispatch) => {
    const newStaff = {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
      salary: salary,
    };

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((res) => res.json())
      .then((res) => dispatch(addStaff(res)))
      .catch((error) => {
        console.log("post staff", error.message);
        alert("Your Staff could not be posted\nError: " + error.message);
      });
  };

export const removeStaff = (id) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: id,
});

export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Are you sure to delete this staff?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(removeStaff(id)));
  } else return;
};

export const updateStaff = (staff) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staff,
});

export const patchStaff =
  (
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
  (dispatch) => {
    const staffToUpdate = {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
      salary: salary,
    };

    return fetch(baseUrl + "staffs", {
      method: "PATCH",
      body: JSON.stringify(staffToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((res) => res.json())
      .then((res) => dispatch(updateStaff(res)))
      .catch((error) => {
        console.log("patch staff", error.message);
        alert("Your Staff could not be patched\nError: " + error.message);
      });
  };
