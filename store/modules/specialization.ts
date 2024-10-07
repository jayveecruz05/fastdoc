import type { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/vue-query';

const { api, getData } = mainAPI;

const fetchList = (config: AxiosRequestConfig = {}) => {
  const apiCallID = 'fetch_specialization_list';
  return useQuery({
    queryKey: [ apiCallID ],
    queryFn: async () => {
      api.cancelCurrentApiCall({ id: apiCallID });
      return await getData({ url: '/api/specialization', config, apiCancelTokenID: apiCallID }).then((response) => { return response.data; }).catch((error) => { throw error.response; });
    }
  });
};

export default {
  fetchList
};