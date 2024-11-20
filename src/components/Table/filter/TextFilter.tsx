import { TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import debounceTime from "@/const/debounce";

interface Props<T> {
  placeholder: string;
  requestParamName: string;
  setRequestParams: React.Dispatch<React.SetStateAction<T>>;
}

// 用非受控组件，更容易实现部分筛选 debounce
// 如果用受控组件，需要额外定义输入框的状态，否则难以实现部分筛选用 debounce，部分筛选或分页不使用 debounce
const Index = <T,>(props: Props<T>) => {
  const { placeholder, requestParamName, setRequestParams } = props;

  const filter = useDebouncedCallback((value: string) => {
    setRequestParams((prev) => ({
      ...prev,
      [requestParamName]: value || undefined,
      current: 1,
    }));
  }, debounceTime);

  return (
    <TextInput
      placeholder={placeholder}
      onChange={(event) => {
        filter(event.currentTarget.value);
      }}
    />
  );
};

export default Index;
