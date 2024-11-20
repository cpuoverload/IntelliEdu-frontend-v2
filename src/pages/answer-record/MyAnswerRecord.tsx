import { useMemo } from "react";
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
import { listMyAnswerRecord } from "@/services/api/answerRecordController";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: "createTime",
    isAscend: false,
  };

  const tableProps = useTable<
    API.ListMyAnswerRequest,
    API.AnswerRecordVo
  >(listMyAnswerRecord, initialRequestParams);

  const columns = useMemo<DataTableColumn<API.AnswerRecordVo>[]>(
    () => [
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
    ],
    []
  );

  return (
    <Table<API.ListMyAnswerRequest, API.AnswerRecordVo>
      {...tableProps}
      columns={columns}
    />
  );
};

export default Index;
