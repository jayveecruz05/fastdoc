import type { AxiosResponse, AxiosError } from 'axios';
import Axios, { type PayloadConfig } from '@/assets/ts/axios';

// Process ENV Details
// console.log(import.meta.env);

const api = Axios({ baseURL: import.meta.env.VITE_APP_API_BASE_URL }); // Create New Axios Instance

// console.log(api);

// API Status
// 200 == Success
// 401 == Unauthorized

export default {
  api,
  getData(payload: PayloadConfig = {}) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api.get(payload).then((response: AxiosResponse) => {
        // console.log(response);
        resolve(response);
      }).catch((error: AxiosError) => {
        // console.log(error);
        if (error.response?.status === 401) { eventBus.emit('logout'); } // Logout when status 401 == Unauthorized
        reject(error);
      });
    });
  },
  postData(payload: PayloadConfig = {}) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api.post(payload).then((response: AxiosResponse) => {
        // console.log(response);
        resolve(response);
      }).catch((error: AxiosError) => {
        // console.log(error);
        if (error.response?.status === 401) { eventBus.emit('logout'); } // Logout when status 401 == Unauthorized
        reject(error);
      });
    });
  },
  putData(payload: PayloadConfig = {}) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api.put(payload).then((response: AxiosResponse) => {
        // console.log(response);
        resolve(response);
      }).catch((error: AxiosError) => {
        // console.log(error);
        if (error.response?.status === 401) { eventBus.emit('logout'); } // Logout when status 401 == Unauthorized
        reject(error);
      });
    });
  },
  patchData(payload: PayloadConfig = {}) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api.patch(payload).then((response: AxiosResponse) => {
        // console.log(response);
        resolve(response);
      }).catch((error: AxiosError) => {
        // console.log(error);
        if (error.response?.status === 401) { eventBus.emit('logout'); } // Logout when status 401 == Unauthorized
        reject(error);
      });
    });
  },
  deleteData(payload: PayloadConfig = {}) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api.delete(payload).then((response: AxiosResponse) => {
        // console.log(response);
        resolve(response);
      }).catch((error: AxiosError) => {
        // console.log(error);
        if (error.response?.status === 401) { eventBus.emit('logout'); } // Logout when status 401 == Unauthorized
        reject(error);
      });
    });
  }
};