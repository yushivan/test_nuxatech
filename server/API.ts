import axios from 'axios';
export const useApi = () => {
  const apiClient = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
      'cache-control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Accept-Encoding': 'gzip, compress, br',
    },
  });

  return apiClient;
};

