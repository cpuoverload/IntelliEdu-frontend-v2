import { useMemo } from "react";
import { Flex, Group } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import Table from "@/components/Table";
import useTable from "@/components/Table/useTable";
import {
  renderTruncatedText,
  renderTime,
} from "@/components/Table/renderColumn";
import NumberFilter from "@/components/Table/filter/NumberFilter";
import DeleteButton from "@/components/Table/DeleteButton";
import FakeUpdateButton from "@/components/FakeUpdateButton";
import {
  deleteQuestion,
  listQuestion,
} from "@/services/api/questionController";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: undefined,
    isAscend: undefined,
    id: undefined,
    appId: undefined,
    userId: undefined,
  };

  const tableProps = useTable<API.ListQuestionRequest, API.QuestionVo>(
    listQuestion,
    initialRequestParams
  );
  const { requestParams, setRequestParams, fetchData } = tableProps;

  const columns = useMemo<DataTableColumn<API.QuestionVo>[]>(
    () => [
      { accessor: "id", width: "100px", sortable: true },
      {
        accessor: "questions",
        width: "400px",
        ellipsis: true,
        render: (record) =>
          renderTruncatedText(JSON.stringify(record.questions!)),
      },
      { accessor: "appId", width: "100px", sortable: true },
      { accessor: "userId", width: "100px", sortable: true },
      {
        accessor: "createTime",
        width: "190px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderTime(record.createTime!),
      },
      {
        accessor: "updateTime",
        width: "190px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderTime(record.updateTime!),
      },
      {
        accessor: "actions",
        textAlign: "center",
        width: "150px",
        render: (record) => (
          <Group gap={20} justify="center" wrap="nowrap">
            <FakeUpdateButton />
            <DeleteButton
              record={record}
              fetchData={fetchData}
              deleteRequest={deleteQuestion}
            />
          </Group>
        ),
      },
    ],
    [fetchData]
  );

  return (
    <>
      <Flex justify="space-between" align="center">
        <Group gap="lg">
          <NumberFilter
            placeholder="ID"
            requestParamName="id"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
          <NumberFilter
            placeholder="Application ID"
            requestParamName="appId"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
          <NumberFilter
            placeholder="User ID"
            requestParamName="userId"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
        </Group>
      </Flex>

      <Table<API.ListQuestionRequest, API.QuestionVo>
        {...tableProps}
        columns={columns}
      />
    </>
  );
};

export default Index;
