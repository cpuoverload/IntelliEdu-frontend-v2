import { useState } from "react";
import notification from "@/utils/notification";
import { listMyApplication } from "@/services/api/applicationController";
import { AppType, ScoringStrategy } from "@/const/enum";

export interface AppProperty {
  type: AppType | undefined;
  scoringStrategy: ScoringStrategy | undefined;
}

export const useAppProperty = (): [
  AppProperty,
  React.Dispatch<React.SetStateAction<AppProperty>>,
] => {
  const [appProperty, setAppProperty] = useState<AppProperty>({
    type: undefined,
    scoringStrategy: undefined,
  });
  return [appProperty, setAppProperty];
};

// 检查是否携带 appId 参数
export const checkAppId = (appId: string | null) => {
  if (appId === null) {
    notification.fail("appId is required");
    return false;
  }
  return true;
};

// 检查 app 是否存在，并设置 appProperty
export const checkAppExistAndSetAppProperty = async (
  appId: string,
  setAppProperty: React.Dispatch<React.SetStateAction<AppProperty>>
) => {
  try {
    const res = await listMyApplication({
      id: Number(appId),
    });
    const { code, data } = res.data;
    if (code !== 0) {
      notification.fail("Failed to get application");
      return false;
    }
    if (data?.total === 0) {
      notification.fail("Application not found");
      return false;
    }
    setAppProperty({
      // @ts-expect-error 可以保证只有一条记录
      type: data.records[0].type,
      // @ts-expect-error 可以保证只有一条记录
      scoringStrategy: data.records[0].strategy,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
