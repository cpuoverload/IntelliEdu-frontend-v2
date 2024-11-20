import useOperation from "@/hooks/useOperation";
import { Stepper } from "@mantine/core";

interface Props {
  active: number;
}

const Index = (props: Props) => {
  const { active } = props;

  const operation = useOperation();
  const op = operation === "create" ? "Create" : "Edit";

  return (
    <Stepper active={active} pl={200} pr={200} mb={50}>
      <Stepper.Step label={`${op} an application`} allowStepSelect={false} />
      <Stepper.Step label={`${op} questions`} allowStepSelect={false} />
      <Stepper.Step label={`${op} scoring rules`} allowStepSelect={false} />
      <Stepper.Completed>{null}</Stepper.Completed>
    </Stepper>
  );
};

export default Index;
