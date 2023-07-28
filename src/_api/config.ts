import { apiurls } from './apiurls';
import axios from 'utils/axios';
const baseURL = 'https://mljourney-api.goml.io/goml/';

const getUrl = (pathname: string) => {
  return baseURL + apiurls.paths[pathname as keyof Object] || '';
};

export const axiosRequest = (pathname: string, METHOD: string, inputDTO?: any, params?: any) => {
  console.log(getUrl(pathname));
  return axios({
    url: getUrl(pathname) + (params ? '?' + params : ''),
    method: METHOD,
    timeout: 600000, // Wait for 10 minutes
    ...(inputDTO && { data: inputDTO })
  });
};
