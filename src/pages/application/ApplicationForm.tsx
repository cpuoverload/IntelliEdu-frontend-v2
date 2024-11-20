import { useState } from "react";
import { Button, Container, Group, Radio, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import ApplicationStep from "@/components/ApplicationStep";
import notification from "@/utils/notification";
import { addMyApplication } from "@/services/api/applicationController";
import {
  AI,
  APP_NAME,
  CUSTOM,
  DESCRIPTION,
  EVALUATION,
  GRADE,
  IMAGE_URL,
  STRATEGY,
  TYPE,
} from "@/const/formItem";
import { AppType, ScoringStrategy } from "@/const/enum";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      [APP_NAME]: "",
      [DESCRIPTION]: undefined,
      [IMAGE_URL]: undefined,
      [TYPE]: EVALUATION,
      [STRATEGY]: AI,
    },
    validate: {
      [APP_NAME]: hasLength(
        { min: 3 },
        APP_NAME + " must be at least 3 characters"
      ),
    },
  });

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      const res = await addMyApplication({
        appName: values[APP_NAME],
        description: values[DESCRIPTION],
        imageUrl: values[IMAGE_URL],
        type: values[TYPE] === GRADE ? AppType.Grade : AppType.Evaluation,
        strategy:
          values[STRATEGY] === CUSTOM
            ? ScoringStrategy.Custom
            : ScoringStrategy.AI,
      });
      const { code, data, message } = res.data;
      if (code === 0) {
        notification.success("Save application successfully");
        navigate(`/application/create/step/2?appId=${data}`);
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
      <ApplicationStep active={0} />

      <Container w={600}>
        <form onSubmit={form.onSubmit(submit)}>
          <TextInput
            {...form.getInputProps(APP_NAME)}
            key={form.key(APP_NAME)}
            label="Application Name"
            placeholder="Application Name"
            required
          />
          <TextInput
            {...form.getInputProps(DESCRIPTION)}
            key={form.key(DESCRIPTION)}
            label="Description"
            placeholder="Description"
            mt="lg"
          />
          <TextInput
            {...form.getInputProps(IMAGE_URL)}
            key={form.key(IMAGE_URL)}
            label="Image URL"
            placeholder="Image URL"
            mt="lg"
          />
          <Radio.Group
            {...form.getInputProps(TYPE)}
            key={form.key(TYPE)}
            label="Application Type"
            description="Note: The application type cannot be changed after creation."
            withAsterisk
            mt="lg"
          >
            <Group mt="xs">
              {/* 事实上 Radio value 只支持 string 类型 */}
              <Radio value={GRADE} label="Grade" />
              <Radio value={EVALUATION} label="Evaluation" />
            </Group>
          </Radio.Group>
          <Radio.Group
            {...form.getInputProps(STRATEGY)}
            key={form.key(STRATEGY)}
            label="Scoring Strategy"
            description="Note: The scoring strategy cannot be changed after creation."
            withAsterisk
            mt="lg"
          >
            <Group mt="xs">
              <Radio value={CUSTOM} label="Custom" />
              <Radio value={AI} label="AI" />
            </Group>
          </Radio.Group>
          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={isLoading} w={100}>
              Next
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default Index;
