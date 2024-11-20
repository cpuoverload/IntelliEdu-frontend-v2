import notification from "@/utils/notification";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

// todo 编辑功能因时间原因暂未实现
const Index = () => {
  return (
    <Button
      variant="light"
      color="teal"
      size="xs"
      onClick={() => {
        notification.fail("Sorry, still working on it");
      }}
    >
      <IconEdit size={18} />
    </Button>
  );
};

export default Index;
