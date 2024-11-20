import { useMemo } from "react";
import { Flex, Group } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import Table from "@/components/Table";
import useTable from "@/components/Table/useTable";
import {
  renderAvatar,
  renderRole,
  renderTime,
} from "@/components/Table/renderColumn";
import TextFilter from "@/components/Table/filter/TextFilter";
import NumberFilter from "@/components/Table/filter/NumberFilter";
import SelectFilter from "@/components/Table/filter/SelectFilter";
import DeleteButton from "@/components/Table/DeleteButton";
import CreateUserButton from "./CreateUserButton";
import UpdateUserButton from "./UpdateUserButton";
import useStore from "@/store/store";
import { listUser, deleteUser } from "@/services/api/userController";

const Index = () => {
  const initialRequestParams = {
    current: 1,
    pageSize: 10,
    sortField: undefined,
    isAscend: undefined,
    id: undefined,
    username: undefined,
    nickname: undefined,
    role: undefined,
  };

  const tableProps = useTable<API.ListUserRequest, API.UserVo>(
    listUser,
    initialRequestParams
  );
  const { requestParams, setRequestParams, fetchData } = tableProps;

  const loginUser = useStore((state) => state.loginUser);

  const columns = useMemo<DataTableColumn<API.UserVo>[]>(
    () => [
      { accessor: "id", width: "100px", sortable: true },
      { accessor: "username", width: "150px", ellipsis: true, sortable: true },
      { accessor: "nickname", width: "150px", ellipsis: true, sortable: true },
      {
        accessor: "avatar",
        width: "120px",
        textAlign: "center",
        render: (record) => renderAvatar(record.avatar!, record.nickname!),
      },
      {
        accessor: "role",
        width: "120px",
        sortable: true,
        textAlign: "center",
        render: (record) => renderRole(record.role!),
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
        width: "150px", // 根据文档可以设置 "0%" 来自动设置宽度，但 Safari 似乎有问题
        render: (record) => (
          <Group gap={20} justify="center" wrap="nowrap">
            <UpdateUserButton record={record} fetchData={fetchData} />
            <DeleteButton
              record={record}
              fetchData={fetchData}
              deleteRequest={deleteUser}
              disabled={record.id === loginUser!.id}
            />
          </Group>
        ),
      },
    ],
    [fetchData, loginUser]
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
            placeholder="Username"
            requestParamName="username"
            setRequestParams={setRequestParams}
          />
          <TextFilter
            placeholder="Nickname"
            requestParamName="nickname"
            setRequestParams={setRequestParams}
          />
          <SelectFilter
            placeholder="Role"
            requestParamName="role"
            setRequestParams={setRequestParams}
            options={[
              { value: "admin", label: "admin" },
              { value: "user", label: "user" },
            ]}
          />
        </Group>
        <CreateUserButton fetchData={fetchData} />
      </Flex>

      <Table<API.ListUserRequest, API.UserVo>
        {...tableProps}
        columns={columns}
      />
    </>
  );
};

export default Index;
