import { useParams } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import QuestionsForm from "./components/QuestionsForm";

const Index = () => {
  const { appId } = useParams();

  return (
    <>
      <AppHeader appId={appId} />
      <QuestionsForm appId={appId} />
    </>
  );
};

export default Index;
