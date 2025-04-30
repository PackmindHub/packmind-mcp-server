import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function axiosHttpRequest(httpConfig: AxiosRequestConfig): Promise<AxiosResponse> {
  return axios.request(httpConfig);
}
