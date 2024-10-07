import type { AxiosRequestConfig } from 'axios';
import type { LoginDataType, ForgotPasswordDataType, SignUpdDataType } from '@/types/api';
import { useQuery, useMutation } from '@tanstack/vue-query';

const { api, getData, postData } = mainAPI;

const login = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'user_login';
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ apiCallID ],
    mutationFn: async (data: LoginDataType) => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await postData({ url: '/api/auth/login', data, config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['fetch_user_details'] }); // Fetch User Details
    // }
  });
};

const logout = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'user_logout';
  return useMutation({
    mutationKey: [ apiCallID ],
    mutationFn: async () => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await postData({ url: '/api/auth/logout', config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
  });
};

const fetchUserDetails = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'fetch_user_details';
  const { isFullyLoggedIn } = useCookies();
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: [ apiCallID ],
    queryFn: async () => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await getData({ url: '/api/auth/me', config, apiCancelTokenID: apiCallID }).then((response) => { return response.data.data; }).catch((error) => { throw error.response; });
    },
    // initialData: ((isFullyLoggedIn.value) ? queryClient.getQueryData([ apiCallID ]) : { first_name: null, last_name: null }),
    enabled: isFullyLoggedIn
  });
};

const forgotPassword = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'user_forgot_password';
  return useMutation({
    mutationKey: [ apiCallID ],
    mutationFn: async (data: ForgotPasswordDataType) => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await postData({ url: '/api/auth/forgot-password', data, config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
  });
};

const signUp = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'user_sign_up';
  return useMutation({
    mutationKey: [ apiCallID ],
    mutationFn: async (data: SignUpdDataType) => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await postData({ url: '/api/auth/register', data, config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
  });
};

export default {
  login,
  logout,
  fetchUserDetails,
  forgotPassword,
  signUp
};