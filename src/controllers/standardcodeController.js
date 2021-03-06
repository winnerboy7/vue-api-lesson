import { authHeader } from "@/middlewares";
import axios from "axios";

export const standardcodeController = {
  getPrefix,
  getGender,
  getNationality,
  getSubdistrict,
  getDistrict,
  getProvince,
  getPersonTypeCode,
  getPositionCode,
  getTeachAcademicLevelCode,
  getAcademicStandingCode,
  getTeachSubjectCode
};
function getPrefix() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/prefix/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getGender() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/gender/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getNationality() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/nationality/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getSubdistrict(district_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      district_id
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/subdistrict/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getDistrict(province_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    params: {
      province_id
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/district/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getProvince() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/province/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getPersonTypeCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/persontype/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getPositionCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/position/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getTeachAcademicLevelCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/academicLevel/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getAcademicStandingCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/academicStanding/`, {
        headers : authHeader(),
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getTeachSubjectCode() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/standardcode/teachSubject/`, {
        headers : authHeader(),
      })
      .then(response => {
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