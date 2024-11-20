import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App.tsx";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.css";

const theme = createTheme({
  components: {
    // 修改表头样式
    Table: {
      styles: {
        thead: {
          backgroundColor: "#f0f0f0",
          color: "#333",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <App />
    </MantineProvider>
  </StrictMode>
);
