import { forwardRef } from "react";
import { Avatar, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/store";
import { logout } from "@/services/api/userController";
import notification from "@/utils/notification";
import ProfileModal from "./ProfileModal";

// 需要用 forwardRef 的原因：Menu custom component as target
// https://mantine.dev/core/menu/#custom-component-as-target
const Index = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  (_, ref) => {
    const navigate = useNavigate();

    const loginUser = useStore((state) => state.loginUser);
    const removeUser = useStore((state) => state.removeUser);

    const [opened, { open, close }] = useDisclosure(false);

    const handleLogout = async () => {
      try {
        const res = await logout();
        const { code, message } = res.data;
        if (code == 0) {
          notification.success("Logout Success");
          // 在导航到主页后，再移除用户信息，防止 RequireAuth 组件重定向到登录页
          setTimeout(() => {
            removeUser();
          }, 100);
          navigate("/");
        } else {
          notification.fail(message!);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <Menu withArrow width={250} position="bottom">
          <Menu.Target>
            <Avatar
              ref={ref}
              src={loginUser!.avatar}
              name={loginUser!.nickname}
              color={loginUser!.nickname ? "initials" : undefined}
              style={{ cursor: "pointer" }}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{loginUser!.nickname}</Menu.Label>
            <Menu.Item
              leftSection={
                <IconUserCircle style={{ width: rem(16), height: rem(16) }} />
              }
              onClick={open}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconLogout style={{ width: rem(16), height: rem(16) }} />
              }
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <ProfileModal opened={opened} close={close} />
      </>
    );
  }
);

export default Index;
