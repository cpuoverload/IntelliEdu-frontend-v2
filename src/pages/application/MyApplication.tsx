import { useMemo } from "react";
import { Group } from "@mantine/core";
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
import DeleteButton from "@/components/Table/DeleteButton";
import TruncatedText from "@/components/TruncatedText";
import FakeUpdateButton from "@/components/FakeUpdateButton";
import {
  deleteMyApplication,
  listMyApplication,
} from "@/services/api/applicationController";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: "updateTime",
    isAscend: false,
  };

  const tableProps = useTable<API.ListMyAppRequest, API.ApplicationVo>(
    listMyApplication,
    initialRequestParams
  );
  const { fetchData } = tableProps;

  const columns = useMemo<DataTableColumn<API.ApplicationVo>[]>(
    () => [
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
        render: (record) => renderTime(record.auditTime),
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
        width: "150px",
        render: (record) => (
          <Group gap={20} justify="center" wrap="nowrap">
            <FakeUpdateButton />
            <DeleteButton
              record={record}
              fetchData={fetchData}
              deleteRequest={deleteMyApplication}
            />
          </Group>
        ),
      },
    ],
    [fetchData]
  );

  return (
    <Table<API.ListMyAppRequest, API.ApplicationVo>
      {...tableProps}
      columns={columns}
    />
  );
};

export default Index;
