import { Select } from "@mantine/core";

interface Props<T> {
  placeholder: string;
  requestParamName: string;
  setRequestParams: React.Dispatch<React.SetStateAction<T>>;
  options: React.ComponentProps<typeof Select>["data"];
  // Select 组件的 data 属性的 value 只能传入 string 类型，所以额外用一个 prop 表示是否是数字类型
  valueType?: "string" | "number";
}

const Index = <T,>(props: Props<T>) => {
  const {
    placeholder,
    requestParamName,
    setRequestParams,
    options,
    valueType,
  } = props;

  const filter = (val: string | null) => {
    setRequestParams((prev) => ({
      ...prev,
      [requestParamName]: val
        ? valueType === "number"
          ? Number(val)
          : val
        : undefined,
      current: 1,
    }));
  };

  return (
    <Select
      placeholder={placeholder}
      data={options}
      onChange={filter}
      clearable
    />
  );
};

export default Index;
