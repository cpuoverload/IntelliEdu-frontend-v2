import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getPublicQuestionOfOneApp } from "@/services/api/questionController";
import { addMyAnswerRecord } from "@/services/api/answerRecordController";
import notification from "@/utils/notification";
import styles from "./style.module.less";

interface Props {
  appId: string | undefined;
}

type FormValues = {
  answers: (string | undefined)[];
};

const Index = (props: Props) => {
  const { appId } = props;

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<API.QuestionContent[]>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      answers: [],
    },
    validate: {
      answers: (value) => {
        const errors = value.map((answer, index) =>
          answer ? null : `Question ${index + 1} must be answered`
        );
        return errors.some((error) => error !== null) ? errors : null;
      },
    },
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getPublicQuestionOfOneApp({
          appId: Number(appId),
        });
        const { code, message, data } = res.data;
        if (code !== 0) {
          notification.fail(message!);
          return;
        }
        if (!data) {
          notification.fail("No questions found");
          return;
        }
        const { questions } = data!;
        if (!questions || questions.length === 0) {
          notification.fail("Empty question");
          return;
        }
        setQuestions(questions);
        // 初始化值为 undefined 数组
        form.setValues({
          answers: questions.map(() => undefined),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  const submit = async (values: typeof form.values) => {
    setIsLoading(true);

    try {
      const res = await addMyAnswerRecord({
        appId: Number(appId),
        answers: values.answers as string[],
      });
      const { code, data, message } = res.data;
      if (code !== 0) {
        notification.fail(message!);
        return;
      }
      notification.success("Submit successfully");
      navigate(`/solve/result/${data}`, { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <form onSubmit={form.onSubmit(submit)}>
        {questions?.map((question, qIndex) => (
          <Radio.Group
            {...form.getInputProps(`answers.${qIndex}`)}
            key={qIndex}
            // 在表单中使用时不要设置 name，因为会通过 form.getInputProps 设置。如果设置了 name，会有选中不了的 bug。
            label={`${qIndex + 1}. ${question.title}`}
            // validate 返回的类型是 ReactNode，但实际是 (string | null)[]
            error={
              form.errors.answers?.[qIndex as keyof typeof form.errors.answers]
            }
            size="md"
            mt="lg"
            classNames={{ error: styles.error }}
          >
            {question.options?.map((option, oIndex) => (
              <Radio
                key={`${qIndex}-${oIndex}`}
                value={option.key}
                label={`${option.key}. ${option.value}`}
                mt="sm"
                size="md"
              />
            ))}
          </Radio.Group>
        ))}

        {!!questions && !!questions.length && (
          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </Group>
        )}
      </form>
    </Container>
  );
};

export default Index;
