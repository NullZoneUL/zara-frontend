import Translations from '@assets/languages/export';
import './_style.scss';

interface PhoneSpecsProps {
  specs: Specs;
  brand: string;
  name: string;
  description: string;
}

const PhoneSpecs = ({ specs, brand, name, description }: PhoneSpecsProps) => {
  const {
    screen,
    resolution,
    processor,
    mainCamera,
    selfieCamera,
    battery,
    os,
    screenRefreshRate,
  } = specs;

  const rows: Array<[string, string | undefined]> = [
    [Translations.specs.brand, brand],
    [Translations.specs.name, name],
    [Translations.specs.description, description],
    [Translations.specs.screen, screen],
    [Translations.specs.resolution, resolution],
    [Translations.specs.processor, processor],
    [Translations.specs.mainCamera, mainCamera],
    [Translations.specs.selfieCamera, selfieCamera],
    [Translations.specs.battery, battery],
    [Translations.specs.os, os],
    [Translations.specs.screenRefreshRate, screenRefreshRate],
  ];

  return (
    <dl className="phone-specs">
      {rows.map(
        ([label, value]) =>
          value && (
            <div key={`PHONE_DESCRIPTION_${label}`} className="phone-specs-row">
              <dt className="phone-specs-key">{label}</dt>
              <dd className="phone-specs-value">{value}</dd>
            </div>
          ),
      )}
    </dl>
  );
};

export default PhoneSpecs;
