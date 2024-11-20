import { Tooltip, Text } from "@mantine/core";

interface Props {
  text: string;
  width?: number | string;
  textProps?: React.ComponentProps<typeof Text>;
}

// todo 有问题，没有超出最大宽度时也会显示 tooltip
const TruncatedText = (props: Props) => {
  const { text, width = "100%", textProps } = props;
  return (
    <Tooltip
      label={text}
      transitionProps={{ transition: "fade", duration: 300 }}
      withArrow
      multiline
      w={450}
    >
      <Text
        style={{
          width,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        {...textProps}
      >
        {text}
      </Text>
    </Tooltip>
  );
};

export default TruncatedText;
