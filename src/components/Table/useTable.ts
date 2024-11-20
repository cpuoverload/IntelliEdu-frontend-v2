import { useCallback, useState } from "react";
import type { AxiosResponse } from "axios";

type PageVo<T> = {
  records?: T[];
  total?: number;
  size?: number;
  current?: number;
};

type ApiResponsePageVo<T> = {
  code?: number;
  data?: PageVo<T>;
  message?: string;
};

type Request<T, U> = (
  body: T,
  options?: { [key: string]: any }
) => Promise<AxiosResponse<ApiResponsePageVo<U>>>;

const useTable = <T, U>(request: Request<T, U>, initialRequestParams: T) => {
  const [requestParams, setRequestParams] = useState<T>(initialRequestParams);
  const [records, setRecords] = useState<U[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request(requestParams);
      const { code, data } = res.data;
      if (code === 0) {
        setRecords(data?.records || []);
        setTotal(data?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [request, requestParams]);

  return {
    requestParams,
    setRequestParams,
    fetchData,
    records,
    total,
    loading,
  };
};

export default useTable;
