import { RoutesType, Titles } from '@routes/pageConfig';

export const updateInfo = (route: RoutesType) => {
  const value = Titles[route];
  document.title = value;

  const meta = document.querySelector('meta[name="description"]');
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  meta && meta.setAttribute('content', value);
};
