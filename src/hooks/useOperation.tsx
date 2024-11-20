import { useLocation } from "react-router-dom";

type Operation = "create" | "edit";

const useOperation = () => {
  const location = useLocation();
  const operation = location.pathname.split("/")[2] as Operation;
  return operation;
};

export default useOperation;
