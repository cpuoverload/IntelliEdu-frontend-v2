import { AuditStatus } from "@/const/enum";
import { auditApplication } from "@/services/api/applicationController";
import notification from "@/utils/notification";
import { Menu, Button, rem } from "@mantine/core";
import {
  IconX,
  IconCheck,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import styles from "./style.module.less";

interface Props {
  appId: number;
  currentStatus: AuditStatus;
  fetchData: () => Promise<void>;
}

const iconStyle = { width: rem(16), height: rem(16) };

const Index = (props: Props) => {
  const { appId, currentStatus, fetchData } = props;

  const handleAudit = async (status: AuditStatus) => {
    try {
      const res = await auditApplication({
        id: appId,
        auditStatus: status,
        auditMessage: status === AuditStatus.Approved ? "Approved" : "Rejected",
      });
      const { code, message } = res.data;
      if (code !== 0) {
        notification.fail(message!);
        return;
      }
      notification.success("Operation Successful");
      // 刷新表格
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <Button
          size="xs"
          variant="light"
          color="orange"
          classNames={{ label: styles["button-label"] }}
          leftSection={
            <IconRosetteDiscountCheck
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          Audit
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Audit Status</Menu.Label>
        <Menu.Item
          disabled={currentStatus === AuditStatus.Approved}
          onClick={() => {
            handleAudit(AuditStatus.Approved);
          }}
          leftSection={<IconCheck color="green" style={iconStyle} />}
        >
          Approved
        </Menu.Item>
        <Menu.Item
          disabled={currentStatus === AuditStatus.Rejected}
          onClick={() => {
            handleAudit(AuditStatus.Rejected);
          }}
          leftSection={<IconX color="red" style={iconStyle} />}
        >
          Rejected
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Index;
