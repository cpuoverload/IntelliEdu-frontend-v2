import axios, { AxiosResponse, AxiosError } from "axios";
import ErrorMap from "@/const/error";
import notification from "@/utils/notification";
import useStore from "@/store/store";

type BusinessExceptionResponse = {
  code: number;
  data: null;
  message: string;
};

const apiClient = axios.create({
  // 开发环境域名默认是开发服务器的域名，会被代理。在生产环境配置为绝对 url。
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // 如果不设置 timeout，Safari 在 production 环境下会一直请求，不会超时
  // AI 生成评测结果时，需要等待较长时间，timeout 不能设置太短
  timeout: 30000, // 单位是 ms
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleResponseFulfilled = (response: AxiosResponse) => {
  const { code, message } = response.data;

  if (code === undefined) {
    notification.fail("System Error");
    return Promise.reject(response);
  }

  if (code != 0) {
    response.data.message = message || ErrorMap[code] || "System Error";
  }

  return response;
};

const handleResponseRejected = (
  error: AxiosError<BusinessExceptionResponse>
) => {
  if (!error.response) {
    notification.fail("Network Error");
    return Promise.reject(error);
  }

  const { status, data } = error.response;

  if (status === 403) {
    // 对于 /user/get/me 接口，不做任何提示，因为 App 初始化时会请求该接口，不应弹出报错提示
    if (error.config?.url?.includes("/user/get/me")) {
      return;
    }
    // 未登录，跳转到登录页
    // @ts-expect-error 403 时后端通过 response.getWriter().write 写入字符串类型 code，是特殊情况，正常 code 是 number 类型
    if (data.code === "10002") {
      const { removeUser } = useStore.getState();
      removeUser();
      notification.fail("Please login first.");
      // 在 React 组件外使用 React Router 导航，官方说不稳定
      // https://github.com/remix-run/react-router/issues/9422#issuecomment-1301182219
      // 暂时用 window.location.href 代替，但会刷新页面
      window.location.href = "/login";
      return;
    }
    notification.fail("You don't have permission to access this resource.");
    return;
  }

  // 在拦截器中统一处理错误提示，各组件中不用重复处理
  notification.fail(data.message || "System Error");

  return Promise.reject(error);
};

apiClient.interceptors.response.use(
  handleResponseFulfilled,
  handleResponseRejected
);

export default apiClient;
