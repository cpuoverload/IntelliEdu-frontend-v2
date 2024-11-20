import { useCallback, useEffect, useState } from "react";
import { Card, Group, Text, Image, SimpleGrid, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { listPublicApplication } from "@/services/api/applicationController";
import { renderAppType, renderStrategy } from "@/components/Table/renderColumn";
import styles from "./style.module.less";

const Index: React.FC = () => {
  const navigate = useNavigate();

  // todo 根据应用名称搜索
  const [requestParams] = useState<API.ListPublicAppRequest>({
    current: 1,
    pageSize: 50,
    sortField: "updateTime",
    isAscend: false,
    appName: undefined,
  });
  const [records, setRecords] = useState<API.ApplicationVo[]>([]);
  // todo 分页
  const [, setTotal] = useState(0);
  // todo 加载状态展示
  const [, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listPublicApplication(requestParams);
      const { code, data } = res.data;
      if (code === 0) {
        setRecords(data?.records || []);
        setTotal(data?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData, requestParams]);

  return (
    <Box>
      <SimpleGrid cols={3} verticalSpacing={50} pl={30}>
        {records.map((record) => {
          const { id, appName, description, imageUrl, type, strategy } = record;

          return (
            <Card
              key={id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              w={360}
              className={styles.card}
              onClick={() => {
                navigate(`/solve/application/${id}`);
              }}
            >
              <Card.Section>
                <Image src={imageUrl} h={160} />
              </Card.Section>

              <Group justify="space-between" align="center" mt="md">
                <Text fw={500}>{appName}</Text>
                <Group>
                  {renderAppType(type!)}
                  {renderStrategy(strategy!)}
                </Group>
              </Group>

              <Text h={40} size="sm" c="dimmed" lineClamp={2} mt="sm">
                {description}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Index;
