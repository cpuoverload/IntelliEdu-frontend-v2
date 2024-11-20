import { Button, Group, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ApplicationStep from "@/components/ApplicationStep";
import useOperation from "@/hooks/useOperation";
import styles from "./style.module.less";

const Index = () => {
  const navigate = useNavigate();

  const operation = useOperation();
  const op = operation === "create" ? "Create" : "Edit";

  return (
    <>
      <ApplicationStep active={3} />

      <Title className={styles.title}>{op} successfully</Title>

      <Group justify="center" mt="xl">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to home
        </Button>
      </Group>
    </>
  );
};

export default Index;
