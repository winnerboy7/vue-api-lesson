import { authHeader } from "@/middlewares";
import axios from "axios";

export const teacherController = {
  countTeacher,
  countTeacherArea,
  getById,
  getBySchoolId,
  getByName,
  getTeachers,
  getByArea,
  insert,
  update,
  delete: _delete
};

function countTeacher(areaCode, personTypeCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      personTypeCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countTeacher/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function countTeacherArea(areaCode, personTypeCode) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      personTypeCode
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/function/countTeacherArea/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getBySchoolId(schoolId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/school/${schoolId}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByName(firstName) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      firstName
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getTeachers(areaCode, filter) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      areaCode,
      filter
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getByArea(areaCode) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/teachers/area/${areaCode}`, {
        headers: authHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function insert(teacher) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/teachers`, teacher, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function update(teacher) {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/teacher/${teacher.personId}`, teacher, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/teachers/${id}`, {
        headers: authHeader()
      })
      .then(response => {
        // console.log(response.data)
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function handleError(error) {
  let errMessage = error;
  if (error.response) {
    errMessage = error.response.data.errmsg;

    if (error.response.status === 401) {
      location.href = "/login";
    }
  }
  return errMessage;
}