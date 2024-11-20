import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

const Layout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md" pt={30}>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main ml={30} mr={30} pt={100}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
