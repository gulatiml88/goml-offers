import { apiurls } from './apiurls';
import axios from 'utils/axios';
const baseURL = 'http://54.156.25.88/goml/';

const getUrl = (pathname: string) => {
  return baseURL + apiurls.paths[pathname as keyof Object] || '';
};

export const axiosRequest = (pathname: string, METHOD: string, inputDTO?: any, params?: any) => {
  const accessToken = localStorage.getItem('serviceToken') || null;

  return axios({
    url: getUrl(pathname) + (params ? '?' + params : ''),
    method: METHOD,
    ...(inputDTO && { data: inputDTO }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: '*/*',
      ...(accessToken && { Authorization: 'Bearer ' + accessToken })
    }
  });
};
