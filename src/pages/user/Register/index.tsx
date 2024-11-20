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
import { Link, useNavigate } from "react-router-dom";
import { USERNAME, PASSWORD } from "@/const/formItem";
import { register } from "@/services/api/userController";
import notification from "@/utils/notification";

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
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const res = await register({
        username: values[USERNAME],
        password: values[PASSWORD],
      });
      const { code, message } = res.data;
      if (code == 0) {
        notification.success("Register Success, please login");
        navigate("/login", { replace: true });
      } else {
        notification.fail(message!);
      }
    } catch (err) {
      notification.fail((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Sign Up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/login">
          Login
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
