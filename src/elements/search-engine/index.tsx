import { useEffect, useRef } from 'react';
import './_style.scss';

interface SearchEngineProps {
  numResults: number;
  onInput: (text: string) => void;
}

const INPUT_TIME_OUT = 200;

const SearchEngine = ({ numResults, onInput }: SearchEngineProps) => {
  const timeOutFunction = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onInput_ = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeOutFunction.current);
    timeOutFunction.current = setTimeout(
      () => onInput(event.target.value),
      INPUT_TIME_OUT,
    );
  };

  useEffect(() => {
    return () => clearTimeout(timeOutFunction.current);
  }, []);

  return (
    <form className="search-engine-container" role="search">
      <input type="text" onInput={onInput_} />
      <span aria-live="polite" className="sg-num-results">
        {numResults}
      </span>
    </form>
  );
};

export default SearchEngine;
