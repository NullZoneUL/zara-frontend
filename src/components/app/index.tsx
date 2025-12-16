import { ReactNode } from "react";
import { ScrollRestoration } from "react-router-dom";

interface AppInterface {
  children: ReactNode;
}

const App = ({ children }: AppInterface) => {
  return (
    <>
      <main className="page-container">{children}</main>
      <ScrollRestoration />
    </>
  );
};

export default App;
