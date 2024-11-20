import { useEffect, useState } from "react";
import { Button, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import notification from "@/utils/notification";
import {
  MIN_QUESTION_NUMBER,
  MAX_QUESTION_NUMBER,
  MIN_OPTION_NUMBER,
  MAX_OPTION_NUMBER,
} from "@/const/ai";

interface Props {
  appId: string | null;
  aiAddQuestion: (question: API.QuestionContent) => void;
}

const Index = (props: Props) => {
  const { appId, aiAddQuestion } = props;

  const [eventSource, setEventSource] = useState<EventSource>();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      questionNumber: 10,
      optionNumber: 2,
    },
    validate: (values) => ({
      questionNumber:
        values.questionNumber < MIN_QUESTION_NUMBER ||
        values.questionNumber > MAX_QUESTION_NUMBER
          ? `Number of questions must be between ${MIN_QUESTION_NUMBER} and ${MAX_QUESTION_NUMBER}`
          : null,
      optionNumber:
        values.optionNumber < MIN_OPTION_NUMBER ||
        values.optionNumber > MAX_OPTION_NUMBER
          ? `Number of options must be between ${MIN_OPTION_NUMBER} and ${MAX_OPTION_NUMBER}`
          : null,
    }),
  });

  const submit = async (values: typeof form.values) => {
    if (eventSource) {
      return;
    }

    setIsLoading(true);

    const { questionNumber, optionNumber } = values;
    const prefix =
      import.meta.env.VITE_API_URL === "/" ? "" : import.meta.env.VITE_API_URL;
    const url = `${prefix}/api/application/question/ai_generate/sse?appId=${appId}&optionNumber=${optionNumber}&questionNumber=${questionNumber}`;
    const es = new EventSource(url, { withCredentials: true });
    setEventSource(es);

    // 连接打开时的处理
    es.onopen = () => {
      notification.success("AI is generating questions.");
    };

    // 处理收到的消息
    es.onmessage = (event) => {
      const question = JSON.parse(event.data);
      aiAddQuestion(question);
    };

    // 处理错误，后端主动关闭连接会被认为是 error，并且客户端默认会重连
    es.onerror = () => {
      es.close(); // 关闭连接
      notification.success("AI has generated all questions.");
      setEventSource(undefined);
      setIsLoading(false);
    };

    // 关闭 Modal
    close();
  };

  // 每次打开 Modal 时，重新设置表单的值
  useEffect(() => {
    if (!opened) return;

    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <>
      <Button
        size="xs"
        variant="gradient"
        gradient={{ from: "grape", to: "blue", deg: 120 }}
        onClick={open}
        leftSection={<IconPlus size={16} />}
      >
        AI Generates Questions
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="AI Generates Questions"
        centered
      >
        <form onSubmit={form.onSubmit(submit)}>
          <NumberInput
            {...form.getInputProps("questionNumber")}
            label="Number of questions"
            placeholder="Number of questions"
            min={MIN_QUESTION_NUMBER}
            max={MAX_QUESTION_NUMBER}
            allowNegative={false}
            allowDecimal={false}
            required
          />
          <NumberInput
            {...form.getInputProps("optionNumber")}
            label="Number of options"
            placeholder="Number of options"
            min={MIN_OPTION_NUMBER}
            max={MAX_OPTION_NUMBER}
            allowNegative={false}
            allowDecimal={false}
            required
          />
          <Button type="submit" loading={isLoading} fullWidth mt="xl">
            Generate
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default Index;
