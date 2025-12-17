import Close from '@assets/images/close.svg';
import Translations from '@assets/languages/export';
import { useEffect, useRef, useState } from 'react';
import './_style.scss';

interface SearchEngineProps {
  numResults: number;
  onInput: (text: string) => void;
}

const INPUT_TIME_OUT = 200;

const SearchEngine = ({ numResults, onInput }: SearchEngineProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const timeOutFunction = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInput_ = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeOutFunction.current);
    timeOutFunction.current = setTimeout(
      () => onInput(event.target.value),
      INPUT_TIME_OUT,
    );
    setIsTyping(!!event.target.value);
  };

  const clearInput = () => {
    inputRef.current!.value = '';
    onInput('');
  };

  useEffect(() => {
    return () => clearTimeout(timeOutFunction.current);
  }, []);

  return (
    <form className="search-engine-container" role="search">
      <label htmlFor="search-input" className="sr-only">
        {Translations.search_placeholder}
      </label>
      <input
        id="search-input"
        type="text"
        onInput={onInput_}
        placeholder={Translations.search_placeholder}
        ref={inputRef}
        aria-describedby="search-results"
      />
      <button
        className={`search-clear-button ${isTyping ? 'search-clear-button-show' : ''}`}
        onClick={clearInput}
        type="button"
        aria-label={Translations.clean_search}
      >
        <img src={Close} alt="" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="sg-num-results" id="search-results">
        {`${numResults} ${Translations.results}`}
      </span>
    </form>
  );
};

export default SearchEngine;
