import { NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import debounceTime from "@/const/debounce";

interface Params {
  [key: string]: any;
}

interface Props<T> {
  placeholder: string;
  requestParamName: string;
  setRequestParams: React.Dispatch<React.SetStateAction<T>>;
  requestParams: T;
}

const Index = <T extends Params>(props: Props<T>) => {
  const { placeholder, requestParamName, setRequestParams, requestParams } =
    props;

  const filter = useDebouncedCallback((val: string | number) => {
    setRequestParams((prev) => ({
      ...prev,
      [requestParamName]: val === "" ? undefined : (val as number),
      current: 1,
    }));
  }, debounceTime);

  return (
    // NumberInput 组件在 value prop 是 string 类型时，有不少问题，用 number 类型了
    // 当 value prop 为数字类型时，清空输入框，value 会变为空字符串类型，这是符合预期的行为，不然没办法判断是否清空输入框
    // https://github.com/mantinedev/mantine/issues/6648#issuecomment-2277645510
    <NumberInput
      placeholder={placeholder}
      onChange={(val) => {
        // 当 val 为字符串类型时，blur 时会再次触发 onChange，可能是个 bug，这里临时解决下
        // 清空时会变为空串
        if (val === "" && requestParams[requestParamName] === undefined) {
          return;
        }
        // 当 val 值较大时，会自动转换为字符串类型
        if (
          typeof val === "string" &&
          typeof requestParams[requestParamName] === "string" &&
          val === requestParams[requestParamName]
        ) {
          return;
        }
        filter(val);
      }}
      allowNegative={false}
      allowDecimal={false}
      // hideControls
    />
  );
};
export default Index;
