import axios, { AxiosRequestConfig } from 'axios';

import { ICredentials } from '../interfaces/authentication';
import { IRequest, IRequestError } from '../interfaces/request';

import { AUTH_ENDPOINT, API_ENDPOINT } from '../settings';

// Default error messages for failing requests.
const errorMessages: IRequestError = {
  default: 'Algo deu errado',
  noResponse: 'Sem responsta do servidor',
  network: 'Erro de rede'
};

// This function handles three types of
// errors relationed to requests.
function errorHandler(error: any): void {
  if (error.response) {
    // The server responded with a status code
    // that falls out of the range of 2xx.
    throw error.response.data || errorMessages.default;
  } else if (error.request) {
    // The request was made but no response was received.
    throw error.request.response || errorMessages.noResponse;
  } else {
    // Something went wrong in setting up the request.
    throw error.message || errorMessages.network;
  }
}

// For authentication requests.
export async function fetchAuth(credentials: ICredentials): Promise<any> {
  try {
    const response = await axios.post(AUTH_ENDPOINT, credentials);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
}

// Generic instance. For generic requests.
const genericRequest = axios.create({
  baseURL: API_ENDPOINT
});

// Capturing the JWT token with interceptors.
genericRequest.interceptors.request.use(req => {
  const newRequest = req;
  const store: string = localStorage.getItem('state');
  const state = JSON.parse(store);
  const { token } = state.authentication.user;
  newRequest.headers.common['Authorization'] = `Bearer ${token}`;
  return newRequest;
});

export async function fetch({ url, method, headers, data, params }: IRequest): Promise<any> {
  try {
    const response = await genericRequest({
      url,
      headers,
      method,
      data,
      params
    } as AxiosRequestConfig);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
}
