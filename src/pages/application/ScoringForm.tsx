import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Group,
  TextInput,
  Divider,
  NumberInput,
  TagsInput,
  Blockquote,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";
import ApplicationStep from "@/components/ApplicationStep";
import { IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { AppType, ScoringStrategy } from "@/const/enum";
import useOperation from "@/hooks/useOperation";
import {
  checkAppExistAndSetAppProperty,
  checkAppId,
  useAppProperty,
} from "./util";
import notification from "@/utils/notification";
import { addMyScoringBatch } from "@/services/api/scoringController";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const operation = useOperation();

  const [searchParams] = useSearchParams();
  const appId = searchParams.get("appId");

  const [appProperty, setAppProperty] = useAppProperty();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scorings: [
        {
          // id 仅用于遍历 key，不传给后端
          id: nanoid(),
          resultName: "",
          resultDetail: "",
          resultImageUrl: undefined,
          resultThreshold: undefined,
          resultAttributes: undefined,
        },
      ],
    },
    // 删除 id 字段，增加 appId 字段
    transformValues: (values) => ({
      scorings: values.scorings.map((scoring) => ({
        appId: Number(appId),
        resultName: scoring.resultName,
        resultDetail: scoring.resultDetail,
        resultImageUrl: scoring.resultImageUrl,
        resultThreshold: scoring.resultThreshold,
        resultAttributes: scoring.resultAttributes,
      })),
    }),
  });

  // todo 整个页面之后要改成表格形式，不能用表单，因为每个规则对应数据库的一条记录，不像 question 一样是 json 结构，因此无法实现批量更新
  useEffect(() => {
    if (
      !checkAppId(appId) ||
      !checkAppExistAndSetAppProperty(appId!, setAppProperty)
    ) {
      navigate("/application/create/step/1", { replace: true });
      return;
    }
    // if (operation === "edit") {
    //   暂时先用表单形式，只能创建评分规则，不能编辑
    //   backFill();
    // }
  }, []);

  const addScoring = () =>
    form.insertListItem("scorings", {
      id: nanoid(),
      resultName: "",
      resultDetail: "",
      resultImageUrl: undefined,
      resultThreshold: undefined,
      resultAttributes: [],
    });

  const removeScoring = (index: number) => {
    form.removeListItem("scorings", index);
  };

  const submit = async (values: API.AddMyScoringBatchRequest) => {
    const create = async () => {
      try {
        const res = await addMyScoringBatch({
          scorings: values.scorings,
        });
        const { code, message } = res.data;
        if (code !== 0) {
          notification.fail(message!);
          return;
        }
        notification.success("Save scoring successfully");
        navigate(`/application/create/completed`);
      } catch (error) {
        console.error(error);
      }
    };

    setIsLoading(true);
    if (operation === "create") {
      await create();
    } else {
      // await edit();
    }
    setIsLoading(false);
  };

  const renderForm = () => {
    return (
      <form onSubmit={form.onSubmit(submit)}>
        {form.getValues().scorings.map((socring, index) => (
          <Box key={socring.id} mb={24}>
            <Group justify="space-between" align="center">
              <Group>
                <TextInput
                  {...form.getInputProps(`scorings.${index}.resultName`)}
                  placeholder="Result Name"
                  required
                />
                <TextInput
                  {...form.getInputProps(`scorings.${index}.resultDetail`)}
                  placeholder="Result Detail"
                  required
                />
                <TextInput
                  {...form.getInputProps(`scorings.${index}.resultImageUrl`)}
                  placeholder="Result Image URL"
                />
                <NumberInput
                  {...form.getInputProps(`scorings.${index}.resultThreshold`)}
                  placeholder="Result Threshold"
                  allowNegative={false}
                  allowDecimal={false}
                  disabled={appProperty.type !== AppType.Grade}
                  required={appProperty.type === AppType.Grade}
                />
                <TagsInput
                  {...form.getInputProps(`scorings.${index}.resultAttributes`)}
                  placeholder="Enter Attributes"
                  clearable
                  w={260}
                  disabled={appProperty.type !== AppType.Evaluation}
                  required={appProperty.type === AppType.Evaluation}
                />
              </Group>
              <Button
                color="red"
                size="xs"
                pl={8}
                pr={8}
                onClick={() => removeScoring(index)}
              >
                <IconTrash size={16} />
              </Button>
            </Group>
            <Divider my="md" variant="dashed" />
          </Box>
        ))}
        <Button
          size="xs"
          onClick={addScoring}
          leftSection={<IconPlus size={16} />}
        >
          Add Scoring
        </Button>

        <Group justify="flex-end" mt="lg">
          <Button type="submit" loading={isLoading} w={100}>
            Next
          </Button>
        </Group>
      </form>
    );
  };

  return (
    <>
      <ApplicationStep active={2} />

      <Container size={1200}>
        {appProperty?.scoringStrategy === ScoringStrategy.AI && (
          <>
            <Blockquote
              color="blue"
              icon={<IconInfoCircle />}
              mt="xl"
              w={500}
              style={{ margin: "0 auto" }}
            >
              No need to create scoring rules for AI scoring strategy.
            </Blockquote>
            <Group justify="center" mt="xl">
              <Button
                onClick={() => {
                  navigate(`/application/create/completed`);
                }}
                w={100}
              >
                Next
              </Button>
            </Group>
          </>
        )}
        {appProperty?.scoringStrategy === ScoringStrategy.Custom &&
          renderForm()}
      </Container>
    </>
  );
};

export default Index;
