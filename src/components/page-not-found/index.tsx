import Translations from '@assets/languages/export';
import { Link } from 'react-router-dom';
import { Routes } from '@routes/pageConfig';
import './_style.scss';

const PageNotFound = () => {
  return (
    <section aria-labelledby="not-found-title" className="not-found-container">
      <h1 id="not-found-title">{Translations.not_found}</h1>
      <Link aria-label={Translations.return_home} to={`/${Routes.index}`}>
        {Translations.come_back_home}
      </Link>
    </section>
  );
};

export default PageNotFound;
