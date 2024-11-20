import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Image, Stack, Text } from "@mantine/core";
import notification from "@/utils/notification";
import { getAnswerRecordById } from "@/services/api/answerRecordController";
import { AppType } from "@/const/enum";

const Index = () => {
  const { answerRecordId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState<API.AnswerRecordVo>();

  useEffect(() => {
    const fetchAnswerRecord = async () => {
      try {
        const res = await getAnswerRecordById({
          id: Number(answerRecordId),
        });
        const { code, data, message } = res.data;
        if (code !== 0) {
          notification.fail(message!);
          return;
        }
        if (!data) {
          notification.fail("No answer record found");
          return;
        }
        const {
          appType,
          resultName,
          resultDetail,
          resultImageUrl,
          resultGrade,
        } = data;
        setResult({
          appType,
          resultName,
          resultDetail,
          resultImageUrl,
          resultGrade,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswerRecord();
  }, [answerRecordId]);

  return (
    <>
      {result && (
        <Container size={1000} mt={20}>
          <Stack align="center">
            <Text
              fz="50px"
              fw={900}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {result.resultName}
            </Text>

            <Text c="dimmed" fz="18px">
              {result.resultDetail}
            </Text>

            {result.appType === AppType.Grade && (
              <Text mt={10}>Your Grade: {result.resultGrade}</Text>
            )}

            <Image
              src={result.resultImageUrl}
              h={300}
              mah={300}
              radius="md"
              w="auto"
              fit="contain"
              mt={10}
            />

            <Button
              mt={30}
              onClick={() => {
                navigate("/");
              }}
            >
              Go back to home
            </Button>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Index;
