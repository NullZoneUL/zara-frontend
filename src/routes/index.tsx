import RouterManager from '@components/router';
import { createBrowserRouter } from 'react-router-dom';
import { Routes } from './pageConfig';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <RouterManager route={Routes.index} />,
    errorElement: <RouterManager route={Routes.index} />,
  },
  {
    path: Routes.index,
    element: <RouterManager route={Routes.index} />,
  },
  {
    path: `${Routes.mobile}/:id`,
    element: <RouterManager route={Routes.mobile} />,
  },
  {
    path: Routes.cart,
    element: <RouterManager route={Routes.cart} />,
  },
  {
    path: '*',
    element: <RouterManager route={Routes.error} />,
  },
]);

export default browserRouter;
