import { useEffect, useMemo } from "react";
import { DataTable } from "mantine-datatable";
import type { DataTableColumn, DataTableSortStatus } from "mantine-datatable";
import styles from "./style.module.less";

interface TableRequest {
  current?: number;
  pageSize?: number;
  sortField?: string;
  isAscend?: boolean;
}

export interface Props<T, U> {
  requestParams: T;
  setRequestParams: React.Dispatch<React.SetStateAction<T>>;
  fetchData: () => Promise<void>;
  records: U[];
  total: number;
  loading: boolean;
  columns: DataTableColumn<U>[];
}

const Index = <T extends TableRequest, U>(props: Props<T, U>) => {
  const {
    requestParams,
    setRequestParams,
    fetchData,
    records,
    total,
    loading,
    columns,
  } = props;

  // @ts-expect-error DataTable类型不支持默认不排序，但实际可以
  const sortStatus = useMemo<DataTableSortStatus<U>>(() => {
    if (!requestParams.sortField) return undefined;
    return {
      columnAccessor: requestParams.sortField,
      direction: requestParams.isAscend ? "asc" : "desc",
    };
  }, [requestParams.sortField, requestParams.isAscend]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams]);

  return (
    <DataTable<U>
      // 用哪列作为 map 使用的 key
      idAccessor="id"
      rowClassName={() => styles.row}
      withTableBorder
      // minHeight={180}
      // 设置高度可以使表格竖直滚动，minHeight 会失效
      // 表格最后一行无 border bottom，作者认为符合默认行为，不好调，放弃
      height={685}
      shadow="sm"
      withColumnBorders
      highlightOnHover
      pinLastColumn
      mt={20}
      fetching={loading}
      columns={columns}
      records={records}
      recordsPerPage={requestParams.pageSize!}
      totalRecords={total}
      page={requestParams.current!}
      onPageChange={(page) => {
        setRequestParams((prev) => ({ ...prev, current: page }));
      }}
      recordsPerPageOptions={[10, 20, 30, 50]}
      onRecordsPerPageChange={(size) => {
        setRequestParams((prev) => ({ ...prev, pageSize: size, current: 1 }));
      }}
      paginationText={({ from, to, totalRecords }) =>
        `Records ${from} - ${to} of ${totalRecords}`
      }
      sortStatus={sortStatus}
      onSortStatusChange={(sort) => {
        setRequestParams((prev) => ({
          ...prev,
          sortField: sort.columnAccessor,
          isAscend: sort.direction === "asc",
        }));
      }}
    />
  );
};

export default Index;
