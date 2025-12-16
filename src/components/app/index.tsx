import { ReactNode, createContext, useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';

interface AppInterface {
  children: ReactNode;
}

export const PhoneListContext = createContext<{
  list: PhoneList;
  setList: (itemList: PhoneList) => void;
}>({ list: [], setList: () => {} });

const App = ({ children }: AppInterface) => {
  const [phoneList, setPhoneList] = useState<PhoneList>([]);

  return (
    <PhoneListContext.Provider
      value={{ list: phoneList, setList: setPhoneList }}
    >
      <main className="page-container">{children}</main>
      <ScrollRestoration />
    </PhoneListContext.Provider>
  );
};

export default App;
