import { useEffect, useState } from "react";
import { Image, Group, Text, Box, Title } from "@mantine/core";
import { renderAppType, renderStrategy } from "@/components/Table/renderColumn";
import { getApplicationById } from "@/services/api/applicationController";
import notification from "@/utils/notification";

interface Props {
  appId: string | undefined;
}

const Index = (props: Props) => {
  const { appId } = props;

  const [app, setApp] = useState<API.ApplicationVo>();

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await getApplicationById({
          id: Number(appId),
        });
        const { code, message, data } = res.data;
        if (code !== 0) {
          notification.fail(message!);
          return;
        }
        if (!data) {
          notification.fail("No application found");
          return;
        }
        const { id, appName, description, imageUrl, type, strategy } = data!;
        setApp({
          id,
          appName,
          description,
          imageUrl,
          type,
          strategy,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchApp();
  }, [appId]);

  return (
    <>
      {app && (
        <Group
          w={1100}
          justify="space-between"
          align="flex-start"
          style={{ margin: "0 auto" }}
        >
          <Box w="50%">
            <Title>{app?.appName}</Title>
            <Group mt={20}>
              {renderAppType(app.type!)}
              {renderStrategy(app.strategy!)}
            </Group>
            <Text c="dimmed" mt={20}>
              {app?.description}
            </Text>
          </Box>
          <Group w="48%" justify="flex-end">
            <Image
              src={app.imageUrl}
              h={220}
              maw="100%"
              w="auto"
              fit="contain"
            />
          </Group>
        </Group>
      )}
    </>
  );
};

export default Index;
