
import type { UseApiCallbacks , RequestHeaders , RequestOptions} from '~/types/api';
import { useAuth } from '~/stores/auth';
import { useApp } from '~/stores/app';

export const useApi = (
  endpoint : string,
  options: RequestOptions,
  callbacks : UseApiCallbacks = {}
) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl ?? "https://lasuran-dev.jigsawme.io/api/v1/"
  const url = `https://lasuran-dev.jigsawme.io/api/v1/${endpoint}`;

 const headers: RequestHeaders = getRequestHeaders(options.headers);
//   if (callbacks.transformData) options.transform = callbacks.transformData;

  const requestOptions :RequestOptions = {
    headers,
    onResponse(response : any)  {
      if (callbacks.onSuccess instanceof Function) callbacks.onSuccess(response?.response?._data);
      return response;
    },
    onResponseError (error : any)  {
      if (callbacks.onError instanceof Function) callbacks.onError(error);
      return error;
    },
    ...options,
  };
  return useAsyncData(
    options.key ?? Math.random().toString(),
    () => $fetch(url,requestOptions),
    {
      transform: requestOptions.transform,
      immediate: requestOptions.immediate,
    },
  );
}

export const getRequestHeaders = (headers : {} = {}) => {
  const { getToken } = useAuth();
  const { getDeviceType , getServiceType , getDeliveryMethod , getLocale } = useApp();

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`,
    'Service-Type': getServiceType,
    'Delivery-Method': getDeliveryMethod,
    'Device-Type': getDeviceType,
    'Accept-Language': getLocale,
  }
  return {...defaultHeaders, ...(headers ?? {})};
}

export { endPoints }
