import { createBrowserRouter } from "react-router-dom";
import { Group } from "@mantine/core";
import {
  IconApps,
  IconBox,
  // IconChartPie,
  IconCirclePlus,
  IconFileCheck,
  IconHistory,
  IconHome,
  IconListLetters,
  IconTargetArrow,
  IconUsers,
} from "@tabler/icons-react";
import RequireAuth from "./RequireAuth";
import Layout from "@/components/Layout";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import Home from "@/pages/Home";
import MyApplication from "@/pages/application/MyApplication";
import MyAnswerRecord from "@/pages/answer-record/MyAnswerRecord";
import UserManagement from "@/pages/management/UserManagement";
import ApplicationForm from "@/pages/application/ApplicationForm";
import QuestionForm from "@/pages/application/QuestionForm";
import ScoringForm from "@/pages/application/ScoringForm";
import StepComplete from "@/pages/application/StepComplete";
import AppManagement from "@/pages/management/AppManagement";
import QuestionManagement from "@/pages/management/QuestionManagement";
import ScoringManagement from "@/pages/management/ScoringManagement";
import AnswerManagement from "@/pages/management/AnswerManagement";
import SolvingQuestions from "@/pages/solve-questions/SolvingQuestions";
import SolvingResult from "@/pages/solve-questions/SolvingResult";

export interface Config {
  path?: string;
  element: JSX.Element;
  index?: boolean;
  children?: Config[];
  // 若要在导航栏展示，需设置 nav 属性
  nav?: {
    // 指定遍历的 key
    key: string;
    label: React.ReactNode;
    // index 为 true 的路由（没有 path）和嵌套路由（没有父路径），可以在这里提供路径。
    path?: string;
  };
  role?: string[];
}

// react router 不支持 vue router 的 meta，所以需要自己实现
// https://github.com/remix-run/react-router/issues/7834
const transformConfig = (config: Config[]) => {
  return config.map((route) => {
    // 创建一个新的路由对象
    const newRoute = { ...route };

    // 如果有 children，递归处理
    if (newRoute.children) {
      newRoute.children = transformConfig(newRoute.children);
    }

    // 删除多余属性
    delete newRoute.nav;

    // 如果有 role 属性，将 element 包裹在 ProtectedRoute 中
    if (newRoute.role) {
      newRoute.element = (
        <RequireAuth role={newRoute.role}>{newRoute.element}</RequireAuth>
      );
    }

    return newRoute;
  });
};

// 自定义配置文件，目的是自动生成导航栏的 Link，不需要再到导航栏组件中手写一遍全部路由以及权限校验了
export const config: Config[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        nav: {
          key: "home",
          label: (
            <Group>
              <IconHome />
              <span>Home</span>
            </Group>
          ),
          path: "/",
        },
      },
      {
        path: "/solve/application/:appId",
        element: <SolvingQuestions />,
        role: ["user", "admin"],
      },
      {
        path: "/solve/result/:answerRecordId",
        element: <SolvingResult />,
        role: ["user", "admin"],
      },
      {
        path: "/application/create/step/1",
        element: <ApplicationForm />,
        role: ["user", "admin"],
        nav: {
          key: "create-application",
          label: (
            <Group>
              <IconCirclePlus />
              <span>Create Application</span>
            </Group>
          ),
        },
      },
      {
        path: "/application/create/step/2",
        element: <QuestionForm />,
        role: ["user", "admin"],
      },
      {
        path: "/application/create/step/3",
        element: <ScoringForm />,
        role: ["user", "admin"],
      },
      {
        path: "/application/create/completed",
        element: <StepComplete />,
        role: ["user", "admin"],
      },
      {
        path: "/application/edit/step/1",
        element: <ApplicationForm />,
        role: ["user", "admin"],
      },
      {
        path: "/application/edit/step/2",
        element: <QuestionForm />,
        role: ["user", "admin"],
      },
      {
        path: "/application/edit/step/3",
        element: <ScoringForm />,
        role: ["user", "admin"],
      },
      {
        path: "/application/edit/completed",
        element: <StepComplete />,
        role: ["user", "admin"],
      },
      {
        path: "/application/me",
        element: <MyApplication />,
        role: ["user", "admin"],
        nav: {
          key: "my-application",
          label: (
            <Group>
              <IconBox />
              <span>My Application</span>
            </Group>
          ),
        },
      },
      {
        path: "/answer-record/me",
        element: <MyAnswerRecord />,
        role: ["user", "admin"],
        nav: {
          key: "my-answer-record",
          label: (
            <Group>
              <IconHistory />
              <span>My Answer Record</span>
            </Group>
          ),
        },
      },
      {
        path: "/user/management",
        element: <UserManagement />,
        role: ["admin"],
        nav: {
          key: "user-management",
          label: (
            <Group>
              <IconUsers />
              <span>User Management</span>
            </Group>
          ),
        },
      },
      {
        path: "/application/management",
        element: <AppManagement />,
        role: ["admin"],
        nav: {
          key: "application-management",
          label: (
            <Group>
              <IconApps />
              <span>Application Management</span>
            </Group>
          ),
        },
      },
      {
        path: "/question/management",
        element: <QuestionManagement />,
        role: ["admin"],
        nav: {
          key: "question-management",
          label: (
            <Group>
              <IconListLetters />
              <span>Question Management</span>
            </Group>
          ),
        },
      },
      {
        path: "/scoring/management",
        element: <ScoringManagement />,
        role: ["admin"],
        nav: {
          key: "scoring-management",
          label: (
            <Group>
              <IconTargetArrow />
              <span>Scoring Management</span>
            </Group>
          ),
        },
      },
      {
        path: "/answer/management",
        element: <AnswerManagement />,
        role: ["admin"],
        nav: {
          key: "answer-management",
          label: (
            <Group>
              <IconFileCheck />
              <span>Answer Management</span>
            </Group>
          ),
        },
      },
      {
        path: "/statistics",
        element: <>statistics</>,
        role: ["admin"],
        // todo 统计页面
        // nav: {
        //   key: "statistics",
        //   label: (
        //     <Group>
        //       <IconChartPie />
        //       <span>Statistics</span>
        //     </Group>
        //   ),
        // },
      },
      {
        path: "*",
        element: <>404 Error - Nothing here...</>,
      },
    ],
  },
];

const findNavRoutes = (routes: Config[]) => {
  let navItems: Config[] = [];

  routes.forEach((route) => {
    // 如果该路由有 nav 属性，添加到 navItems
    if (route.nav) {
      navItems.push(route);
    }
    // 如果有 children，则递归查找子路由
    if (route.children) {
      navItems = navItems.concat(findNavRoutes(route.children));
    }
  });

  return navItems;
};

export const navRoutes = findNavRoutes(config);

// @ts-expect-error react router 类型定义有点奇怪
const router = createBrowserRouter(transformConfig(config));

export default router;
