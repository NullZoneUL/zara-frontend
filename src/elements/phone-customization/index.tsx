import Translations from '@assets/languages/export';
import { useState } from 'react';
import './_style.scss';

interface PhoneCustomizationProps {
  data: PhoneItem;
  addToCart: (selectedColor: number, selectedStorage: number) => void;
}

const PhoneCustomization = ({ data, addToCart }: PhoneCustomizationProps) => {
  const [selectedColor, setSelectedColor] = useState<number>();
  const [selectedStorage, setSelectedStorage] = useState<number>();

  const selectStorageOption = (option: number) => {
    if (data?.storageOptions[option]) {
      setSelectedStorage(option);
    }
  };

  const selectColorOption = (option: number) => {
    if (data?.colorOptions[option]) {
      setSelectedColor(option);
    }
  };

  const addToCart_ = () => {
    addToCart(selectedColor!, selectedStorage!);
  };

  return (
    <>
      <figure>
        <img
          src={data?.colorOptions[selectedColor || 0].imageUrl}
          alt={`${data.brand} ${data.name} ${data.colorOptions[selectedColor || 0].name}`}
        />
      </figure>
      <div className="phone-main-customization-info">
        <h1>{`${data.brand} ${data.name}`}</h1>
        <h2>
          {typeof selectedStorage === 'number'
            ? data.storageOptions[selectedStorage].price
            : data.basePrice}
        </h2>
        <fieldset className="storage-customization phone-customization">
          <legend>{Translations.storage_question}</legend>
          <ul>
            {data.storageOptions.map((storageOption, index) => (
              <li
                key={`STORAGE_OPTION_${storageOption.capacity}`}
                className={`phone-storage-option ${index === selectedStorage ? 'selected-storage-option' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => selectStorageOption(index)}
                  aria-pressed={index === selectedStorage}
                >
                  {storageOption.capacity}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className="color-customization phone-customization">
          <legend>{Translations.color_question}</legend>
          <div className="color-list-container">
            <ul>
              {data.colorOptions.map((color, index) => (
                <li
                  key={`COLOR_OPTION_${color.name}`}
                  className={`phone-color-option ${index === selectedColor ? 'selected-color-option' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => selectColorOption(index)}
                    style={{ backgroundColor: color.hexCode }}
                    aria-label={color.name}
                    aria-pressed={index === selectedColor}
                  />
                </li>
              ))}
            </ul>
          </div>
          <p className="selected-color-name" aria-live="polite">
            {typeof selectedColor === 'number'
              ? data.colorOptions[selectedColor].name
              : '\u00A0'}
          </p>
        </fieldset>
        <button
          type="button"
          onClick={addToCart_}
          className="phone-info-add-to-cart"
          disabled={
            !(
              typeof selectedColor === 'number' &&
              typeof selectedStorage === 'number'
            )
          }
        >
          {Translations.add}
        </button>
      </div>
    </>
  );
};

export default PhoneCustomization;
