import { NavLink as RouterNavLink } from "react-router-dom";
import { Box, Divider, NavLink } from "@mantine/core";
import cx from "clsx";
import type { Config } from "@/routes/router";
import useStore from "@/store/store";
import { navRoutes } from "@/routes/router";
import styles from "./style.module.less";

const Navbar = () => {
  const loginUser = useStore((state) => state.loginUser);

  const userNavRoutes = navRoutes.filter(
    (route) => !route.role || (!!loginUser && route.role.includes("user"))
  );

  const adminNavRoutes = navRoutes.filter(
    (route) =>
      !!loginUser &&
      loginUser.role === "admin" &&
      route.role &&
      route.role.length === 1 &&
      route.role[0] === "admin"
  );

  // Active Link Styling
  // https://reactrouter.com/en/main/start/tutorial#active-link-styling

  // mantine Polymorphic components incompatible solving
  // https://mantine.dev/guides/polymorphic/#polymorphic-components-with-react-router-navlink

  const renderNav = (route: Config) => {
    return (
      <NavLink
        key={route.nav!.key}
        renderRoot={({ className, ...others }) => (
          <RouterNavLink
            className={({ isActive }) =>
              cx(
                className,
                { [styles["active-router"]]: isActive },
                styles.link
              )
            }
            to={route.nav!.path ?? route.path}
            {...others}
          >
            {route.nav!.label}
          </RouterNavLink>
        )}
      />
    );
  };

  return (
    <Box className={styles.container}>
      {userNavRoutes.map(renderNav)}

      {loginUser?.role === "admin" && (
        <>
          <Divider my="xs" label="Admin Operations" labelPosition="left" />
          {adminNavRoutes.map(renderNav)}
        </>
      )}
    </Box>
  );
};

export default Navbar;
