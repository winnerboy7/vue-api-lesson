import { authHeader } from "@/middlewares";
import axios from "axios";

export const personelController = {
  countPersonel,
  getById,
  getByName,
  getPersonels,
  getByArea,
  insert,
  update,
  delete: _delete
};

function countPersonel(areaCode, personTypeCode) {
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
      .get(`/api/function/countPersonel/`, requestOptions)
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
      .get(`/api/personels/${id}`, {
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
      .get(`/api/personels/`, requestOptions)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
}

function getPersonels(areaCode, filter) {
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
      .get(`/api/personels/`, requestOptions)
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
      .get(`/api/personels/area/${areaCode}`, {
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
      .post(`/api/personels`, teacher, {
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
      .put(`/api/personels/${teacher.personId}`, teacher, {
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
      .delete(`/api/personels/${id}`, {
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