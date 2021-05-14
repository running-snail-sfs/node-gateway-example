import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

const { create, CancelToken, isCancel } = axios;
const cancelTokens = {};
const instance = create();
const { get, post, request } = instance;
const generateIndex = ({ data = '', method = '', params = {}, url = '' }) => {
  const value = method === 'get' ? qs.stringify({ ...params, _: undefined }) : data;

  return `${url}?${typeof value === 'string' ? value : JSON.stringify(value)}`;
};
const removeCancelToken = (config) => {
  delete cancelTokens[generateIndex(config)];
};
const throttleRequest = (config) => (cancel) => {
  const index = generateIndex(config);

  if (cancelTokens[index]) {
    cancel(index);
    removeCancelToken(config);
  } else {
    cancelTokens[index] = cancel;
  }
};

instance.defaults.baseURL = '/';
// 配置发送请求前的拦截器 可以设置token信息
instance.interceptors.request.use(
  (config) => {
    return {
      ...config,
      params: {
        ...config.params,
        _: new Date() * 1,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
      cancelToken: new CancelToken(throttleRequest(config)),
    };
  },
  (error) => {
    removeCancelToken(error.config);
    message.error(error.toString());
    return Promise.reject(error);
  },
);
// 配置响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { config = {}, data = {} } = response;
    const { notTip, url = '' } = config;
    const { code: errorCode, message: errorMessage } = data;
    removeCancelToken(config);
    if (errorCode !== 200) {
      console.log('非200返回的结果');
      message.error(`${errorMessage}`);
      return Promise.reject(data);
    }
    console.log('200返回的结果',data);
    return data.data;
  },
  (error) => {
    if (!isCancel(error)) {
      removeCancelToken(error.config);
      message.error(error.toString());
    }

    return Promise.reject(error);
  },
);

function postFile(url, data = {}, options = {}) {
  return request({
    ...options,
    url,
    data,
    headers: {
      ...options.headers,
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
  });
}

function postForm(url, data = {}, options = {}) {
  return request({
    ...options,
    url,
    data: qs.stringify(data),
    headers: {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });
}

export { get, post, postFile, postForm, post as postJson };
export default instance;
