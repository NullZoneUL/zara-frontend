import App from "@components/app";
import getComponentFromRoute from "./getComponentsFromRoute";
import { useParams } from "react-router-dom";
import { RoutesType } from "@routes/pageConfig";

const RouterManager = ({ route }: { route: RoutesType }) => {
  const Page = getComponentFromRoute(route);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = useParams();

  return (
    <App>
      <Page {...props}></Page>
    </App>
  );
};

export default RouterManager;
