import browserRouter from '@routes/index.tsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './_main.scss';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={browserRouter} />,
);
