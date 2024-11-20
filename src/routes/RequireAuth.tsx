import { Navigate, useLocation } from "react-router-dom";
import useStore from "@/store/store";

interface Props {
  role: string[];
  children: React.ReactNode;
}

// 参考 react router 官方示例
// https://github.com/remix-run/react-router/blob/dev/examples/auth/README.md
const RequireAuth: React.FC<Props> = ({ role, children }) => {
  const location = useLocation();
  const loginUser = useStore((state) => state.loginUser);

  // 如果用户未登录，重定向到登录页面
  if (!loginUser) {
    // 这里用 notification.fail() 会渲染报错
    // 必须加 replace，否则页面后退有问题，因为页面实际跳转了两次
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户没有访问权限，重定向到主页
  if (!role.includes(loginUser.role!)) {
    // 这里用 notification.fail() 会渲染报错
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
