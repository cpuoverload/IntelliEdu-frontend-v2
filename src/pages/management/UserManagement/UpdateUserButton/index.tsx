import { useEffect, useState } from "react";
import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { AVATAR, NICKNAME, ROLE } from "@/const/formItem";
import { updateUser } from "@/services/api/userController";
import notification from "@/utils/notification";

interface Props {
  record: API.UserVo;
  fetchData: () => Promise<void>;
}

const Index = (props: Props) => {
  const { record, fetchData } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      [NICKNAME]: record.nickname,
      [AVATAR]: record.avatar,
      [ROLE]: record.role,
    },
    validate: {
      [ROLE]: hasLength({ min: 1 }, ROLE + " must be selected"),
    },
  });

  // 每次打开 Modal 时，重新设置表单的值，保证表单的值是最新的
  useEffect(() => {
    if (!opened) return;
    // 用 form.reset() 不合适，因为 form.reset() 会将值重置为 initialValues，由于 Modal 关闭不会销毁表单，initalValues 永远是最开始的值
    form.setValues({
      [NICKNAME]: record.nickname,
      [AVATAR]: record.avatar,
      [ROLE]: record.role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const res = await updateUser({
        id: record.id,
        nickname: values[NICKNAME],
        avatar: values[AVATAR],
        role: values[ROLE],
      });
      const { code, message } = res.data;
      if (code === 0) {
        notification.success("Update successfully");
        // 关闭模态框
        close();
        // 刷新表格
        fetchData();
      } else {
        notification.fail(message!);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="light" color="teal" size="xs" onClick={open}>
        <IconEdit size={18} />
      </Button>
      <Modal opened={opened} onClose={close} title="Update User" centered>
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <form onSubmit={form.onSubmit(submit)}>
            <TextInput
              {...form.getInputProps(NICKNAME)}
              key={form.key(NICKNAME)}
              label="nickname"
              placeholder={NICKNAME}
              mt="md"
            />
            <TextInput
              {...form.getInputProps(AVATAR)}
              key={form.key(AVATAR)}
              label={AVATAR}
              placeholder={AVATAR}
              mt="md"
            />
            <Select
              {...form.getInputProps(ROLE)}
              key={form.key(ROLE)}
              label="role"
              placeholder="role"
              data={["user", "admin"]}
              // 对于 Select，required 似乎没用
              required
              mt="md"
            />
            <Button type="submit" fullWidth mt="xl">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
