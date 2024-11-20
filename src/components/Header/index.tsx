import { Link } from "react-router-dom";
import { Box, Button, Group, Image, Text } from "@mantine/core";
import AvatarMenu from "@/components/AvatarMenu";
import useStore from "@/store/store";
import logo from "@/assets/logo.svg";

const Index = () => {
  const loginUser = useStore((state) => state.loginUser);

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="xs" ml={2}>
        <Image src={logo} w={40} h={40} />
        <Text
          size="30px"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          IntelliEdu
        </Text>
      </Group>

      <Box mr={10}>
        {loginUser ? (
          <AvatarMenu />
        ) : (
          <Group>
            <Button variant="default" component={Link} to="/login">
              Login
            </Button>
            <Button component={Link} to="/register">
              Sign Up
            </Button>
          </Group>
        )}
      </Box>
    </Group>
  );
};

export default Index;
