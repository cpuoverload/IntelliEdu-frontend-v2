import { useMemo } from "react";
import { Flex, Group } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import Table from "@/components/Table";
import useTable from "@/components/Table/useTable";
import {
  renderAppType,
  renderAuditStatus,
  renderImage,
  renderStrategy,
  renderTime,
} from "@/components/Table/renderColumn";
import TextFilter from "@/components/Table/filter/TextFilter";
import NumberFilter from "@/components/Table/filter/NumberFilter";
import SelectFilter from "@/components/Table/filter/SelectFilter";
import DeleteButton from "@/components/Table/DeleteButton";
import FakeUpdateButton from "@/components/FakeUpdateButton";
import {
  deleteApplication,
  listApplication,
} from "@/services/api/applicationController";
import { AppType, AuditStatus, ScoringStrategy } from "@/const/enum";
import AuditButton from "./AuditButton";
import TruncatedText from "@/components/TruncatedText";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: undefined,
    isAscend: undefined,
    id: undefined,
    appName: undefined,
    type: undefined,
    strategy: undefined,
    userId: undefined,
    auditStatus: undefined,
  };

  const tableProps = useTable<API.ListAppRequest, API.ApplicationVo>(
    listApplication,
    initialRequestParams
  );
  const { requestParams, setRequestParams, fetchData } = tableProps;

  const columns = useMemo<DataTableColumn<API.ApplicationVo>[]>(
    () => [
      { accessor: "id", width: "100px", sortable: true },
      { accessor: "appName", width: "160px", ellipsis: true, sortable: true },
      {
        accessor: "description",
        width: "240px",
        ellipsis: true,
        render: (record) => (
          <TruncatedText
            text={record.description!}
            textProps={{
              size: "sm",
            }}
          />
        ),
      },
      {
        accessor: "imageUrl",
        title: "Image",
        width: "150px",
        textAlign: "center",
        render: (record) => renderImage(record.imageUrl!),
      },
      {
        accessor: "type",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderAppType(record.type!),
      },
      {
        accessor: "strategy",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderStrategy(record.strategy!),
      },
      { accessor: "userId", width: "100px", sortable: true },
      {
        accessor: "auditStatus",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderAuditStatus(record.auditStatus!),
      },
      { accessor: "auditorId", width: "100px", sortable: true },
      { accessor: "auditMessage", width: "240px", ellipsis: true },
      {
        accessor: "auditTime",
        width: "190px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderTime(record.auditTime!),
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
        width: "250px",
        render: (record) => (
          <Group gap={20} justify="center" wrap="nowrap">
            <AuditButton
              appId={record.id!}
              currentStatus={record.auditStatus!}
              fetchData={fetchData}
            />
            <FakeUpdateButton />
            <DeleteButton
              record={record}
              fetchData={fetchData}
              deleteRequest={deleteApplication}
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
          <TextFilter
            placeholder="App Name"
            requestParamName="appName"
            setRequestParams={setRequestParams}
          />
          <SelectFilter
            placeholder="Type"
            requestParamName="type"
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
          <NumberFilter
            placeholder="User ID"
            requestParamName="userId"
            setRequestParams={setRequestParams}
            requestParams={requestParams}
          />
          <SelectFilter
            placeholder="Audit Status"
            requestParamName="auditStatus"
            setRequestParams={setRequestParams}
            options={[
              { value: String(AuditStatus.Pending), label: "Pending" },
              { value: String(AuditStatus.Approved), label: "Approved" },
              { value: String(AuditStatus.Rejected), label: "Rejected" },
            ]}
            valueType="number"
          />
        </Group>
      </Flex>

      <Table<API.ListAppRequest, API.ApplicationVo>
        {...tableProps}
        columns={columns}
      />
    </>
  );
};

export default Index;
