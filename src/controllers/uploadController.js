import { authHeader, authHeaderFile } from "@/middlewares";
import axios from "axios";

class UploadFilesService {
  upload(file, formInfo, onUploadProgress) {
    let formData = new FormData();
    formData.append("areaCode", formInfo.areaCode);
    formData.append("personType", formInfo.personType);
    formData.append("personInfo", formInfo.personInfo);
    formData.append("cgdFile", file);
    const api_url = process.env.API_URL + "/api/uploads/upload";
    //console.log("POST : " + file.name)
    return axios.post(api_url, formData, {
      headers: authHeaderFile(),
      onUploadProgress
    });

    // return axios.post(api_url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   onUploadProgress
    // });
  }

  getFiles(areaCode) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/uploads/${areaCode}`, {
          headers: authHeader()
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(this.handleError(error));
        });
    });
  }

  handleError(error) {
    // console.log({...error});

    let errMessage = error;
    if (error.response) {
      errMessage = error.response.data.errmsg;

      if (error.response.status === 401) {
        location.href = "/login";
      }
    }
    return errMessage;
  }
}

export default new UploadFilesService();
