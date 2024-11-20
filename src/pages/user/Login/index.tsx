import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USERNAME, PASSWORD } from "@/const/formItem";
import { login } from "@/services/api/userController";
import notification from "@/utils/notification";
import useStore from "@/store/store";

const Index = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { [USERNAME]: "", [PASSWORD]: "" },
    validate: {
      [USERNAME]: hasLength(
        { min: 6 },
        USERNAME + " must be at least 6 characters"
      ),
      [PASSWORD]: hasLength(
        { min: 8 },
        PASSWORD + " must be at least 8 characters"
      ),
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const res = await login({
        username: values[USERNAME],
        password: values[PASSWORD],
      });
      const { code, message, data } = res.data;
      if (code == 0) {
        notification.success("Login Success");
        setUser(data!);
        navigate(from, { replace: true });
      } else {
        notification.fail(message!);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Login</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/register">
          Sign Up
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={form.onSubmit(submit)}>
          <TextInput
            {...form.getInputProps(USERNAME)}
            key={form.key(USERNAME)}
            label={USERNAME}
            placeholder={USERNAME}
            required
          />
          <PasswordInput
            {...form.getInputProps(PASSWORD)}
            key={form.key(PASSWORD)}
            label={PASSWORD}
            placeholder={PASSWORD}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Index;
