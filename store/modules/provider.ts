import type { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/vue-query';

const { api, getData } = mainAPI;

const fetchList = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'fetch_provider_list';
  return useQuery({
    queryKey: [ apiCallID, config.params ],
    queryFn: async () => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await getData({ url: '/api/provider', config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
  });
};

const fetchProviderDetails = (filter: { id: string | null }, config: AxiosRequestConfig = {}) => {
  const apiCallID = 'fetch_provider_details';
  return useQuery({
    queryKey: [ apiCallID, filter ],
    queryFn: async () => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await getData({ url: `/api/provider/${filter.id}`, config, apiCancelTokenID: apiCallID }).then((response) => { return response.data.data; }).catch((error) => { throw error.response; });
    }
  });
};

export default {
  fetchList,
  fetchProviderDetails
};