import { useMemo } from "react";
import { Flex, Group } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import Table from "@/components/Table";
import useTable from "@/components/Table/useTable";
import {
  renderTruncatedText,
  renderImage,
  renderTime,
  renderAppType,
  renderStrategy,
} from "@/components/Table/renderColumn";
import NumberFilter from "@/components/Table/filter/NumberFilter";
import SelectFilter from "@/components/Table/filter/SelectFilter";
import DeleteButton from "@/components/Table/DeleteButton";
import {
  deleteAnswerRecord,
  listAnswerRecord,
} from "@/services/api/answerRecordController";
import { AppType, ScoringStrategy } from "@/const/enum";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: undefined,
    isAscend: undefined,
    id: undefined,
    userId: undefined,
    appId: undefined,
    appType: undefined,
    strategy: undefined,
  };

  const tableProps = useTable<API.ListAnswerRequest, API.AnswerRecordVo>(
    listAnswerRecord,
    initialRequestParams
  );
  const { requestParams, setRequestParams, fetchData } = tableProps;

  const columns = useMemo<DataTableColumn<API.AnswerRecordVo>[]>(
    () => [
      { accessor: "id", width: "100px", sortable: true },
      { accessor: "userId", width: "100px", sortable: true },
      { accessor: "appId", width: "100px", sortable: true },
      {
        accessor: "appType",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderAppType(record.appType!),
      },
      {
        accessor: "strategy",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderStrategy(record.strategy!),
      },
      {
        accessor: "answers",
        width: "200px",
        render: (record) =>
          renderTruncatedText(JSON.stringify(record.answers!)),
      },
      { accessor: "resultId", width: "100px", sortable: true },
      { accessor: "resultName", width: "160px" },
      {
        accessor: "resultDetail",
        width: "300px",
        render: (record) => renderTruncatedText(record.resultDetail!),
      },
      {
        accessor: "resultImageUrl",
        title: "Result Image",
        width: "150px",
        textAlign: "center",
        render: (record) => renderImage(record.resultImageUrl!),
      },
      {
        accessor: "resultGrade",
        width: "140px",
        sortable: true,
        textAlign: "center",
      },
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
        width: "100px",
        render: (record) => (
          <Group gap={20} justify="center" wrap="nowrap">
            <DeleteButton
              record={record}
              fetchData={fetchData}
              deleteRequest={deleteAnswerRecord}
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
            placeholder="User ID"
            requestParamName="userId"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
          <NumberFilter
            placeholder="Application ID"
            requestParamName="appId"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
          <SelectFilter
            placeholder="Application Type"
            requestParamName="appType"
            setRequestParams={setRequestParams}
            options={[
              { value: String(AppType.Grade), label: "Grade" },
              { value: String(AppType.Evaluation), label: "Evaluation" },
            ]}
            valueType="number"
          />
          <SelectFilter
            placeholder="Strategy"
            requestParamName="strategy"
            setRequestParams={setRequestParams}
            options={[
              { value: String(ScoringStrategy.Custom), label: "Custom" },
              { value: String(ScoringStrategy.AI), label: "AI" },
            ]}
            valueType="number"
          />
        </Group>
      </Flex>

      <Table<API.ListAnswerRequest, API.AnswerRecordVo>
        {...tableProps}
        columns={columns}
      />
    </>
  );
};

export default Index;
