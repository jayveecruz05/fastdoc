'use strict';

// Axios
import Axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Type Checker
type InstanceConfig = { baseURL?: string, headers?: any };
export type PayloadConfig = { url?: string, data?: any, config?: AxiosRequestConfig, apiCancelToken?: string, apiCancelTokenID?: string };

const api = (instanceConfig: InstanceConfig = {}) => {
  const { baseURL = '', headers = {} } = instanceConfig;
  
  const CancelToken = Axios.CancelToken;
  const generateApiCancelToken = () => (`api_cancel_token_${Math.floor(Math.random() * Date.now()).toString(36).slice(2)}`);
  let apiCallList: any = {};
  
  // Process ENV Details
  // console.log(import.meta.env);
  
  // Create New Axios Instance And Default Configurations
  const axiosInstance = Axios.create({ baseURL, headers });
  
  // console.log(axiosInstance.defaults);
  
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log(config);
      eventBus.emit('progress', 'initiate'); // For every request start the progress
      return config;
    },
    (error) => {
      // console.log(error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log(response);
      if (Object.keys(apiCallList).length <= 1) { eventBus.emit('progress', 'success'); } // Finish when a response is received
      return response;
    },
    (error) => {
      // console.log(error);
      if (Axios.isCancel(error)) {
        eventBus.emit('progress', 'stop'); // Stop when a response is canceled
      } else {
        eventBus.emit('progress', 'error'); // Fail when a response is failed
      }
      return Promise.reject(error);
    }
  );
  
  return {
    config: { baseURL, headers },
    generateApiCancelToken,
    getAuthorization() {
      return axiosInstance.defaults.headers.common['Authorization'];
    },
    setAuthorization(token?: string | null) {
      // console.log(token);
      // Set Authorization
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    },
    cancelCurrentApiCall(cancelToken?: string | string[] | { id: string } | null) {
      const cancelSourceList = Object.keys(apiCallList);
      if (cancelToken && typeof cancelToken === 'string') {
        const cancelRequest = apiCallList[cancelToken];
        if (cancelRequest) { cancelRequest(`Cancel "${cancelToken}" API Call.`) }
      } else if (cancelToken && Array.isArray(cancelToken) && cancelToken.length > 0) {
        cancelToken.forEach((apiCancelToken) => {
          const cancelRequest = apiCallList[apiCancelToken];
          if (cancelRequest) { cancelRequest(`Cancel "${apiCancelToken}" API Call.`) }
        });
      } else if (cancelToken && typeof cancelToken === 'object' && 'id' in cancelToken) {
        const cancelSourceListByID = cancelSourceList.filter((key) => (key.split('__')[0] === cancelToken.id));
        cancelSourceListByID.forEach((apiCancelToken) => { apiCallList[apiCancelToken](`Cancel "${apiCancelToken}" API Call.`); });
      } else if (!cancelToken && cancelSourceList.length > 0) {
        cancelSourceList.forEach((apiCancelToken) => { apiCallList[apiCancelToken]('Cancel All Current API Call.'); });
        apiCallList = {};
      }
    },
    get(payload: PayloadConfig = {}) {
      const { url = '', config = {}, apiCancelToken = generateApiCancelToken(), apiCancelTokenID } = payload;
      const currentApiCancelToken = (!!apiCancelTokenID) ? `${apiCancelTokenID}__${apiCancelToken}` : apiCancelToken;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosInstance.get(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [currentApiCancelToken]: cancelSource }; })
        }).then(
          (response: AxiosResponse) => {
            // console.log(response);
            delete apiCallList[currentApiCancelToken];
            resolve(response);
          }
        ).catch(
          (error: AxiosError) => {
            // console.log(error);
            delete apiCallList[currentApiCancelToken];
            reject(error);
            // if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    post(payload: PayloadConfig = {}) {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken(), apiCancelTokenID } = payload;
      const currentApiCancelToken = (!!apiCancelTokenID) ? `${apiCancelTokenID}__${apiCancelToken}` : apiCancelToken;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosInstance.post(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [currentApiCancelToken]: cancelSource }; })
        }).then(
          (response: AxiosResponse) => {
            // console.log(response);
            delete apiCallList[currentApiCancelToken];
            resolve(response);
          }
        ).catch(
          (error: AxiosError) => {
            // console.log(error);
            delete apiCallList[currentApiCancelToken];
            reject(error);
            // if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    put(payload: PayloadConfig = {}) {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken(), apiCancelTokenID } = payload;
      const currentApiCancelToken = (!!apiCancelTokenID) ? `${apiCancelTokenID}__${apiCancelToken}` : apiCancelToken;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosInstance.put(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [currentApiCancelToken]: cancelSource }; })
        }).then(
          (response: AxiosResponse) => {
            // console.log(response);
            delete apiCallList[currentApiCancelToken];
            resolve(response);
          }
        ).catch(
          (error: AxiosError) => {
            // console.log(error);
            delete apiCallList[currentApiCancelToken];
            reject(error);
            // if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    patch(payload: PayloadConfig = {}) {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken(), apiCancelTokenID } = payload;
      const currentApiCancelToken = (!!apiCancelTokenID) ? `${apiCancelTokenID}__${apiCancelToken}` : apiCancelToken;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosInstance.patch(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [currentApiCancelToken]: cancelSource }; })
        }).then(
          (response: AxiosResponse) => {
            // console.log(response);
            delete apiCallList[currentApiCancelToken];
            resolve(response);
          }
        ).catch(
          (error: AxiosError) => {
            // console.log(error);
            delete apiCallList[currentApiCancelToken];
            reject(error);
            // if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    delete(payload: PayloadConfig = {}) {
      const { url = '', config = {}, apiCancelToken = generateApiCancelToken(), apiCancelTokenID } = payload;
      const currentApiCancelToken = (!!apiCancelTokenID) ? `${apiCancelTokenID}__${apiCancelToken}` : apiCancelToken;
      return new Promise<AxiosResponse>((resolve, reject) => {
        axiosInstance.delete(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [currentApiCancelToken]: cancelSource }; })
        }).then(
          (response: AxiosResponse) => {
            // console.log(response);
            delete apiCallList[currentApiCancelToken];
            resolve(response);
          }
        ).catch(
          (error: AxiosError) => {
            // console.log(error);
            delete apiCallList[currentApiCancelToken];
            reject(error);
            // if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    }
  };
};

export default api;