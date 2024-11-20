import { useEffect, useState } from "react";
import { Box, Button, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AVATAR, NICKNAME } from "@/const/formItem";
import notification from "@/utils/notification";
import useStore from "@/store/store";
import { updateMyInfo } from "@/services/api/userController";

interface Props {
  opened: boolean;
  close: () => void;
}

const Index = (props: Props) => {
  const { opened, close } = props;
  const loginUser = useStore((state) => state.loginUser);
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      [NICKNAME]: loginUser?.nickname ?? "",
      [AVATAR]: loginUser?.avatar ?? "",
    },
  });

  // 每次打开 Modal 时，重新设置表单的值，保证表单的值是最新的
  useEffect(() => {
    if (!opened) return;
    // 用 form.reset() 不合适，因为 form.reset() 会将值重置为 initialValues，由于 Modal 关闭不会销毁表单，initalValues 永远是最开始的值
    form.setValues({
      [NICKNAME]: loginUser?.nickname ?? "",
      [AVATAR]: loginUser?.avatar ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const res = await updateMyInfo({
        nickname: values[NICKNAME],
        avatar: values[AVATAR],
      });
      const { code, message } = res.data;
      if (code === 0) {
        notification.success("Update profile successfully");
        // 将更新后的用户信息写入 store
        setUser({
          ...loginUser,
          nickname: values[NICKNAME],
          avatar: values[AVATAR],
        });
        // setUser 后立马用 loginUser 拿不到最新数据，通过 useStore.getState() 才能获取最新数据，不知道为什么。不过暂时不需要用。
        close();
      } else {
        notification.fail(message!);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // todo 修改密码暂时不做，因为不能像其他字段一样回显给用户，可能需要一个单独的修改密码的页面
  return (
    <Modal opened={opened} onClose={close} title="Profile" centered>
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
          <Button type="submit" fullWidth mt="xl">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Index;
