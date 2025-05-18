
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

  const toast = useToast()


 const headers: RequestHeaders = getRequestHeaders(options.headers);
//   if (callbacks.transformData) options.transform = callbacks.transformData;

  const requestOptions :RequestOptions = {
    headers,
    onResponse(response : any)  {
        let data = response?.response?._data;
      if (callbacks.onSuccess instanceof Function && data?.status) callbacks.onSuccess(data);
      // else if(!data?.status) {
      //     toast.add({title : data?.message, color:'error'});
      // }
      return response;
    },
    onResponseError (error : any)  {
        if (error?.response?._data?.message)
            toast.add({title : error?.response?._data?.message, color:'error' });

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
