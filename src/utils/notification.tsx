import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";

const xIcon = <IconX style={{ width: rem(16), height: rem(16) }} />;
const checkIcon = <IconCheck style={{ width: rem(16), height: rem(16) }} />;

const notification = {
  success: (message: string) =>
    notifications.show({
      message,
      icon: checkIcon,
      color: "teal",
      autoClose: 3000,
      position: "top-center",
    }),
  fail: (message: string) =>
    notifications.show({
      message,
      icon: xIcon,
      color: "red",
      autoClose: 3000,
      position: "top-center",
    }),
};

export default notification;
