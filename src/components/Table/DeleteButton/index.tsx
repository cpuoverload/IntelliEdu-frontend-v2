import { useState } from "react";
import { Button, Group, Popover } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import notification from "@/utils/notification";
import type { AxiosResponse } from "axios";

type IdRequest = {
  id?: number;
};

type ResponseBoolean = {
  code?: number;
  data?: boolean;
  message?: string;
};

type DeleteRequest = (
  body: IdRequest,
  options?: { [key: string]: any }
) => Promise<AxiosResponse<ResponseBoolean>>;

interface Props<U> {
  record: U;
  fetchData: () => Promise<void>;
  deleteRequest: DeleteRequest;
  disabled?: boolean;
}

type Record = {
  id?: number;
};

const Index = <U extends Record>(props: Props<U>) => {
  const { record, fetchData, deleteRequest, disabled } = props;

  const [opened, setOpened] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteRequest({
        id: record.id,
      });
      const { code, message } = res.data;
      if (code === 0) {
        notification.success("Delete Success");
        // 刷新表格
        fetchData();
      } else {
        notification.fail(message!);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover opened={opened} onChange={setOpened} withArrow shadow="md">
      <Popover.Target>
        <Button
          variant="light"
          color="red"
          size="xs"
          onClick={() => setOpened(true)}
          disabled={disabled}
        >
          <IconTrash size={18} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <Button variant="default" size="xs" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            size="xs"
            onClick={() => {
              handleDelete();
              setOpened(false);
            }}
          >
            Delete
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Index;
