import Home from '@components/home';
import MobileView from '@components/mobile';
import CartView from '@components/cart';
import PageNotFound from '@components/page-not-found';
import { ReactElement } from 'react';
import { Routes } from '@routes/pageConfig';

interface ComponentsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: any) => ReactElement;
}

const components: ComponentsInterface = {
  [Routes.index]: Home,
  [Routes.mobile]: MobileView,
  [Routes.cart]: CartView,
  [Routes.error]: PageNotFound,
};

const getComponentFromRoute = (route: string) =>
  components[route] || PageNotFound;

export default getComponentFromRoute;
