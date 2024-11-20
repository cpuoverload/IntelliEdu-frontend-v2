import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";
import router from "@/routes/router";
import { getMyInfo } from "@/services//api/userController";
import useStore from "@/store/store";

export function App() {
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  // 用户刷新页面时，全局状态会丢失，需要重新请求接口判断用户是否登录并写入 state
  // React 18 在开发阶段如果代码被 React.StrictMode 包裹，useEffect 会执行两次，属于正常现象。生产阶段只会执行一次。
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        const { code, data } = res.data;
        if (code === 0) {
          setUser(data!);
        }
      })
      .catch(() => {
        console.log("unlogin");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 添加 loading 状态，确保路由渲染前用户信息已获取到。否则，已登录用户在刷新其具有权限的页面时，又会跳到登录页面。
  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" size="xl" type="dots" />
      </Center>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
