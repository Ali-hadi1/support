import axios, { AxiosError, HttpStatusCode } from 'axios';
import { type AxiosRequestConfig } from 'axios';
import userStore from '~/stores/userStore';
import type { OdooRPCResponse } from '~/types/odoo-rpc-response';
import { HttpError } from './http-error';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

/**
 * Axios request interceptor
 */
http.interceptors.request.use(async (request: any) => {
  try {
    if (!request.headers) {
      request.headers = {};
    }

    return request;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return Promise.reject(error);
  }
});

/**
 * Add a response interceptor
 */
http.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      userStore.getState().clearUser();
    }
    return Promise.reject(error);
  }
);

/**
 * Create a http get request
 */
export async function getRequest<T = any>(
  endpoint: string,
  params: object = {},
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response = await http.post<OdooRPCResponse<T>>(endpoint, params, config);
    if (response.data && response.data.result !== undefined) {
      let result = response.data.result;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Failed to parse result as JSON:', parseError);
        }
      }
      return result as T;
    }
    return response.data as T;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http post request
 */
export async function postRequest<T = any>(
  endpoint: string,
  data?: object,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response = await http.post<OdooRPCResponse<T>>(endpoint, data, config);
    if (response.data && response.data.result !== undefined) {
      let result = response.data.result;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Failed to parse result as JSON:', parseError);
        }
      }
      return result as T;
    }
    return response.data as T;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http put request
 */
export async function putRequest<T = any>(
  endpoint: string,
  data?: object,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response = await http.put<OdooRPCResponse<T>>(endpoint, data, config);
    if (response.data && response.data.result !== undefined) {
      let result = response.data.result;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Failed to parse result as JSON:', parseError);
        }
      }
      return result as T;
    }
    return response.data as T;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http patch request
 */
export async function patchRequest<T = any>(
  endpoint: string,
  data?: object,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response = await http.patch<OdooRPCResponse<T>>(endpoint, data, config);
    if (response.data && response.data.result !== undefined) {
      let result = response.data.result;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Failed to parse result as JSON:', parseError);
        }
      }
      return result as T;
    }
    return response.data as T;
  } catch (error: any) {
    throw new HttpError(error);
  }
}

/**
 * Create a http delete request
 */
export async function deleteRequest<T = any>(
  endpoint: string,
  params?: object,
  config?: AxiosRequestConfig<any> | undefined
): Promise<T> {
  try {
    const response = await http.delete<OdooRPCResponse<T>>(endpoint, { params, ...config });
    if (response.data && response.data.result !== undefined) {
      let result = response.data.result;
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result);
        } catch (parseError) {
          console.error('Failed to parse result as JSON:', parseError);
        }
      }
      return result as T;
    }
    return response.data as T;
  } catch (error: any) {
    throw new HttpError(error);
  }
}
