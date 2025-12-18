import browserRouter from '@routes/index.tsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { initializeCart } from '@utils/cart';
import './_main.scss';

initializeCart();

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={browserRouter} />,
);
